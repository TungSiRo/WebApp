import React from 'react';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAlUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddnew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import _, { clone, debounce, result } from"lodash";
import ModalConfirm from './ModalConfirm';
import './TableUser.scss'
import Papa from "papaparse";
import { CSVLink, CSVDownload } from "react-csv";
import { toast } from 'react-toastify';

const TableUser = (props) => {
    
    const [listUsers, setListUsers] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [dataUserDelete, setDataUserDelete] = useState({});

    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortFeild] = useState("id")

    const [dataExport, setDataExport] = useState([]);

    const handleSort = (sortBy, sortField) => {
      setSortBy(sortBy);
      setSortFeild(sortField);

      let cloneListUser = _.cloneDeep(listUsers);
      cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
      setListUsers(cloneListUser)
    }
    const handleClose = () => { 
      setIsShowModalAddNew(false);
      setIsShowModalEdit(false);
      setIsShowModalDelete(false);
    }
    const handlUpdateTable = (user) => {
      setListUsers([user,...listUsers]);
    }
    const handleEditFromModal = (user) => {
      let cloneListUser = _.cloneDeep(listUsers)
      let index = listUsers.findIndex(item => item.id === user.id)
      cloneListUser[index].first_name = user.first_name
      setListUsers(cloneListUser)


    }
    useEffect(() =>{
      //Call apis
      // dry
      getUsers();
    },[])

    const getUsers = async (page) => {
        let res = await fetchAlUser(page);
        if(res && res.data) {
             setTotalUsers(res.total)
             setTotalPages(res.total_pages)
             setListUsers(res.data)

        }
    }
    
    
    const handlePageClick = (event) => {
      getUsers(+event.selected +1)
    }
    const handleEditUser = (user) => {
      setDataUserEdit(user);
      setIsShowModalEdit(true);
    }
    const handleDeleteUser = (user) => {
      setIsShowModalDelete(true)
      setDataUserDelete(user)
    }
    const handleDeleteFromModal = (user) => {
      let cloneListUser = _.cloneDeep(listUsers)
      cloneListUser = cloneListUser.filter(item => item.id !== user.id)
      setListUsers(cloneListUser)
    }
    const handleSearch = debounce((event) => {
      let term = event.target.value;
         if(term) {
          let cloneListUser = _.cloneDeep(listUsers);
          cloneListUser = cloneListUser.filter(item => item.email.includes(term))
          setListUsers(cloneListUser)
          
        } else {
          getUsers();
        }
    },1000)


    const csvData = [
      ["firstname", "lastname", "email"],
      ["Ahmed", "Tomi", "ah@smthing.co.com"],
      ["Raed", "Labes", "rl@smthing.co.com"],
      ["Yezzi", "Min l3b", "ymin@cocococo.com"]
    ];

    const getUsersExport = (event, done) => {
       let result = [];
       if(listUsers && listUsers.length > 0 ) {
           result.push(["Id", "Email", "First Name", "Last Name"])
           listUsers.map((item, index) => {
            let arr= [];
            arr[0] = item.id;
            arr[1] = item.email;
            arr[2] = item.first_name;
            arr[3] = item.last_name;
            result.push(arr);
           })
           setDataExport(result);
           done();
       } 
    }

    const handleImportCSV = (event) => {
      if(event.target && event.target.file && event.target.file[0]) {
        let file = event.target.file[0];
        
        if (file.type !== "text/csv") {
          toast.error("Only accept csv files...")
          return;
        }
        // Parse local CSV file
        Papa.parse(file, {
          // hander: true
          complete: function(results) {
            let rawCSV = results.data;
            if( rawCSV.lenght > 0) {
              if (rawCSV[0] && rawCSV.length === 3 ) {
                if(rawCSV[0][0] !== "email"
                   || rawCSV[0][1] !== "first_name"
                   || rawCSV[0][2] !== "last_name"
                ) {
                   toast.error("wrong format Header CSV file!")
                } else {
                  let result = [];
                  
                  rawCSV.map((item, index) => {
                      if(index >0 && item.lenght === 3) {
                        let obj = {};
                        obj.name = item[0]
                        obj.first_name = item[1]
                        obj.last_name = item[2]
                        result.push(obj);
                      }
                  })
                  setListUsers(result)
                }
              } else {
                toast.error("wrong format CSV file!")
              }
            }
            else {
              toast.error('Not found data on CSV file!')
            }
          }
        });
        
      }
    }

    return (
    <>
    <div className='my-3 add-new d-sm-flex'>
      <span><b>List Users:</b></span>
      <div className='group-btns mt-2'>
          <label htmlFor='test' className='btn btn-secondary' >
            <i class="fa-solid fa-file-export"></i> Import
            <input 

            id='test' type='file' hidden
            onChange={(event) => handleImportCSV(event)}
            />
          </label>
          <CSVLink 
              data={dataExport}
              asyncOnClick={true}
              onClick={getUsersExport}
              filename={"User.csv"}
              className="btn btn-primary"
          > <i class="fa-sharp fa-solid fa-file-arrow-down"></i> Export</CSVLink>

          <button className='btn btn-success' 
                  onClick={() => {setIsShowModalAddNew(true)}}
          >
               <i className="fa-solid fa-circle-plus "></i> Add new
          </button>
      </div>
    </div>
    <div className='col-12 col-sm-4 my-3'>
      < input
        className='form-control'
        placeholder='Search user by email...' 

        //value={keyword}
        onChange={(event) => handleSearch(event)}
      />
    </div>
    <div className='customize-table'>
      <Table striped bordered hover>
      <thead>
        <tr class="p-3 mb-2 bg-secondary text-white" >
          <th>
            <div className='sort-hearder'>
              <span>ID</span>
              <span>
             <i 
                className="fa-solid fa-arrow-down-long"
                  onClick={() => handleSort("desc", "id")}
              ></i>
             <i 
                className="fa-solid fa-arrow-up-long"
                onClick={() => handleSort("asc", "id")}
              ></i>
              </span>
            </div>
          </th>
          <th>Email</th>
          <th>
            <div className='sort-hearder'>
            <span>First Name</span>
              <span>
              <i 
                className="fa-solid fa-arrow-down-long"
                  onClick={() => handleSort("desc", "first_name")}
              ></i>
             <i 
                className="fa-solid fa-arrow-up-long"
                onClick={() => handleSort("asc", "first_name")}
              ></i>
              </span>
            </div>
          </th>
          <th>Last Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {listUsers && listUsers.length > 0 && 
           
           listUsers.map((item, index) => {
            return(
              <tr key= {`users-${index}`}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>
                  <button 
                    className='btn btn-warning mx-3'
                    onClick={() => handleEditUser(item)}
                  >Edit</button>
                  <button 
                    className='btn btn-danger '
                    onClick={() => handleDeleteUser(item)}
                  >Delete</button>
                </td>
              </tr>
            )
           })
        }

      </tbody>
      </Table>
    </div>
    <ReactPaginate
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={totalPages}
      previousLabel="< previous"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      renderOnZeroPageCount={null}
     />
    <ModalAddnew 
      show={isShowModalAddNew}
      handleClose={handleClose}
      handlUpdateTable={handlUpdateTable}
    />
    <ModalEditUser
     show={isShowModalEdit}
     dataUserEdit={dataUserEdit}
     handleClose={handleClose}
     handleEditFromModal={handleEditFromModal}
    />
    
    <ModalConfirm
      show={isShowModalDelete}
      handleClose={handleClose}
      dataUserDelete={dataUserDelete}
      handleDeleteFromModal={handleDeleteFromModal}
      
    />

    </>)
}

export default TableUser;