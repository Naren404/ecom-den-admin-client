/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import CreateOrEditEntityModal from "../createOrEditEntityModal";
import { categoryFormFields } from "./categoryFormFields";
import { createCategoryAction, updateCategoryAction } from "../../../entities/category/categoryActions";

const CreateOrEditCategoryModal = (props) => {
  const { showModal, setShowModal, formData, handleOnChange } = props

  const dispatch = useDispatch()
  const handleOnSubmit = (e) => {
    e.preventDefault()


    // GET THE FORMDATA
    let formObjectData = new FormData()

    Object.entries(formData).forEach(([key, value]) => formObjectData.append(key,value))

    // this will dispatch either create category action
     formData?._id ? dispatch(updateCategoryAction(formObjectData)) : dispatch(createCategoryAction(formObjectData))
    //  or update category action

    // close modal;
    setShowModal(false)
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