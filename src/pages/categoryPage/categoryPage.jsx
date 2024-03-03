import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import CategoryCard from "../../components/categoryCard/categoryCard";
import CreateOrEditCategoryModal from "../../components/modals/createOrEditCategory/createOrEditCategory";
import useModal from "../../hooks/useModal";
import useForm from "../../hooks/useForm";

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
  return (
    <>
    <Container>
      <Row>
        <Col xs={9}>
          <Stack gap={4}>
              <Form.Control type="text" placeholder="Search by title..." />
              
              <CategoryCard />
              <CategoryCard />
              <CategoryCard />
              <CategoryCard />
              <CategoryCard />
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