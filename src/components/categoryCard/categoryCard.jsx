import { Button, Card, Image, Stack } from "react-bootstrap";
import { BsPencil, BsTrash } from "react-icons/bs";

const CategoryCard = () => {
  return ( 
    <Card className="d-flex flex-row align-items-center rounded shadow">
      <Image 
        src="https://img.freepik.com/free-photo/smartphone-balancing-with-pink-background_23-2150271746.jpg" 
        width={80} 
        height={80}
        className="p-1"
        rounded
      />
      
      <Card.Body>
        <Stack direction="horizontal" gap={3} className="justify-content-between">
          <Card.Title>HELLO</Card.Title>
          
          <Stack direction="horizontal" gap={2}>
            <Button variant="outline-success"><BsPencil/></Button>
            <Button variant="outline-danger"><BsTrash/></Button>
          </Stack>
        </Stack>
      </Card.Body>
    </Card>

   );
}
 
export default CategoryCard;