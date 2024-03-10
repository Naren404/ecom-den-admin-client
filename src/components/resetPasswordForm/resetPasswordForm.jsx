/* eslint-disable react/prop-types */
import { Button, Container, Form, Spinner, Stack } from "react-bootstrap";
import { resetPasswordFormFields } from "./resetPasswordFormFields";
import CustomInput from "../customInput/customInput";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../hooks/useForm";
import { setIsCreating } from "../../utility/promiseSlice";
import { toast } from "react-toastify";
import { resetPassword } from "../../entities/user/userAxiosHelper";
import { useNavigate } from "react-router-dom";

const initialFormData = {
  otp: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const ResetPasswordForm = (props) => {
  const {setSentOtp} = props
  const {formData, handleOnChange} = useForm(initialFormData)
  
  const { isCreating } = useSelector(state => state.promise)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  // HANDLE ON SUMBIT TO REQUEST OTP
  const handleOnSubmit = async(e) => {
    e.preventDefault();

    const { confirmPassword, ...resetPasswordObject } = formData;

    if (formData.password !== confirmPassword) {
      return toast.error("Password do not match.");
    }

    dispatch(setIsCreating(true))
    // call axios to make api call for sending otp
    const result = await resetPassword(resetPasswordObject)
    dispatch(setIsCreating(false))

    if(result?.status === "error"){
      return toast.error(result?.message || "Could not reset password, please try again.")
    }

    toast.success(result?.message)
    navigate("/")
  }

  return ( 
    <Container className="p-4 border shadow-lg rounded-4">
      <Form onSubmit={(e) => handleOnSubmit(e)}>
        {resetPasswordFormFields.map((field, index) => 
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
        <Stack direction="horizontal" gap={2}>
          <Button 
            variant="outline-primary" 
            className="btn-lg w-100"
            type="submit"
            disabled={isCreating}
            >
              { isCreating ? <Spinner animation="border" role="status" /> : "Reset Password" }
          </Button>

          <Button 
            variant="outline-danger" 
            className="btn-lg w-100"
            onClick={() => setSentOtp(false)}
            >
              Request OTP Again
          </Button>
        </Stack>
      </Form>
      
    </Container>
   );
}
 
export default ResetPasswordForm;