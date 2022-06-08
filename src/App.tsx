import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { useAppSelector } from './app/hooks/hooks';
import About from './pages/About';
import AdminPanel from './pages/Admin/AdminPanel';
import CabinetPage from './pages/Cabinet';
import CategoryPage from './pages/Category';
import ErrorPage from './pages/Error';
import Main from './pages/Main';
import Product from './pages/Product';
import Signin from './pages/SignIn';
import Signup from './pages/SignUp';
import Staff from './pages/Staff';

function App() {
  const user = useAppSelector(state => state.user.isAuth)
  const isAdmin = useAppSelector(state => state.user.isAdmin)
  const isUser = useAppSelector(state => state.user.isUser)
  const isStaff = useAppSelector(state => state.user.isStaff)
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/about' element={<About />} />
      <Route path='/category' element={<CategoryPage />} />
      <Route path='/category' element={<CategoryPage />} />
      <Route path='/product/:id' element={<Product />} />
      {!user && <Route path='/signin' element={<Signin />} />}
      {!user && <Route path='/signup' element={<Signup />} />}
      {isAdmin && <Route path='/admin' element={<AdminPanel />} />}
      {isUser && <Route path='/cabinet' element={<CabinetPage />} />}
      {isStaff && <Route path='/staff' element={<Staff />} />}
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
