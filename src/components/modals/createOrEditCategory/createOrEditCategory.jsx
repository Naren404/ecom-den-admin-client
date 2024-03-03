/* eslint-disable react/prop-types */
import CreateOrEditEntityModal from "../createOrEditEntityModal";
import { categoryFormFields } from "./categoryFormFields";

const CreateOrEditCategoryModal = (props) => {
  const { showModal, setShowModal, formData, handleOnChange } = props

  const handleOnSubmit = (e) => {
    e.preventDefault()

    // this will dispatch either creaet categpry action
    //  or update category action
  }

  return ( 
    <CreateOrEditEntityModal
      showModal={showModal}
      setShowModal={setShowModal}
      modalHeader={formData?._id ? "Update Category" : "Create Category"}
      formFields={categoryFormFields}
      formData={formData}
      handleOnChange={handleOnChange}
      handleOnSubmit={handleOnSubmit}
    />
   );
}
 
export default CreateOrEditCategoryModal;