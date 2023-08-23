import "./App.css";
import Authentication from "./Containers/Authentication";
import Home from "./Containers/Home";
import { Route, Routes } from "react-router-dom";
import ProtectedPostsPage from "./Containers/ProtectedPostsPage";
import { useState, useEffect } from "react";
import { User } from "./Utils/types";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home currentUser={currentUser} />} />
      <Route
        path="/posts"
        element={<ProtectedPostsPage currentUser={currentUser} />}
      />
      <Route
        path="/auth"
        element={<Authentication setCurrentUser={setCurrentUser} />}
      />
    </Routes>
  );
}

export default App;
