import { Routes, Route } from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Products from "./pages/Products"
import Layout from "./components/layout/Layout"

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route element={<Layout />}>
          <Route path="/products" element={<Products />} />
        </Route>
    </Routes>
  )
}

export default App
