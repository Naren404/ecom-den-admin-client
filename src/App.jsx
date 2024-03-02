import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes } from "react-router-dom"
import SignupPage from "./pages/authPage/signupPage"
import { ToastContainer } from 'react-toastify';
import VerifyEmailPage from './pages/authPage/verifyEmailPage';

function App() {

  return (
    <>
      <Routes>
        {/* Public Route */}
        <Route path="/signup" element={<SignupPage /> } />
        <Route path="/verify-email" element={<VerifyEmailPage /> } />
      </Routes>

      <ToastContainer />
    </>
  )
}

export default App
