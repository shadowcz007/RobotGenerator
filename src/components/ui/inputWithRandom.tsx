import React, { useMemo } from 'react';
import { Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Robot } from '@/utils/robotGenerator';

interface InputWithRandomProps {
  category: keyof Robot;
  subCategory?: string;
  field: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRandomField: (category: keyof Robot, subCategory?: string, field?: string) => void;
}

const InputWithRandom: React.FC<InputWithRandomProps> = ({
  category,
  subCategory,
  field,
  value,
  onChange,
  handleRandomField,
}) => {
  return (
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
};

export default InputWithRandom;
