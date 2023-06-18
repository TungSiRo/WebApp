import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { deleteUser } from '../services/UserService';
import { Toast } from 'react-bootstrap';
import { toast } from 'react-toastify';


const ModalConfirm = (props) => {
    const { show, handleClose, dataUserDelete, handleDeleteFromModal } = props;

    const confrimDelete = async () => {
       let res = await deleteUser(dataUserDelete.id);
       if(res && +res.statusCode === 204 ) {
         toast.success('Delete a user succeed!')
         handleClose()
         handleDeleteFromModal(dataUserDelete)
        } else{
          toast.error('Error')
        }       
    }
    return (
        <>
            <Modal 
              show={show} 
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
        <Modal.Header closeButton>
          <Modal.Title>Delete a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='body-add-new'>
           This action can't be undone!
           Do you want to delete this user,
           <br/><b>email = {dataUserDelete.email} ?</b>

         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => confrimDelete()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    )
}
export default ModalConfirm ;