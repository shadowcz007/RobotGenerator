// import React from 'react';
import { Loader } from 'lucide-react';

const Loading = () => {
  return (
    <div className="w-full flex justify-center h-screen">
      <Loader className="w-8 h-8 text-black-500 animate-spin" />
    </div>
  );
};

 
export { Loading }
