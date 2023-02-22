import "./App.css";
import "./assert/css/global.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import socketIO from "socket.io-client";

import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";
import DefaultLayout from "layouts/DefaultLayout";
import ProtectedRouter from "utils/ProtectedRouter";
import Chat from "pages/Chat";
import Profile from "pages/Profile";
import Tasks from "pages/Tasks";
import NotFound from "pages/NotFound";

const socket = socketIO.connect("http://localhost:8080");

function App() {
  return (
    <div className="App scrollbar-hidden">
      <Router>
        <Routes>
          <Route element={<ProtectedRouter socket={socket} />}>
            <Route element={<DefaultLayout socket={socket} />}>
              <Route element={<Chat socket={socket} />} path="/" />
              <Route element={<Profile socket={socket} />} path="/profile" />
              <Route element={<Tasks socket={socket} />} path="/tasks" />
            </Route>
          </Route>
          <Route element={<SignIn />} path="/sign_in" />
          <Route element={<SignUp />} path="/sign_up" socket={socket} />
          <Route element={<NotFound />} path="*" />
        </Routes>
      </Router>
      <ToastContainer position="bottom-right" autoClose="5000" />
    </div>
  );
}

export default App;
