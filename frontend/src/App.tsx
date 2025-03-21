import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AppHeader from "./components/AppHeader"
import AppFooter from "./components/AppFooter"
import Home from "./components/Home"
import Login from "./components/Login"
import CategoryBookListPage from "./components/CategoryBookListPage"
import Register from "./components/Register"
import ReaderProfilePage from "./components/ReaderProfilePage"
import BookDetailPage from "./components/BookDetailPage"

function App() {
  return (
    <Router basename="">
      <AppHeader/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/books' element={<CategoryBookListPage/>}/>
          <Route path='/books/:work_id' element={<BookDetailPage/>}/>
          <Route path='/reader-profile' element={<ReaderProfilePage/>}/>
        </Routes>
      <AppFooter/>
    </Router>
  )
}

export default App
