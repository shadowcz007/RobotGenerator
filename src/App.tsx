import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Robot, generateRandomRobot, describeImage } from './utils/robotGenerator';
import RobotForm from './components/RobotForm';
import { Cpu } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import DefaultImage from '@/components/DefaultImage';
import { Loading } from "@/components/ui/loading"
import ImageGallery from '@/components/ui/ImageGallery';

import './i18n'; // 引入 i18n 配置
import { translateToEn, generateImage, moreSimilarText } from './utils/ai'

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function App() {
  const { t, i18n } = useTranslation();
  const [robot, setRobot] = useState<Robot | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [moreImages, setMoreImages] = useState<any>([]);

  const [prompt, setPrompt] = useState(localStorage.getItem("_prompt") || "");

  const [init, setInit] = useState(true);

  useEffect(() => {
    if (robot) {
      localStorage.setItem('_robot', JSON.stringify(robot))
      setPrompt(describeImage(robot))
    }
  }, [robot]);

  useEffect(() => {
    let d = generateRandomRobot()
    try {
      let json: any = localStorage.getItem('_robot')
      if (json) {
        d = JSON.parse(json)
      }
    } catch (error) {
      console.log(error)
    }
    // console.log('robot', d)
    if (!d.legs) {
      d = generateRandomRobot()
    }
    setRobot(d)
    setPrompt(describeImage(d))

  }, []);

  const handleCallback = async (data: any) => {
    const apiKey = localStorage.getItem("_apiKey") || ""
    if (data && data.type === 'randomField' && apiKey) {
      // console.log(apiKey)
      return await moreSimilarText(data.data, apiKey)
    }
  }

  const handleSubmit = async (formData: any) => {
    // TODO: Replace with actual API call
    console.log('Submitting data:', formData);
    let { data, generateMultiple } = formData

    const apiKey = localStorage.getItem("_apiKey") || ""
    // Simulating API response

    setRobot(data);

    setInit(false);

    setGeneratedImage("")
    setMoreImages([])

    data = describeImage(data);

    data = await translateToEn(data, apiKey) || data;

    let imgurl = await generateImage(`A human with a head resembling a vintage computer.` + data, apiKey)

    if (imgurl) {
      setGeneratedImage(imgurl)
    }

    if (generateMultiple) {
      await sleep(1000)
      for (let index = 0; index < 20; index++) {
        let imgurl1 = await generateImage(`A human with a head resembling a vintage computer.` + data, apiKey)
        setMoreImages([...moreImages, imgurl1])
        await sleep(1200)
      }
    }

    // setGeneratedImage('https://source.unsplash.com/random/400x400?robot');
  };

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "zh" : "en";
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("_language", newLanguage);
  };

  console.log('robot', robot)
  if (!robot) return <>loading</>

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-6 flex items-center justify-center">
          <Cpu className="mr-2" /> {t('Robot Generator')}
        </h1>
        <button onClick={toggleLanguage} className="bg-card shadow-md rounded-lg p-2">
          {t(i18n.language === 'en' ? 'Switch to Chinese' : 'Switch to English')}
        </button>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <div className="bg-card shadow-md rounded-lg p-6">

              <div className="space-y-2">
                <Label htmlFor="head-shape">{t('Siliconflow API Key')}</Label>
                <Input
                  type="password"
                  value={localStorage.getItem("_apiKey") || ""}
                  onChange={(e) => {
                    console.log("#set key", e.target.value)
                    localStorage.setItem("_apiKey", e.target.value)
                  }}
                  className="flex-grow"
                />
              </div>

              {robot && <RobotForm
                initialData={robot}
                onSubmit={handleSubmit}
                callback={handleCallback}
              />}
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="bg-card shadow-md rounded-lg p-6  flex flex-col justify-between items-center">
              <div className="w-full flex flex-col justify-center items-start">
                <p>{t('Prompt:')}</p>
                <p className="text-muted-foreground text-left">{prompt}</p>
                <br />
              </div>

              <div className="w-full flex flex-col justify-center items-start">

                {init ? <>
                  <p className="text-muted-foreground text-center">{t('Your generated robot will appear here')}</p>
                  <br />
                  <DefaultImage />
                </> : (
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

                {moreImages && moreImages.length > 0 && <ImageGallery images={moreImages} />}

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
