import './App.css';
import AutoVerifier from './components/AutoVerifier';
import ManualVerifier from './components/ManualVerifier';
import Videos from './components/Videos';

function App() {
  return (
    <div className="">
      <AutoVerifier/>
      <ManualVerifier/>
      <Videos/>
    </div>
  );
}

export default App;
