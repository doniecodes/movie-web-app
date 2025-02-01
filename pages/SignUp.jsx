import React, { useState } from 'react'
import { Form, useLoaderData, useNavigate, useSearchParams } from 'react-router-dom'
import { createUser, loginUser } from '../data/api';
import { ToastContainer, toast } from 'react-toastify';

export async function loader({request}){
  const url = new URL(request.url).searchParams.get("message")
  return url
}

const SignUp = () => {
  const loginFirst = useLoaderData();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [createUserError, setCreateUserError] = useState(null);
  const [existingUser, setExistingUser] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLoginValidation, setUserLoginValidation] = useState(null);
  const [userLoginSuccess, setUserLoginSuccess] = useState(null);
  const [formErrors, setFormErrors] = useState({
    formEmpty : "",
    username : "",
    email : "",
    password : ""
  });

  const handleCreateAccount = ()=> {
    setExistingUser((prevState)=> {
      return !prevState;
    })
  }

  
  const handleSubmit = async (e)=> {
    e.preventDefault();
    // Form validation before creating user.
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const pathname = new URLSearchParams(searchParams).get("redirectTo") || "/";
  if(username === "" && email === "" && password === "" ){
    setFormErrors({formEmpty : "Form can't be empty"})
  } else if(username.length < 1){
    setFormErrors({username : "Create username"})
  } else if (email.indexOf("@") === -1){
    setFormErrors({email : "Enter a valid email"})
  } else if (password.length < 3){
    setFormErrors({password : "Enter a strong password"})
  } else {
    // Create User if form is valid
    try{
      await createUser({username, email, password});
      localStorage.setItem("isLoggedIn", true)
      navigate(pathname);

    } catch(err){
      setCreateUserError(err);
    }
    }
  }

  // Login Functionality 
  const handleLogin = async (e)=> {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const pathname = new URLSearchParams(searchParams).get("redirectTo") || "/"
    try{
      const data = await loginUser();
      const logUserIn = data.map((user)=> {  
        if(user.email == email && user.password === password){
          setUserLoginSuccess(`Welcome back ${user.username}`)
          localStorage.setItem("isLoggedIn", true)
          setIsLoggedIn(true);
          setTimeout(() => {
            navigate(pathname);
          }, 1000);
        } else if(user.email === email && user.password !== password)
          {
          setUserLoginValidation("Wrong password!")
        } else if(user.email !== email  && user.password !== password)
        {
          setUserLoginValidation("User not found!")
        }
    })
    return logUserIn;

    } catch(err){
      return err
    }
  } 


  return (
    <>
    <section className='sign-up-section'>
        <div className="form-container">
          <h1 className="heading-4">{existingUser ? "Log In" : "Sign Up"}</h1>
          { loginFirst !=="" ?
          <h2 className="red-text-msg">
            {loginFirst}
          </h2> : null }
            
          {!existingUser && <h2 className="red-text-msg">{formErrors.formEmpty}</h2>}
          {userLoginValidation &&
          <h2 className="">{ !isLoggedIn ? userLoginValidation : userLoginSuccess}</h2>}

          <form className='form'
            method={!existingUser ? "post" : ""}
            onSubmit={!existingUser ? handleSubmit : handleLogin}>
            <div className="form-group">
            {!existingUser && <input type="text" name="username" placeholder='Create Username'/>}
            {!existingUser && <span>{formErrors.username}</span>}
            </div>

            <div className="form-group">
            <input type="text" name="email" placeholder='Enter your email'/>
            {!existingUser && <span>{formErrors.email}</span>}
            </div>

            <div className="form-group">
            <input type="password" name="password" placeholder='Enter your password'/>
            {!existingUser && <span>{formErrors.password}</span>}
            </div>
            { existingUser &&
              <button className='form-button'>{!isLoggedIn ?
                "Log in" : "Logging in"
              }</button> }
            {!existingUser &&
              <button className='form-button'>Create account</button> }
           
            <button type="button" onClick={handleCreateAccount} className="create-account-text">
              {existingUser ? "Create an account" : "Log In"}
            </button>
          </form>

          {createUserError && <div>{createUserError.message}</div>}
        </div>
    </section>
    </>
  )
}

export default SignUp


{/*  <p className="forgot-password">Forgot password?</p> */}