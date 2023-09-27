import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthContextProvider from './contexts/AuthContext';
import ClientPage from './pages/ClientPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RestaurantControlPage from './pages/RestaurantControlPage';
import './App.css';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/client-page' element={<ClientPage />} />
            <Route path='/restaurant-control' element={<RestaurantControlPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
