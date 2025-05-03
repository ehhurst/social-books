import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AppHeader from "./components/AppHeader"
import AppFooter from "./components/AppFooter"
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import BookDetailPage from "./components/BookDetailPage"
import ReaderProfilePage from "./components/ReaderProfilePage"
import ReviewForm from "./components/ReviewForm"
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
          <Route path="/review" element={<ReviewForm />} />
          {/* <Route path="/competitions/:id" element={<Competitions />} /> */}
          <Route path="/competitions" element={<Competitions />} />

            {/* Catch-all fallback route */}
          <Route path="*" element={<h1>404 Page Not Found</h1>} />


        </Routes>
      <AppFooter/>
    </Router>
  )
}

export default App
