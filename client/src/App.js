import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthContextProvider from './contexts/AuthContext';
import RestaurantContextProvider from './contexts/RestaurantContext';
import ClientPage from './pages/ClientPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RestaurantControlPage from './pages/RestaurantControlPage';
import './App.css';

function App() {
  return (
    <AuthContextProvider>
      <RestaurantContextProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path='/signup' element={<SignupPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/client-page/:restaurantid' element={<ClientPage />} />
              <Route path='/restaurant-control' element={<RestaurantControlPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </RestaurantContextProvider>
    </AuthContextProvider>
  );
}

export default App;
