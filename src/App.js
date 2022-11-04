
import './App.css';

import Network from './pages/network';
import {
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Network />}/>
        
    
        
    </Routes>
     
    </div>
  );
}

export default App;
