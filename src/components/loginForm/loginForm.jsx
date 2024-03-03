import { Button, Container, Form, Spinner } from "react-bootstrap";
import CustomInput from "../customInput/customInput";
import { loginFormFields } from "./loginFormFields";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { setIsCreating } from "../../utility/promiseSlice";
import { loginUser } from "../../entities/user/userAxiosHelper";
import { toast } from "react-toastify";
import { autoLoginAction, getUserAction } from "../../entities/user/userActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialFormData = {
  email: '',
  password: ''
}
const LoginForm = () => {
  const { formData, handleOnChange } = useForm(initialFormData)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isCreating } = useSelector(state => state.promise)
  
  // Handle on sumbit
  const handleOnSubmit = async(e) => {
    e.preventDefault()

    dispatch(setIsCreating(true))
    //API CALL TO LOGIN USER | GET TOKENS
    const result = await loginUser(formData)
    dispatch(setIsCreating(false))

    if(result?.status === "error"){
      return toast.error(result.message)
    }

    // If success, we store the accessJWT and refresh JWT in session storage and local storage respectively
    sessionStorage.setItem("accessJWT", result.data.accessJWT)
    localStorage.setItem("refreshJWT", result.data.refreshJWT)

    // once tokens are stored, dispatch action to get user
    dispatch(getUserAction())
  }

  // Logic to handle what should happen if a user is logged in
  const { user } = useSelector(state => state.user)

  useEffect(() => {
    // if user exists [logged in], navigate to admin homepage
    if(user?._id) { navigate("/admin") }
    // if not try auto login
    if(!user?._id) { dispatch(autoLoginAction()) }
  }, [user?._id, navigate, dispatch])

  return ( 
    <Container className="p-4 pb-0 border shadow-lg rounded-4">
      <Form onSubmit={(e) => handleOnSubmit(e)}>
        {loginFormFields.map((field, index) => 
          <CustomInput
            key={index}
            label = {field.label}
            handleOnChange= {handleOnChange}
            inputAttributes= {{
              type: field.type,
              name: field.name,
              value: formData[field.name],
              placeholder: field.placeholder,
              required: true
            }}
          />
        )}
        
        <Button 
          variant="primary" 
          className="btn-lg w-100"
          type="submit"
          disabled={isCreating}
          >
            { isCreating ? <Spinner animation="border" role="status" /> : "Login" }
          </Button>

        <p className="pt-2">Forgot Password?</p>
      </Form>
    </Container>
   );
}
 
export default LoginForm;