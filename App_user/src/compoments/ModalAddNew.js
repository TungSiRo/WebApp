import React from 'react';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import {postGreatUse} from '../services/UserService'
import { toast } from 'react-toastify'


const ModalAddtUser = (props) => {
    const { show, handleClose, handlUpdateTable } = props;
    const [name, setName] = useState("")
    const [job, setJob] = useState("")
const handleSaveUser = async () => {
    let res = await postGreatUse(name, job);
    if( res && res.id) {
      handleClose();
      setName('');
      setJob('');
      toast.success('A user created succseed!');
      handlUpdateTable({first_name: name, id: res.id})

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
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='body-add-new'>
           <div className="mb-3">
                <label className="form-label">Name</label>
                <input 
                     type="text" 
                     className="form-control"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                />
           </div>
          <div className="mb-3">
                <label class="form-label">Job</label>
                <input 
                     type="text" 
                     className="form-control"
                     value={job}
                     onChange={(e) => setJob(e.target.value)}
                />
          </div>
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    )
}
export default ModalAddtUser ;
