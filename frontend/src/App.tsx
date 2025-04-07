import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AppHeader from "./components/AppHeader"
import AppFooter from "./components/AppFooter"
import Home from "./components/Home"
import Login from "./components/Login"
import CategoryBookListPage from "./components/BookListPage"
import Register from "./components/Register"
import BookDetailPage from "./components/BookDetailPage"
import ReviewForm from "./components/ReviewForm"
import ReaderProfilePage from "./components/ReaderProfilePage"
import CreateReview from "./components/CreateReview"
import PageNotFound from "./components/PageNotFound"
import BookListPage from "./components/BookListPage"
import Competitions from "./components/Competitions";


function App() {
  return (
    <Router basename="">
      <AppHeader/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/books' element={<BookListPage/>}/>
          <Route path='/books/:work_id' element={<BookDetailPage/>}/>
          <Route path='/reader-profile' element={<ReaderProfilePage/>}/>
          <Route path="*" element={<PageNotFound/>}/>
{/* 
          <Route path="/book/:olid" element={<BookDetailPage />} /> */}
          <Route path="/review" element={<ReviewForm />} />
          {/* <Route path="/competitions/:id" element={<Competitions />} /> */}
          <Route path="/competitions" element={<Competitions />} />

        </Routes>
      <AppFooter/>
    </Router>
  )
}

export default App
