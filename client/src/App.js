import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ClientPage from './pages/ClientPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/client-page' element={<ClientPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
