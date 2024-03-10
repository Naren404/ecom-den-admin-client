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
import NewProductPage from './pages/productPage/newProductPage';
import EditProductPage from './pages/productPage/editProductPage';
import ResetPasswordPage from './pages/authPage/resetPasswordPage';

function App() {

  return (
    <>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage /> } />
        <Route path="/verify-email" element={<VerifyEmailPage /> } />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Private Routes */}
      <Route path='/admin' element={<AdminPrivateRoutes><AdminLayout /></AdminPrivateRoutes>}>
        <Route path="" element={<p>DashBoard</p>} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="new-product" element={<NewProductPage />} />
        <Route path="edit-product/:id" element={<EditProductPage />} />
        <Route path="orders" element={<p>Orders</p>} />
        <Route path="users" element={<p>Users</p>} />
      </Route>

      <Route path='*' element={<h1>PAGE NOT FOUND!! GHAR JAAA!!</h1>} />

    </Routes>
      <ToastContainer />
    </>
  )
}

export default App
