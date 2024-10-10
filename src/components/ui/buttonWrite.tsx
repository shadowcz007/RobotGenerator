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
        <div className="bg-card shadow-md rounded-lg p-6 my-8">
            <div className="w-full">
                <p>{label}</p>
                <span className="text-muted-foreground text-left inline-flex items-end">
                    {prompt}

                    <button onClick={onWrite} className="focus:outline-none">
                        <Pencil className="h-5 w-5" />
                    </button>

                </span>
            </div></div>
    );
};

export default WriteButton;
