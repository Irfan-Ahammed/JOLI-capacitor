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
import Explore from "./pages/Explore";
import Notification from "./pages/Notification";
import More from "./pages/More";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/post-job" element={<Notification />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/more" element={<More />} />
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
