import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/Register";
import EntryChoice from "./pages/EntryChoice";
imoprt ProblemPage from "./pages/ProblemPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/choose" element={<EntryChoice />} />
        <Route path="/problem-home" element={<ProblemHome />} />
        <Route path="/services-home" element={<ServicesHome />} />
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/complaint/:id" element={<ComplaintDetails />} />
        <Route path="/add-complaint" element={<AddComplaint />} />
      </Routes>
    </Router>
  );
}

export default App;
