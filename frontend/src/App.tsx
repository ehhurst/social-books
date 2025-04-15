import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AppHeader from "./components/AppHeader"
import AppFooter from "./components/AppFooter"
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import BookDetailPage from "./components/BookDetailPage"
import ReaderProfilePage from "./components/ReaderProfilePage"
import ReviewForm from "./components/ReviewForm"
import PageNotFound from "./components/PageNotFound"
import BookListPage from "./components/BookListPage"
import Competitions from "./components/Competitions";

import CategoryPage from "./components/CategoryPage"
import SearchResultsPage from "./components/SearchResultsPage"

function App() {
  return (
    <Router basename="">
      <AppHeader/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path=':user/profile' element={<ReaderProfilePage/>}/>

          <Route path='/books' element={<SearchResultsPage/>}/>
          <Route path='/books/:work_id' element={<BookDetailPage/>}/>
          <Route path='/categories' element={<CategoryPage/>}>
            <Route path=':category' element={<CategoryPage/>}/>
          </Route>
          

          
          
            
          <Route path="/review" element={<ReviewForm />} />
          {/* <Route path="/competitions/:id" element={<Competitions />} /> */}
          <Route path="/competitions" element={<Competitions />} />

          <Route path="*" element={<PageNotFound/>}/>     
        </Routes>
      <AppFooter/>
    </Router>
  )
}

export default App
