import React, { useState } from 'react';
import { Robot, generateRandomRobot } from './utils/robotGenerator';
import RobotForm from './components/RobotForm';
import { Cpu } from 'lucide-react';

function App() {
  const [robot, setRobot] = useState<Robot>(generateRandomRobot());
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleSubmit = async (data: Robot) => {
    // TODO: Replace with actual API call
    console.log('Submitting data:', data);
    // Simulating API response
    setGeneratedImage('https://source.unsplash.com/random/400x400?robot');
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center justify-center">
        <Cpu className="mr-2" /> Robot Generator
      </h1>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <div className="bg-card shadow-md rounded-lg p-6">
              <RobotForm
                initialData={robot}
                onSubmit={handleSubmit}
                onRandomize={() => setRobot(generateRandomRobot())}
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="bg-card shadow-md rounded-lg p-6 h-full flex flex-col justify-center items-center">
              {generatedImage ? (
                <>
                  <h2 className="text-2xl font-semibold mb-4">Generated Robot:</h2>
                  <img src={generatedImage} alt="Generated Robot" className="rounded-lg shadow-md max-w-full h-auto" />
                </>
              ) : (
                <p className="text-muted-foreground text-center">Your generated robot will appear here</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;