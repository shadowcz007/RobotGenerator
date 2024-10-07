import React from 'react';
import { Robot, generateRandomRobot } from '../utils/robotGenerator';
import { Shuffle } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface RobotFormProps {
  initialData: Robot;
  onSubmit: (data: Robot) => void;
  onRandomize: () => void;
}

const RobotForm: React.FC<RobotFormProps> = ({ initialData, onSubmit, onRandomize }) => {
  const [formData, setFormData] = React.useState<Robot>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, category: keyof Robot, subCategory?: string, field?: string) => {
    const { value } = e.target;
    setFormData((prev) => {
      if (subCategory && field) {
        return {
          ...prev,
          [category]: {
            ...prev[category],
            [subCategory]: {
              ...prev[category][subCategory],
              [field]: value,
            },
          },
        };
      } else if (subCategory) {
        return {
          ...prev,
          [category]: {
            ...prev[category],
            [subCategory]: value,
          },
        };
      } else {
        return {
          ...prev,
          [category]: value,
        };
      }
    });
  };

  const handleRandomField = (category: keyof Robot, subCategory?: string, field?: string) => {
    const newRobot = generateRandomRobot();
    if (subCategory && field) {
      setFormData((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          [subCategory]: {
            ...prev[category][subCategory],
            [field]: newRobot[category][subCategory][field],
          },
        },
      }));
    } else if (subCategory) {
      setFormData((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          [subCategory]: newRobot[category][subCategory],
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [category]: newRobot[category],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const InputWithRandom = ({ 
    category, 
    subCategory, 
    field, 
    value, 
    onChange 
  }: { 
    category: keyof Robot, 
    subCategory?: string, 
    field: string, 
    value: string, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
  }) => (
    <div className="flex items-center space-x-2 mt-2">
      <Input
        type="text"
        id={`${category}-${subCategory ? subCategory + '-' : ''}${field}`}
        value={value}
        onChange={onChange}
        className="flex-grow"
      />
      <Button
        type="button"
        onClick={() => handleRandomField(category, subCategory, field)}
        variant="outline"
        size="icon"
      >
        <Shuffle className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Head</h2>
        <div className="space-y-2">
          <Label htmlFor="head-color">Color</Label>
          <InputWithRandom
            category="head"
            field="color"
            value={formData.head.color}
            onChange={(e) => handleChange(e, 'head', 'color')}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="head-shape">Shape</Label>
          <InputWithRandom
            category="head"
            field="shape"
            value={formData.head.shape}
            onChange={(e) => handleChange(e, 'head', 'shape')}
          />
        </div>
        <h3 className="text-lg font-semibold mt-3">Details</h3>
        <div className="space-y-2">
          <Label htmlFor="head-details-screen">Screen</Label>
          <InputWithRandom
            category="head"
            subCategory="details"
            field="screen"
            value={formData.head.details.screen}
            onChange={(e) => handleChange(e, 'head', 'details', 'screen')}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="head-details-buttons_and_knobs">Buttons and Knobs</Label>
          <InputWithRandom
            category="head"
            subCategory="details"
            field="buttons_and_knobs"
            value={formData.head.details.buttons_and_knobs}
            onChange={(e) => handleChange(e, 'head', 'details', 'buttons_and_knobs')}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Body</h2>
        <div className="space-y-2">
          <Label htmlFor="body-clothing">Clothing</Label>
          <InputWithRandom
            category="body"
            field="clothing"
            value={formData.body.clothing}
            onChange={(e) => handleChange(e, 'body', 'clothing')}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="body-accessories">Accessories</Label>
          <InputWithRandom
            category="body"
            field="accessories"
            value={formData.body.accessories}
            onChange={(e) => handleChange(e, 'body', 'accessories')}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Overall Style</h2>
        <div className="space-y-2">
          <Label htmlFor="overall_style-color_tone">Color Tone</Label>
          <InputWithRandom
            category="overall_style"
            field="color_tone"
            value={formData.overall_style.color_tone}
            onChange={(e) => handleChange(e, 'overall_style', 'color_tone')}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="overall_style-material">Material</Label>
          <InputWithRandom
            category="overall_style"
            field="material"
            value={formData.overall_style.material}
            onChange={(e) => handleChange(e, 'overall_style', 'material')}
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <Button
          type="button"
          onClick={onRandomize}
          variant="outline"
          className="flex items-center"
        >
          <Shuffle className="mr-2 h-4 w-4" /> Randomize All
        </Button>
        <Button type="submit">
          Generate Image
        </Button>
      </div>
    </form>
  );
};

export default RobotForm;