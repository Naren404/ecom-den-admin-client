import { useState } from "react";

const useModal = (payload = {}) => {
  const [showModal, setShowModal] = useState(false)
  const [modalPayload, setModalPayload] = useState(payload)
  
  return ({ 
    showModal,
    setShowModal,
    modalPayload,
    setModalPayload,
  });
}
 
export default useModal;