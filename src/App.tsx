import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Robot, generateRandomRobot, describeImage } from '@/utils/robotGenerator';
import RobotForm from '@/components/RobotForm';
import { Cpu } from 'lucide-react';
import DefaultImage from '@/components/DefaultImage';
import { Loading } from "@/components/ui/loading"
import ImageGallery from '@/components/ui/ImageGallery';
import WriteButton from '@/components/ui/buttonWrite';
import LanguageToggle from '@/components/LanguageToggle';
import { InputNews } from '@/components/ui/inputNews';
import SettingsModal from '@/components/SettingsModal';
import { Settings } from 'lucide-react';

import './i18n'; // 引入 i18n 配置
import { translateToEn, generateImage, moreSimilarText, writeXHSText, createByNews } from '@/utils/ai'
import { updateJSON } from '@/lib/utils'

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getLocalStorageItem(key: string, defaultValue: any = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error parsing localStorage item "${key}":`, error);
    return defaultValue;
  }
}

function App() {
  const { t, i18n } = useTranslation();
  const [robot, setRobot] = useState<Robot | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [moreImages, setMoreImages] = useState<string[]>([]);
  const [prompt, setPrompt] = useState<string>(localStorage.getItem("_prompt") || "");
  const [init, setInit] = useState<boolean>(true);
  const [newsInput, setNewsInput] = useState<string>("");
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  useEffect(() => {
    if (robot) {
      localStorage.setItem('_robot', JSON.stringify(robot));
      setPrompt(describeImage(robot));
    }
  }, [robot]);

  useEffect(() => {
    if (generatedImage) {
      localStorage.setItem('_generatedImage', generatedImage);
    }
  }, [generatedImage]);

  useEffect(() => {
    if (moreImages.length > 0) {
      localStorage.setItem('_moreImages', JSON.stringify(moreImages));
    }
  }, [moreImages]);

  useEffect(() => {
    const cachedRobot = getLocalStorageItem('_robot', generateRandomRobot());
    if (!cachedRobot.legs) {
      setRobot(generateRandomRobot());
    } else {
      setRobot(cachedRobot);
    }

    setPrompt(describeImage(cachedRobot));

    const cachedMoreImages = getLocalStorageItem('_moreImages', []);
    setMoreImages(cachedMoreImages);

    const cachedGeneratedImage = localStorage.getItem('_generatedImage');
    if (cachedGeneratedImage) {
      setGeneratedImage(cachedGeneratedImage);
      setInit(false);
    }
  }, []);

  const handleCallback = async (data: any) => {
    const apiKey = localStorage.getItem("_apiKey") || "";
    if (data && data.type === 'randomField' && apiKey) {
      return await moreSimilarText(data.data, apiKey);
    }
  }

  const handleSubmit = async (formData: any) => {
    const { data, generateMultiple } = formData;
    const apiKey = localStorage.getItem("_apiKey") || "";

    setRobot(data);
    setInit(false);
    setGeneratedImage("");
    setMoreImages([]);

    let description = describeImage(data);
    description = await translateToEn(description, apiKey) || description;

    const imgurl = await generateImage(`A human with a head resembling a vintage computer. ${description}`, apiKey);
    if (imgurl) {
      setGeneratedImage(imgurl);
    }

    if (generateMultiple) {
      await sleep(2200);
      for (let index = 0; index < 20; index++) {
        const imgurl = await generateImage(`A human with a head resembling a vintage computer. ${description}`, apiKey);
        if (imgurl) {
          setMoreImages((prevImages) => [...prevImages, imgurl]);
          await sleep(5200);
        }
      }
    }
  };

  const handleWrite = async () => {
    const apiKey = localStorage.getItem("_apiKey") || "";

    if (apiKey) {
      let result = await writeXHSText(describeImage(robot), apiKey)
      if (result) {
        setPrompt(result)
      }
    }
  }

  const handleNewsSubmit = async () => {
    const apiKey = localStorage.getItem("_apiKey") || "";
    if (apiKey && newsInput) {
      const newRobot = await createByNews(newsInput, apiKey);
      if (newRobot) {
        let data: any = { ...robot }
        data = updateJSON(data, newRobot)
        console.log(newRobot)
        setRobot(data)
      }
    }
  };

  if (!robot) return <>loading</>;

  return (
    <div className="min-h-screen bg-gray-100 text-foreground p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-6 flex items-center justify-center">
          <Cpu className="mr-2" /> {t('Robot Generator')}
        </h1>
        <div className="flex items-center space-x-4">
          <LanguageToggle />
          <button onClick={() => setIsSettingsModalOpen(true)} className="bg-card shadow-md rounded-lg p-2">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">

            <InputNews
              placeholder={t('Enter news text here...')}
              value={newsInput}
              onChange={(e) => setNewsInput(e.target.value)}
              onSubmit={handleNewsSubmit}
              label={t('Submit News')}
            />

            <div className="bg-card shadow-md rounded-lg p-6">
              {robot && <RobotForm initialData={robot} onSubmit={handleSubmit} callback={handleCallback} />}
            </div>

          </div>
          <div className="w-full lg:w-1/2">
            <div className="bg-card shadow-md rounded-lg p-6 flex flex-col justify-between items-center">


              <WriteButton label={t('Prompt:')}
                initialPrompt={prompt}
                onWrite={handleWrite} />


              <div className="w-full flex flex-col justify-center items-start">
                {init ? (
                  <>
                    <p className="text-muted-foreground text-center">{t('Your generated robot will appear here')}</p>
                    <br />
                    <DefaultImage />
                  </>
                ) : (
                  generatedImage ? (
                    <>
                      <h2 className="text-2xl font-semibold mb-4">{t('Generated Robot:')}</h2>
                      <img src={generatedImage} alt="Generated Robot" className="rounded-lg shadow-md max-w-full h-auto" />
                    </>
                  ) : (
                    <Loading />
                  )
                )}
                <br />
                {moreImages.length > 0 && <ImageGallery images={moreImages} width={768} height={768} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} />
    </div>
  );
}

export default App;
