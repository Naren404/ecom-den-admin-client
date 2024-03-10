import { Col, Container, Image, Row, Stack } from "react-bootstrap";
import resetPasswordImage from '../../assets/resetPasswordImage.svg'
import { useState } from "react";
import RequestOtpForm from "../../components/requestOtpForm/requestOtpForm";
import ResetPasswordForm from "../../components/resetPasswordForm/resetPasswordForm";

const  ResetPasswordPage = () => {
  const [sentOtp, setSentOtp] = useState(false)
  return ( 
    <Container>
      <Row className="vh-100">
        <Col className="d-flex">
          <Stack className="justify-content-center align-items-center">
            <Image src={resetPasswordImage} height={300} width={300} />
              <Stack direction="horizontal" className="justify-content-center">
                <h3 className="mx-2">FORGOT PASSWORD?</h3>
              </Stack>
            <pre>Request For OTP and reset password.</pre>
          </Stack>
        </Col>
        
        <Col className="d-flex justify-content-center align-items-center">
          {/* Request OTP Form */}
          {!sentOtp && <RequestOtpForm setSentOtp={setSentOtp} />}
          {/* Request Password Reset Form */}
          {sentOtp && <ResetPasswordForm setSentOtp={setSentOtp} />}
        </Col>
      </Row>
    </Container>
   );
}
 
export default ResetPasswordPage;