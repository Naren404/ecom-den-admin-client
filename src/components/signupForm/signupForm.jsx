import { Button, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import { signupFormFields } from "./signupFormFields";
import CustomInput from "../customInput/customInput";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createUser } from "../../entities/user/userAxiosHelper";
import { setIsCreating } from "../../utility/promiseSlice";

const formValidation = (formData) => {
  const { password, confirmPassword } = formData

  return password === confirmPassword
}

const initialFormData = {
  firstName: '',
  lastName: '',
  phone: '',
  address: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignupForm = () => {
  const { formData, handleOnChange, setFormData } = useForm(initialFormData)
  const { firstName, lastName, email, address, phone, password } = formData

  const { isCreating } = useSelector(state => state.promise)

  const dispatch = useDispatch()

  // handle on form submit
  const handleOnSubmit = async(e) => {
    e.preventDefault()

    // form validation
    const isValid = formValidation(formData)
    if(!isValid){
      return toast.error("Password and confirm password should match.")
    }

    dispatch(setIsCreating(true))
    // call api[axios] to create user
    const result = await createUser({ firstName, lastName, email, address, phone, password })
    
    dispatch(setIsCreating(false))

    if(result?.status === "error"){
      return toast.error(result.message || "Cannot create user!")
    }


    setFormData(initialFormData)
    toast.success(result.message || " Email verification link sent.")
  }

  return ( 
    <Container className="p-4 border shadow-lg rounded-4">
      <Form onSubmit={(e) => handleOnSubmit(e)}>
        <h2 className="text-center mb-4">Create an Account</h2>

        <Row>
          {signupFormFields.map((field, index) => 
            <Col key={index} xs={index === 0 || index === 1 ? 6 : 12}>
              <CustomInput
                label={field.label}
                handleOnChange={handleOnChange}
                inputAttributes={{
                  type: field.type,
                  name: field.name,
                  value: formData[field.name],
                  placeholder: field.placeholder,
                  required: true
                }}
              />
            </Col>
          )}
        </Row>

        <Button
         variant="primary"
         className="btn-lg w-100"
         type="submit"
         disabled={isCreating}
         >
          {isCreating ? <Spinner animation="border" role="status" />: "Signup"}
         </Button>
      </Form>
    </Container>
   );
}
 
export default SignupForm;