import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EntryChoice from "./pages/EntryChoice";
import ProblemPage from "./pages/ProblemPage"; 
import ComplaintDetails from "./pages/ComplaintDetails";
import AddComplaint from "./pages/Sumbitcomplaint";
import ServicesHome from "./pages/ServicesHome";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { Box } from "@mui/material";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminComplaints from "./pages/AdminComplaints";
import AdminServices from "./pages/AdminServices";
import UsersPage from "./pages/UsersPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Box sx={{ minHeight: "calc(100vh - 64px)", bgcolor: '#f4f6f8' }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/choose" element={<EntryChoice />} />

          {/* Citizen Routes */}
          <Route path="/problem-home" element={<ProblemPage />} />
          <Route path="/services-home" element={<ServicesHome />} />
          <Route path="/problems" element={<ProblemPage />} />
          <Route path="/complaint/:id" element={<ComplaintDetails />} />
          <Route path="/add-complaint" element={<AddComplaint />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/complaints" element={<AdminComplaints />} />
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="/admin/users" element={<UsersPage />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
