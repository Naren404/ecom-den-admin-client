/* eslint-disable react/prop-types */
import { Button, Container, Form, Spinner } from "react-bootstrap";
import CustomInput from "../customInput/customInput";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../hooks/useForm";
import { setIsCreating } from "../../utility/promiseSlice";
import { requestOtp } from "../../entities/user/userAxiosHelper";
import { toast } from "react-toastify";

const initialFormData = {
  email: '',
}

const RequestOtpForm = ({ setSentOtp }) => {
  const { formData, handleOnChange } = useForm(initialFormData)

  const { isCreating } = useSelector(state => state.promise)

  const dispatch = useDispatch()
  // HANDLE ON SUMBIT TO REQUEST OTP
  const handleOnSubmit = async(e) => {
    e.preventDefault();

    dispatch(setIsCreating(true))
    // call axios to make api call for sending otp
    const result = await requestOtp(formData?.email)
    dispatch(setIsCreating(false))

    if(result?.status === "error"){
      return toast.error(result?.message || "Could not send OTP, please try again.")
    }

    setSentOtp(true)
    toast.success(result?.message)
  }
  
  return ( 
    <Container className="p-4 border shadow-lg rounded-4">
      <Form onSubmit={(e) => handleOnSubmit(e)}>
          <CustomInput
            label = "Email"
            handleOnChange= {handleOnChange}
            inputAttributes= {{
              type: "email",
              name: "email",
              value: formData.email,
              placeholder: "Enter your email to receive OTP",
              required: true
            }}
          />
        
        <Button 
          variant="primary" 
          className="btn-lg w-100"
          type="submit"
          disabled={isCreating}
          >
            { isCreating ? <Spinner animation="border" role="status" /> : "Request OTP" }
          </Button>
      </Form>
    </Container>
   );
}
 
export default RequestOtpForm;