import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Robot, generateRandomRobot, describeImage } from './utils/robotGenerator';
import RobotForm from './components/RobotForm';
import { Cpu } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import DefaultImage from '@/components/DefaultImage';
import { Loading } from "@/components/ui/loading"
import './i18n'; // 引入 i18n 配置

function App() {
  const { t, i18n } = useTranslation();
  const [robot, setRobot] = useState<Robot | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState(localStorage.getItem("_apiKey") || "");
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
    console.log('robot', d)
    if (!d.legs) {
      d = generateRandomRobot()
    }
    setRobot(d)
    setPrompt(describeImage(d))

  }, []);

  const handleSubmit = async (data: any) => {
    // TODO: Replace with actual API call
    console.log('Submitting data:', data);
    // Simulating API response

    function containsChinese(str: string) {
      const chineseRegex = /[\u4e00-\u9fa5]/
      return chineseRegex.test(str)
    }

    const llmData = (
      content: any,
      temperature = 0.25,
      max_tokens = 1512,
      json_object = false,
      systemPrompt = null
    ) => {
      let messages = [
        {
          role: 'user',
          content
        }
      ]
      if (systemPrompt) {
        messages = [
          {
            role: 'system',
            content: systemPrompt
          },
          ...messages
        ]
      }

      let d: any = {
        model: 'THUDM/glm-4-9b-chat', //'01-ai/Yi-1.5-9B-Chat-16K',
        messages,
        stream: false,
        max_tokens,
        temperature,
        top_p: 0.7,
        top_k: 50,
        frequency_penalty: 0.5,
        n: 1
      }

      if (json_object)
        d.response_format = {
          type: 'json_object'
        }

      return JSON.stringify(d)
    }

    setRobot(data);

    setInit(false);

    setGeneratedImage("")

    data = describeImage(data);

    if (containsChinese(data)) {
      const body = llmData(
        `Translate '''${data}''' into English, and do not output any other irrelevant information,ensuring the sentence has a coherent and logical structure.`,
        0.25,
        2048
      )

      const options1 = {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: body
      };
      try {
        const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', options1);
        const res = await response.json();
        console.log(res);
        data = res.choices[0].message.content
      } catch (err) {
        console.error(err);
      }
    }

    const options = {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "model": "black-forest-labs/FLUX.1-schnell",
        "prompt": `A human with a head resembling a vintage computer.` + data,
        "image_size": "1024x1024"
      })
    };


    try {
      const response = await fetch('https://api.siliconflow.cn/v1/image/generations', options);
      const data = await response.json();
      console.log(data);

      setGeneratedImage(data.images[0].url)
    } catch (err) {
      console.error(err);
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
                  value={apiKey}
                  onChange={(e) => {
                    setApiKey(e.target.value)
                    localStorage.setItem("_apiKey", e.target.value)
                  }}
                  className="flex-grow"
                />
              </div>

              {robot && <RobotForm
                initialData={robot}
                onSubmit={handleSubmit}
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
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
