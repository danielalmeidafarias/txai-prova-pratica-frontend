import { Routes, Route, Navigate } from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Products from "./pages/Products"
import Layout from "./components/layout/Layout"

const NotFound = () => {
  return <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route element={<Layout />}>
          <Route path="/products" element={<Products />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
