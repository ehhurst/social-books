import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AppHeader from "./components/AppHeader"
import AppFooter from "./components/AppFooter"
import Home from "./components/Home"
import Login from "./components/Login"
import CategoryBookListPage from "./components/CategoryBookListPage"
import Register from "./components/Register"
import BookDetailPage from "./components/BookDetailPage"
import ReviewForm from "./components/ReviewForm"
import ReaderProfilePage from "./components/ReaderProfilePage"

function App() {
  return (
    <Router basename="">
      <AppHeader/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<CategoryBookListPage />} />
          <Route path="/book/:olid" element={<BookDetailPage />} />
          <Route path="/reader-profile" element={<ReaderProfilePage />} />
          <Route path="/review" element={<ReviewForm />} />
        </Routes>
      <AppFooter/>
    </Router>
  )
}

export default App
