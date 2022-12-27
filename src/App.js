import Main from './components/main/Main';
import Stock from './components/stock/Stock';
import './App.scss';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <p>hi there</p>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/stock" element={<Stock />}/>
      </Routes>
    </div>
  );
}

export default App;
