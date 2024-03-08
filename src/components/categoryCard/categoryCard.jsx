/* eslint-disable react/prop-types */
import { Button, Card, Image, Stack } from "react-bootstrap";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteCategoryAction } from "../../entities/category/categoryActions";

const CategoryCard = (props) => {
const { setShowModal, setFormData, category } = props
  
const openEditCatgeoryModal = () => {
  setFormData({...category, thumbnail: ''})
  setShowModal(true)
}

const dispatch = useDispatch()
const handleOnDelete = () => {
  dispatch(deleteCategoryAction(category?._id))
}

  return ( 
    <Card className="d-flex flex-row align-items-center rounded shadow">
      <Image 
        src={import.meta.env.VITE_APP_API_BASE_URL + category.thumbnail}
        width={80} 
        height={80}
        className="p-1"
        rounded
      />
      
      <Card.Body>
        <Stack direction="horizontal" gap={3} className="justify-content-between">
          <Card.Title>{category.title}</Card.Title>
          
          <Stack direction="horizontal" gap={2}>
            <Button variant="outline-success" onClick={openEditCatgeoryModal}><BsPencil/></Button>
            <Button variant="outline-danger" onClick={handleOnDelete}><BsTrash/></Button>
          </Stack>
        </Stack>
      </Card.Body>
    </Card>

   );
}
 
export default CategoryCard;