/* eslint-disable react/prop-types */
import { Button, Form, Offcanvas, Stack } from "react-bootstrap";
import CustomInput from "../customInput/customInput";

const CreateOrEditEntityModal = (props) => {
  const { showModal, setShowModal, modalHeader, formFields, formData, handleOnChange, handleOnSubmit } = props

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
                  required: true,
                }}
              />
            )}
          </div>

          <Stack direction="horizontal" gap={1} className="p-2 mt-auto">
            <Button 
              variant="outline-success" 
              className="w-100"
              type="submit"
            >
              Create
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