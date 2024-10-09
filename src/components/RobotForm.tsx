import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Robot, generateRandomRobot, getBasic, getBasicKeywords, Keywords } from '../utils/robotGenerator';
import { Shuffle } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import InputWithRandom from "@/components/ui/inputWithRandom";

interface RobotFormProps {
  initialData: Robot;
  onSubmit: (data: Robot) => void;
  callback: (data: any) => void;
}

const RobotForm: React.FC<RobotFormProps> = ({ initialData, onSubmit, callback }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState<Robot>(initialData);
  //更多的种子词
  const moreKeywords = new Keywords()

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, category: keyof Robot, subCategory?: string, field?: string) => {
    const { value } = e.target;
    setFormData((prev: any) => {
      const newState = { ...prev };
      if (subCategory && field) {
        newState[category][subCategory][field] = value;
      } else if (subCategory) {
        newState[category][subCategory] = value;
      } else {
        newState[category] = value;
      }
      return newState;
    });
  }, []);

  // 增加LLM
  const handleRandomField = useCallback(async (category: keyof Robot, subCategory?: string, field?: any) => {
    const newRobot: any = generateRandomRobot(field, moreKeywords.getKeywords(field));
    setFormData((prev: any) => {
      const newState = { ...prev };
      // console.log("random", newRobot, newState,category, subCategory, field)
      if (subCategory) {
        //@ts-ignore
        newState[category][subCategory][field] = newRobot[category][subCategory][field];
      } else {
        //@ts-ignore
        newState[category][field] = newRobot[category][field];
      }
      return newState;
    });

    let ks = getBasicKeywords(field);
    if (callback) {
      let result: any = await callback({
        data: ks,
        type: 'randomField'
      })
      if (result && Array.isArray(result) && result[0] && typeof (result[0] === 'string')) {
        moreKeywords.addKeywords(field, result)
      }

      console.log(result, typeof (result), moreKeywords.getKeywords(field))
    }

  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">{t('Head')}</h2>
        <div className="space-y-2">
          <Label htmlFor="head-color">{t('Color')}</Label>
          <InputWithRandom
            category="head"
            field="color"
            value={formData.head.color}
            onChange={(e) => handleChange(e, 'head', 'color')}
            handleRandomField={handleRandomField}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="head-shape">{t('Shape')}</Label>
          <InputWithRandom
            category="head"
            field="shape"
            value={formData.head.shape}
            onChange={(e) => handleChange(e, 'head', 'shape')}
            handleRandomField={handleRandomField}
          />
        </div>
        <h3 className="text-lg font-semibold mt-3">{t('Details')}</h3>
        <div className="space-y-2">
          <Label htmlFor="head-details-screen">{t('Screen')}</Label>
          <InputWithRandom
            category="head"
            subCategory="details"
            field="screen"
            value={formData.head.details.screen}
            onChange={(e) => handleChange(e, 'head', 'details', 'screen')}
            handleRandomField={handleRandomField}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="head-details-buttons_and_knobs">{t('Buttons and Knobs')}</Label>
          <InputWithRandom
            category="head"
            subCategory="details"
            field="buttons_and_knobs"
            value={formData.head.details.buttons_and_knobs}
            onChange={(e) => handleChange(e, 'head', 'details', 'buttons_and_knobs')}
            handleRandomField={handleRandomField}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">{t('Body')}</h2>
        <div className="space-y-2">
          <Label htmlFor="body-clothing">{t('Clothing')}</Label>
          <InputWithRandom
            category="body"
            field="clothing"
            value={formData.body.clothing}
            onChange={(e) => handleChange(e, 'body', 'clothing')}
            handleRandomField={handleRandomField}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="body-accessories">{t('Accessories')}</Label>
          <InputWithRandom
            category="body"
            field="accessories"
            value={formData.body.accessories}
            onChange={(e) => handleChange(e, 'body', 'accessories')}
            handleRandomField={handleRandomField}
          />
        </div>
      </div>


      <div>
        <h2 className="text-xl font-semibold mb-2">{t('Legs')}</h2>
        <div className="space-y-2">
          <Label htmlFor="legs-style">{t('Style')}</Label>
          <InputWithRandom
            category="legs"
            field="style"
            value={formData.legs.style}
            onChange={(e) => handleChange(e, 'legs', 'style')}
            handleRandomField={handleRandomField}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="legs-shoes">{t('Shoes')}</Label>
          <InputWithRandom
            category="legs"
            field="shoes"
            value={formData.legs.shoes}
            onChange={(e) => handleChange(e, 'legs', 'shoes')}
            handleRandomField={handleRandomField}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">{t('Overall Style')}</h2>
        <div className="space-y-2">
          <Label htmlFor="overall_style-color_tone">{t('Color Tone')}</Label>
          <InputWithRandom
            category="overall_style"
            field="color_tone"
            value={formData.overall_style.color_tone}
            onChange={(e) => handleChange(e, 'overall_style', 'color_tone')}
            handleRandomField={handleRandomField}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="overall_style-material">{t('Material')}</Label>
          <InputWithRandom
            category="overall_style"
            field="material"
            value={formData.overall_style.material}
            onChange={(e) => handleChange(e, 'overall_style', 'material')}
            handleRandomField={handleRandomField}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="overall_style-composition">{t('Composition')}</Label>
          <InputWithRandom
            category="overall_style"
            field="composition"
            value={formData.overall_style.composition}
            onChange={(e) => handleChange(e, 'overall_style', 'composition')}
            handleRandomField={handleRandomField}
          />
        </div>


      </div>

      <div className="flex space-x-4">
        <Button
          type="button"
          onClick={() => {
            const newRobot: any = generateRandomRobot();
            setFormData(newRobot)
          }}
          variant="outline"
          className="flex items-center"
        >
          <Shuffle className="mr-2 h-4 w-4" /> {t('Randomize All')}
        </Button>
        <Button
          type="button"
          onClick={() => {
            setFormData(getBasic());
          }}
        >
          {t('Basic')}
        </Button>
        <Button type="submit">
          {t('Generate Image')}
        </Button>
      </div>
    </form >
  );
};

export default RobotForm;
