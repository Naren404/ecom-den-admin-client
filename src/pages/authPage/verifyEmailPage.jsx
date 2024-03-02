import { useEffect, useState } from "react";
import { Container, Spinner, Stack } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyUser } from "../../entities/user/userAxiosHelper";

const VerifyEmailPage = () => {
  // grab url params
  const [params] = useSearchParams()
  const userEmail = params.get("e")
  const token = params.get("id")

  const [emailVerifying, setEmailVerifying] = useState(true)
  const [emailVerified, setEmailVerified] = useState(false)

  const navigate = useNavigate()
  // function to send verification request
  const verifyUserEmail = async() => {
    const result = await verifyUser({ userEmail, token })

    setEmailVerifying(false)
    
    // if user is not verified
    if(result?.status === "error"){
      setEmailVerified(false)

      toast.error(result.message)
      navigate("/signup")
    }

    setEmailVerified(true)
  }

  // when the page loads, fire api request to verify the email
  useEffect(() => {
    if(userEmail && token){
      verifyUserEmail()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ( 
    <Container>
      {emailVerifying && 
        <Stack gap={4} className="vh-100 justify-content-center align-items-center">
          <Spinner animation="border" variant="primary" role="status" />

          <p>Verifying email, Please wait ....</p>
        </Stack>
      }

      {emailVerified && 
        <Stack gap={2} className="vh-100 justify-content-center align-items-center">
          
          <div className="my-4">
            <lord-icon
                src="https://cdn.lordicon.com/twsqddew.json"
                trigger="in"
                delay="100"
                state="in-reveal"
                style={{ width:'250px', height:'250px'}}>
            </lord-icon>
          </div>

          <p>Email successfully verified, You can login now.</p>

          <Link to="/" className="btn btn-lg btn-outline-primary">
            Login Now
          </Link>
        </Stack>
      }
    </Container>
   );
}
 
export default VerifyEmailPage;