import {BrowserRouter,Routes,Route} from "react-router-dom";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import BookForm from "./BookForm";
import BookList from "./BookList";
import LibraryForm from "./LibraryForm";
import LibraryList from "./LibraryList";
import EditStudent from './EditStudent';
import EditBook from "./EditBook";
import EditLibraryForm from "./EditLibraryForm ";
import Navbar from "./Navbar";
const Master = ()=>{
    return(
        <>
            <BrowserRouter>
            <Navbar></Navbar>
                <Routes>
                    <Route path="/" element={<StudentList></StudentList>}></Route>
                    <Route path="/studentform" element={<StudentForm></StudentForm>}></Route>
                    <Route path="/edit-student/:id" element={<EditStudent></EditStudent>}></Route>
                    <Route path="/bookform" element={<BookForm></BookForm>}></Route>
                    <Route path="/booklist" element={<BookList></BookList>}></Route>
                    <Route path="/edit-book/:id" element={<EditBook></EditBook>}></Route>
                    <Route path="/libraryform" element={<LibraryForm></LibraryForm>}></Route>
                    <Route path="/librarylist" element={<LibraryList></LibraryList>}></Route>
                    <Route path="/editlibrary" element={<EditLibraryForm></EditLibraryForm>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Master;