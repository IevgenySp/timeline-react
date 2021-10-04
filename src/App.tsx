import React, {useState, useEffect} from 'react';
//import logo from './logo.svg';
import './App.css';
import Timeline from "./timeline";

function App() {
  const [dimensions, setDimensions] = useState({
      width: window.innerWidth,
      height: window.innerHeight
  });

  useEffect(() => {
      const handleResize = () => {
          setDimensions({
              width: window.innerWidth,
              height: window.innerHeight
          });
      };

      window.addEventListener('resize', handleResize)
  }, []);

  return (
    <div className="App">
        <Timeline width={dimensions.width} height={dimensions.height}/>
    </div>
  );
}

export default App;
