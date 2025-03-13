import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Jobs from "./pages/job/Jobs";
import ErrorPage from "./components/ErrorPage";
import Profile from "./pages/Profile";
import JobsDescription from "./components/JobsDescription";
import Search from "./pages/Search";
import Applicants from "./components/applicants/Applicants";
import UpdateJob from "./components/jobs/UpdateJob";
import Navbar from "./components/Navbar";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
     <Route path="/" element={<Home />} />
          {/*  <Route path="/jobs" element={<Jobs />} />
        <Route path="/discription/:id" element={<JobsDescription />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id/applicants" element={<Applicants />} />
        <Route path="/profile/update/:id" element={<UpdateJob />} /> */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Navbar />
    </Router>
  );
}

export default App;
