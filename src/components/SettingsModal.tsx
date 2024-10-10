import React from 'react';
import ApiKeyInput from '@/components/ui/inputApiKey';
import { X } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2 focus:outline-none">
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        <ApiKeyInput label="Siliconflow API Key" />
        <a href="https://cloud.siliconflow.cn/i/qY5gxZhQ"
        target='_blank'
        >Siliconflow</a>
      </div>
    </div>
  );
};

export default SettingsModal;

