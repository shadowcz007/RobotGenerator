import React, { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';

interface WriteButtonProps {
    label: string;
    initialPrompt: string;
    onWrite: () => void;
}

const WriteButton: React.FC<WriteButtonProps> = ({ label, initialPrompt, onWrite }) => {
    const [prompt, setPrompt] = useState(initialPrompt);

    useEffect(() => {
        setPrompt(initialPrompt);
    }, [initialPrompt]);

    return (
        <div className="w-full">
            <p>{label}</p>
            <span className="text-muted-foreground text-left inline-flex items-center">
                {prompt}
                <span 
                    className="ml-2 cursor-pointer p-1 border rounded hover:bg-gray-200 inline-flex items-center"
                    onClick={onWrite}
                >
                    <Pencil className="h-4 w-4" />
                </span>
            </span>
        </div>
    );
};

export default WriteButton;
