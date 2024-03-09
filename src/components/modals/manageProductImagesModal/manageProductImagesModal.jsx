/* eslint-disable react/prop-types */
import { Button, Col, Form, Image, Offcanvas, Row, Spinner, Stack } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from '../../customInput/customInput';
import { useEffect, useState } from "react";
import { createProductImagesAction, deleteProductImageAction, getProductAction } from "../../../entities/product/productActions";

const ManageProductImagesModal = (props) => {
  const {showModal, setShowModal, modalPayload } = props

  const [productImages, setProductImages] = useState()

  const { isCreating } = useSelector(state => state.promise)
  const { product } = useSelector(state => state.product)
  const { images =[] } = product

  const dispatch = useDispatch()

  // get product based on modalpaylod id
  useEffect(() => {
    if(modalPayload){
      dispatch(getProductAction(modalPayload))
    }
  }, [dispatch, modalPayload])

  // HANDLE IMAGE CHANGE
  const handleOnImagesChange = (e) => {
    const { files } = e.target

    setProductImages(files)
  }

  // HANDLE FORM SUBMIT TO UPLOAD IMAGES
  const handleOnSubmit = (e) => {
    e.preventDefault();

    let formDt = new FormData()

    formDt.append("_id", product?._id);

    [...productImages].forEach(image => {
      formDt.append("images", image)
    });

    // Call action to update product images
    dispatch(createProductImagesAction(formDt))

    setProductImages()
  }

  // DELETE IMAGE
  const handleOnDelete = (image) => {
    // dispatch action
    dispatch(deleteProductImageAction(product?._id, image))
  }


  return ( 
    <Offcanvas 
    show={showModal} 
    onHide={()=> setShowModal(false)}
    placement="end"
    backdrop="static"
  >
    <Offcanvas.Header closeButton>
        <Offcanvas.Title>Manage Product Images</Offcanvas.Title>
    </Offcanvas.Header>

    
      {/* Create or Edit Book Form */}
      <Offcanvas.Body className="h-100">
        <Stack className="d-flex flex-column justify-content-between h-100">
          <Row>
          {images?.map ((image, index) =>
            <Col xs={6} key={index} className='mb-2'>
              <div  style={{ display: 'inline-block' }} className="position-relative">
                <Image 
                  src={import.meta.env.VITE_APP_API_BASE_URL + image}
                  width={150}
                  height={150}
                  thumbnail
                />

                <BsTrash 
                  className="position-absolute bottom-0 end-0 m-2 text-danger" 
                  onClick={() => handleOnDelete(image)} 
                  style={{ cursor: 'pointer' }}
                  />
              </div>
            </Col>
          )}
          </Row>
          

        <Form onSubmit={(e) => handleOnSubmit(e)}>
          {/* Form */}
          <CustomInput
            label="Add New Images"
            handleOnChange={handleOnImagesChange}
            inputAttributes={{
              type: "file",
              name: "images",
              multiple: true,
            }}
          />

          <Stack direction="horizontal" gap={1} className="p-2 mt-auto">
            <Button 
              variant="outline-success" 
              className="w-100"
              type="submit"
              disabled={isCreating}
            >
              { isCreating ? <Spinner animation="border" role="status" /> : "Upload Images" }
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
        </Stack>
    </Offcanvas.Body>

  </Offcanvas>
   );
}
 
export default ManageProductImagesModal;