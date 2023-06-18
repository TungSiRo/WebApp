import './Home.scss'
const Home = () => {
    return (
        <>
        <div className='home-container'>
            <h2 className='mt-5'> GIỚI THIỆU VỀ WEBSITE: </h2>
            <div className='hovr'>
            <h5>Công nghệ và thư viện sử dụng:</h5>
             <span>Front-end: ReactJS,Styled Components, Redux Thunk, Bootstrap, SASS </span>
             <br/>
            <span>API: Sử dụng API từ trang https://reqres.in/ để tạo website</span><br/>
            <span>Các chức năng cơ bản:</span>
            <ul class="list-styled">
               <li>Đăng nhập</li> 
               <li>Thêm User</li> 
               <li>Sửa User</li> 
               <li>Xóa User</li> 
               <li>Hiển thị tất cả các User</li> 
               <li>Tìm kiếm User theo ID</li> 
               <li>Sắp xếp theo FirstName</li> 
               <li>Import User từ file.csv</li> 
               <li>Export User từ flie.csv</li> 
            </ul>
            </div>
        </div>
        </>
    )
};

export default Home;
