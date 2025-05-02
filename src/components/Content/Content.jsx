import Header from "../Header/Header";
import RegisterForm from "../Login/RegisterForm";
import LoginForm from "../Login/LoginForm";
import Profile from "../Profile/Profile";
import FeedbackList from "../Feedback/FeedbackList";
import About from "../About/About";
import UserList from "../Admin/UserList";
import UserAdd from "../Admin/UserAdd";
import DeleteUser from "../Admin/DeleteUser";
import Footer from "../Footer/Footer";
import FeedbackAdmin from "../Admin/FeedbackAdmin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLoginState } from "../../hooks/useLoginState";

function Content() {
  const isAuthenticated = useLoginState();
  console.log(isAuthenticated)

  return (
    <>
      <Router>
        <Header />
        <div className="mt-4 flex-grow-1">
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <FeedbackList /> : <RegisterForm />}
            />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about_me" element={<About />} />
            <Route path="admin">
              <Route path="users" element={<UserList />} />
              <Route path="users/add" element={<UserAdd />} />
              <Route path="users/delete" element={<DeleteUser />} />
              <Route path="users/feedback" element={<FeedbackAdmin />} />
            </Route>
          </Routes>
          </div>
          <Footer />
      </Router>
    </>
  );
}

export default Content;
