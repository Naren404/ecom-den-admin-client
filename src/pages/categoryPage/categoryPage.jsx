import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import CategoryCard from "../../components/categoryCard/categoryCard";
import CreateOrEditCategoryModal from "../../components/modals/createOrEditCategory/createOrEditCategory";
import useModal from "../../hooks/useModal";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategoriesAction } from "../../entities/category/categoryActions";

const initialFormData = {
  thumbnail: '',
  title: '',
}

const CategoryPage = () => {
  const { showModal, setShowModal } = useModal()
  const { formData, setFormData, handleOnChange } = useForm(initialFormData)

  const openCreateCategoryModal = () => {
    setFormData(initialFormData)
    setShowModal(true)
  }

  const { categories }  = useSelector(state => state.category)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategoriesAction())
  }, [dispatch])

  return (
    <>
    <Container>
      <Row>
        <Col xs={9}>
          <Stack gap={4}>
              <Form.Control type="text" placeholder="Search by title..." />
              {categories.map((category, index) => <CategoryCard key={index} category={category} setShowModal={setShowModal} setFormData={setFormData} />)}
          </Stack>
        </Col>

        <Col xs={3} className="text-end">
          <Button
            variant="success"
            className="btn-md"
            onClick={openCreateCategoryModal}
          >
            Create
          </Button>
        </Col>
      </Row>
    </Container>

    <CreateOrEditCategoryModal 
      showModal={showModal}
      setShowModal={setShowModal}
      formData={formData}
      handleOnChange={handleOnChange}
    />
    </>
   );
}
 
export default CategoryPage;