import { Container } from "react-bootstrap"
import { Routes, Route }  from 'react-router-dom'
import Home   from "./pages/Home"
import Store  from "./pages/Store"
import About  from "./pages/About"
import Layout from "./components/Layout"
import Navbar from "./components/Navbar"

function App() {

  return (
    <>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={ <Home  /> } />
            <Route path="/store" element={ <Store  /> } />
            <Route path="/about" element={ <About  /> } />
          </Route>
        </Routes>
      </Container>
    </>
  )
}

export default App
