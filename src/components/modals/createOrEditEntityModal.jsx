/* eslint-disable react/prop-types */
import { Button, Form, Offcanvas, Spinner, Stack } from "react-bootstrap";
import CustomInput from "../customInput/customInput";
import { useSelector } from "react-redux";

const CreateOrEditEntityModal = (props) => {
  const { showModal, setShowModal, modalHeader, formFields, formData, handleOnChange, handleOnSubmit } = props

  const { isCreating } = useSelector(state => state.promise)

  const buttonText = formData?._id ? "Update" : "Create"

  return ( 
    <Offcanvas
      show={showModal}
      onHide={() => setShowModal(false)}
      placement="end"
      backdrop="static"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{modalHeader}</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="h-100">
        <Form
          onSubmit={(e) => handleOnSubmit(e)}
          className="d-flex flex-column justify-content-between h-100"
        >
          <div>
            {formFields.map((field, index) => 
              <CustomInput
                key={index}
                label={field.label}
                handleOnChange={handleOnChange}
                inputAttributes= {{
                  type: field.type,
                  name: field.name,
                  value: formData[field.name],
                }}
              />
            )}
          </div>

          <Stack direction="horizontal" gap={1} className="p-2 mt-auto">
            <Button 
              variant="outline-success" 
              className="w-100"
              type="submit"
              disabled={isCreating}
            >
              { isCreating ? <Spinner animation="border" role="status" /> : buttonText }
            </Button>

            <Button 
              variant="outline-danger" 
              className="w-100"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
          </Stack>
        </Form>
      </Offcanvas.Body>

    </Offcanvas>
   );
}
 
export default CreateOrEditEntityModal;