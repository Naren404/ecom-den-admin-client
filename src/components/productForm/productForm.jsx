/* eslint-disable react/prop-types */
import { Button, Col, Container, Form, Row, Spinner, Stack } from "react-bootstrap";
import { productFormFields } from "./productFormFields";
import CustomInput from "../customInput/customInput";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../hooks/useForm";
import { Link, useNavigate } from "react-router-dom";
import { createProductAction, updateProductAction } from "../../entities/product/productActions";

const ProductForm = (props) => {
  const { initialFormData } = props
  const { formData, handleOnChange } = useForm(initialFormData)

  const { categories } = useSelector(state => state.category)
  const { isCreating } = useSelector(state => state.promise)

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleOnSubmit = (e) => {
    e.preventDefault()

    // PROCESS FORM DATA TO SEND IMAGE FILE AS WELL IN XML
    let formDt = new FormData()

    Object.entries(formData).forEach(([key, value]) => formDt.append(key, value));

    // Call Actions
    formData?._id ? dispatch(updateProductAction(formDt)) : dispatch(createProductAction(formDt)) 
    navigate("/admin/products")
  }

  return ( 
    <Container className="p-4 shadow-lg rounded d-flex justify-content-center">
      <Form onSubmit={(e) => handleOnSubmit(e)}>
        <Row>
        {productFormFields.map((field, index) =>{
          const singleRow = index === 6
          
          return(
              <Col key={index} xs={ singleRow ? 12 : 6 }>
                <CustomInput
                  label = {field.label}
                  handleOnChange= {handleOnChange}
                  inputAttributes= {{
                    type: field.type,
                    name: field.name,
                    value: formData[field.name],
                    required: field.required,
                    placeholder: field.placeholder,
                    rows: 4
                  }}
                  options={field.options || categories.map(category => ({ value: category.title, label: category.title }))}
                />
              </Col>
              )
            }
          )}
        </Row>

        <Stack direction="horizontal" gap={2} className="pt-4">
          <Button 
            variant="outline-success"
            className="w-100"
            type="submit"
            disabled={isCreating}
          >
            { isCreating ? <Spinner animation="border" role="status" /> : "Create" }
          </Button>

          <Link to="/admin/products" className="w-100">
            <Button 
              variant="outline-danger"
              className="w-100"
            >
              Cancel
            </Button>
          </Link>
        </Stack>
      </Form>
    </Container>
   );
}
 
export default ProductForm;