import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/auth/Home";
import Signup from "./pages/auth/Signup";
import AdminDashboard from "./pages/admin/Dashboard";
import TeacherDashboard from "./pages/teacher/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/Dashboard/Teacher" element={<TeacherDashboard />} />
      <Route path="/Dashboard/Admin" element={<AdminDashboard />} />

    </Routes>
  );
}

export default App;
