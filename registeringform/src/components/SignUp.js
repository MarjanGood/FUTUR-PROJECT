import React, { useEffect, useState } from 'react'
import {validation} from './validation';
import {ToastContainer} from 'react-toastify'
import {notify} from './toast'
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {

const[data,setData]=useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    isAccepted:false
})
const [errors,setErrors]=useState({});
const [touched,setTouched]=useState({});

useEffect(()=>{

    setErrors(validation(data));
    console.log(errors);
},[data,touched])

const changeHandler= event =>{
    if(event.target.name === "isAccepted"){
        setData({...data,[event.target.name]:event.target.checked})
    }else{
        setData({...data,[event.target.name]: event.target.value})
    }
    console.log(data)
}

const focusHandler=(event)=>{
    setTouched({ ...touched,[event.target.name]:true })
}

const submitHandler= event =>{
    debugger
    event.preventDefault();
    if(!Object.keys(errors).length){
        notify("You login successfuly","success");
       // console.log(data)
    }else{
        notify("Invalid Data","error");

        setTouched({
            name:true,
            email:true,
            password:true,
            confirmPassword:true,
            isAccepted:true
        })
    }
}
  return (
    <div>
        <form onSubmit={submitHandler}>
            <h2>SignUp</h2>
            <div>
                <label>Name</label>
                <input type="text" name="name" value={data.name} onChange={changeHandler} onFocus={focusHandler}></input>
                {errors.name && touched.name &&  <span>{errors.name}</span>}
            </div>
            <div>
                <label>Email</label>
                <input type="text" name="email" value={data.email} onChange={changeHandler} onFocus={focusHandler}></input>
                {errors.email && touched.email && <span>{errors.email}</span>}

            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" value={data.password} onChange={changeHandler} onFocus={focusHandler}></input>
                {errors.password && touched.password && <span>{errors.password}</span>}

            </div>
            <div>
                <label>confirm password</label>
                <input type="password" name="confirmPassword" value={data.confirmPassword} onChange={changeHandler} onFocus={focusHandler}></input>
                {errors.confirmPassword && touched.confirmPassword && <span>{errors.confirmPassword}</span>}

            </div>
            <div>
                <label>I accept terms of privacy policy</label>
                <input type="checkbox" name="isAccepted" value={data.isAccepted} onChange={changeHandler} onFocus={focusHandler}></input>
                {errors.isAccepted  && touched.isAccepted && <span>{errors.isAccepted }</span>}

            </div>
            <div>
                <a href="#">Login</a>
                <button type='submit'>Sign up</button>
            </div>
        </form>
        <ToastContainer />
    </div>
  )
}
