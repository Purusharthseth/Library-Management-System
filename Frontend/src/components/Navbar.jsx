import "./Navbar.css"
import {Link} from "react-router-dom";
const Navbar = ()=>{
    return(
        <>
        <header className="Task_header">
        <div className="navbar">
            <Link to="/"><i class="fa-solid fa-graduation-cap"></i>Students</Link>
            <Link to="/booklist"><i class="fa-solid fa-book"></i>Books</Link>
            <Link to="/librarylist"><i class="fa-solid fa-address-card"></i>Library</Link>
        </div>
        </header>
        </>

    )

}
export default Navbar;