import { useState } from 'react';
import PropTypes from 'prop-types';

import { CheckSquare, Square } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const GenerateMultipleCheckbox = ({ label, onChange }:any) => {
  const [generateMultiple, setGenerateMultiple] = useState(false);

  const handleCheckboxChange = (e:any) => {
    const isChecked = e.target.checked;
    setGenerateMultiple(isChecked);
    if (onChange) {
      onChange(isChecked);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2 cursor-pointer">
        <Input
          type="checkbox"
          id="generate-multiple"
          checked={generateMultiple}
          onChange={handleCheckboxChange}
          className="hidden" // 隐藏默认复选框
        />
        <div onClick={() => handleCheckboxChange({ target: { checked: !generateMultiple } })}>
          {generateMultiple ? (
            <CheckSquare className="text-blue-500" />
          ) : (
            <Square className="text-gray-500" />
          )}
        </div>
        <Label htmlFor="generate-multiple" style={{
              cursor: 'pointer'
        }}>{label}</Label>
      </div>
    </div>
  );
};

GenerateMultipleCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default GenerateMultipleCheckbox;
