import React, { useState, useEffect } from "react";
import "../Utils/Authentication.css";
import FormLogin from "../Components/Users/FormLogin";
import FormSignUp from "../Components/Users/FormSignUp";
import { useNavigate } from "react-router-dom";
import { User } from "../Utils/types";
import { LoginUser, SignUpUser } from "../Utils/Authentication";

const Authentication = ({setCurrentUser}: {setCurrentUser: (user: User | null) => void;}) => {
  const [isSignUpPage, setIsSignUpPage] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const usersFromLocalStorage = localStorage.getItem("users");
    if (usersFromLocalStorage) {
      const parsedUsers = JSON.parse(usersFromLocalStorage);
      setUsers(parsedUsers);
    }
  }, []);

  const handleClick = () => {
    setIsSignUpPage(!isSignUpPage);
  };

  const handleSignUpSubmit = (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    const newUser: User = SignUpUser(users,values);
    setCurrentUser(newUser); //state updated in HOC
    navigate("/posts");
  };

  const handleLoginSubmit = (values: { email: string; password: string }) => {
    const user = users.find(
      (user) => user.email === values.email && user.password === values.password
    );
    if (user) {
      LoginUser(user);
      setCurrentUser(user);
      navigate("/posts");
    } 
    else {
      alert("User not found");
    }
  };

  return (
    <div className="auth-page d-flex">
      <div className="left shadow-lg">
        {isSignUpPage ? (
          <FormLogin handleLogin={handleLoginSubmit} />
        ) : (
          <FormSignUp handleSignUp={handleSignUpSubmit} />
        )}
      </div>
      <div className="right shadow-lg">
        {isSignUpPage ? (
          <>
            <h1>Welcome to Login</h1>
            <h4>Don't have an account?</h4>
            <button
              className="btn btn-outline-primary mt-4"
              onClick={handleClick}
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <h1>Welcome to Sign Up</h1>
            <h4>Have an account?</h4>
            <button
              className="btn btn-outline-primary mt-4"
              onClick={handleClick}
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Authentication;
