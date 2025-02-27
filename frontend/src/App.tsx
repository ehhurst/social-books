import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AppHeader from "./components/AppHeader"
import AppFooter from "./components/AppFooter"
import Home from "./components/Home"

function App() {
  return (
    <Router basename="">
      <AppHeader/>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      <AppFooter/>
    </Router>
  )
}

export default App
