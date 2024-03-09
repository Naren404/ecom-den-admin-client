import { useEffect } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductsAction } from "../../entities/product/productActions";
import ProductCard from "../../components/productCard/productCard";
import { getCategoriesAction } from "../../entities/category/categoryActions";

const ProductPage = () => {
  const { products } = useSelector(state => state.product)

  const dispatch = useDispatch()
  useEffect(() => {
    // dispatch action to get all products
    dispatch(getProductsAction())
    dispatch(getCategoriesAction())
  }, [dispatch])
  return ( 
    <>
    <Container>
      <Row>
        <Col xs={8}>
          <Stack gap={4}>
            <Form.Control type="text" placeholder="Search by title..." />

            {products.map((product, index) => 
              <ProductCard 
                key={index} 
                product={product}
                // setShowModal={setShowModal}
                // setModalPayload={setModalPayload}
              />)}
          </Stack>
        </Col>

        <Col xs={4} className="text-end">
          <Link to="/admin/new-product">
            <Button 
              variant="success"
              className="btn-md"
            >
              Create
            </Button>
          </Link>
        </Col>
      </Row>

    </Container>

    {/* Modal To Manage Product Images */}
    {/* {showModal && <CreateOrEditProductImageModal showModal={showModal} setShowModal={setShowModal} modalPayload={modalPayload} />} */}
  </>
   );
}
 
export default ProductPage;