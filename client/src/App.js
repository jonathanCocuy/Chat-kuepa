import RegisterUser from "./pages/RegisterPage";
import ProfileClass from "./pages/ProfileClass";
import ProtectedRoute from "./pages/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterUser />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profileclass" element={<ProfileClass />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
