import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes } from "react-router-dom"
import SignupPage from "./pages/authPage/signupPage"
import { ToastContainer } from 'react-toastify';
import VerifyEmailPage from './pages/authPage/verifyEmailPage';
import LoginPage from './pages/authPage/loginPage';
import AdminPrivateRoutes from './components/privateRouter/adminPrivateRouter';
import AdminLayout from './components/layouts/adminLayout';
import CategoryPage from './pages/categoryPage/categoryPage';
import ProductPage from './pages/productPage/productPage';

function App() {

  return (
    <>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage /> } />
        <Route path="/verify-email" element={<VerifyEmailPage /> } />

      {/* Private Routes */}
      <Route path='/admin' element={<AdminPrivateRoutes><AdminLayout /></AdminPrivateRoutes>}>
        <Route path="" element={<p>DashBoard</p>} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="orders" element={<p>Orders</p>} />
        <Route path="users" element={<p>Users</p>} />
      </Route>

    </Routes>
      <ToastContainer />
    </>
  )
}

export default App
