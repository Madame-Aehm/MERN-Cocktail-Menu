import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './views/Home';
import LaunchPage from './views/LaunchPage';
import Login from './views/Login';
import MyProfile from './views/MyProfile';
import SignUp from './views/SignUp';
import { RecipesContextProvider } from './context/RecipesContext';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <RecipesContextProvider>
            <NavBar />
            <Routes>
              <Route path='*' element={ <LaunchPage/> } />
              <Route path='/' element={ <LaunchPage/> } />
              <Route path='/home' element={ <Home/> } />
              <Route path='/login' element={ <Login/> } />
              <Route path='/sign-up' element={ <SignUp/> } />
              <Route path='/my-profile' element={ <ProtectedRoute> <MyProfile/> </ProtectedRoute> } />
            </Routes>
          </RecipesContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
