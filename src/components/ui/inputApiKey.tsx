import { useState } from 'react';
import { Key } from 'lucide-react'; // 使用 lucide-react 库

const ApiKeyInput = ({ label }: any) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="bg-card shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center">
                <div className="text-lg font-medium">{label}</div>
                <button onClick={toggleCollapse} className="focus:outline-none">
                    <Key className={`transition-transform ${isCollapsed ? '' : 'rotate-180'}`} />
                </button>
            </div>
            {!isCollapsed && (
                <div className="space-y-2 mt-4">
                    {/* <label htmlFor="api-key">{label}</label> */}
                    <input
                        type="password"
                        id="api-key"
                        value={localStorage.getItem("_apiKey") || ""}
                        onChange={(e) => localStorage.setItem("_apiKey", e.target.value)}
                        className="flex-grow w-full "
                    />
                </div>
            )}
        </div>
    );
};

export default ApiKeyInput;
