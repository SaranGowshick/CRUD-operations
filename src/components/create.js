import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {Link } from 'react-router-dom';
import './css/index.css';

const api_base="http://localhost:3001";
function Create() {
  const[employeeName,setEmployeename]=useState('');
  const[employeeID,setEmployeeID]=useState('');
  const[employeeEmail,setEmployeeEmail]=useState('');
  const[employeePhone,setEmployeePhone]=useState('');
  const[errors,setErrors]=useState({});
  
  const validateInputs=()=>{
    const error={};
    if(employeeName.trim() === ''){
      alert("Enter Employee Name")
      error.employeeName = 'Enter Employee Name';
    }
    if(employeeID.length>6){
      alert("Id Should not greater Than 6")
      error.employeeID = 'Id error';
    }
    if(employeeEmail.trim() === ''){
      alert("Missing Email Field");
      errors.employeeEmail = 'Missing Email Field';
    }else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(employeeEmail)) {
      alert("Wrong Email ID")
      errors.employeeEmail = 'Invalid email address';
    }
    if(employeePhone.length>10){
      alert("Phone Number Should Not Be Greater Than 10 Numbers");
      error.employeePhone='Invalid Phone Number';
    }
    setErrors(error);
    return Object.keys(error).length === 0;
  }
  async function Submit(){
      
    try {
      if(validateInputs()){
        console.log("entered")
        await axios.post(api_base + '/employee', {
          EmployeeName: employeeName,
          EmployeeID: employeeID,
          EmployeeEmail:employeeEmail,
          EmployeePhone:employeePhone
        }).then((res)=>{
          console.log("response")
          if(res.status===201){
            alert("Employee Data Saved Successfully");
            setEmployeename('');
            setEmployeeID('');
            setEmployeeEmail('');
          }else if(res.status===400){
            console.log("hello")
            alert("Missing Form Data");
          }
        })
      }else{
        const error={};
        setErrors(error);
      }
    }catch(error){
      console.log('Error submitting employee:', error);
    }
  }
  
 

  
  return (
    <div className='employee'>
        <header>
          <h1>Enter Employee Details</h1>
        </header>
        <div className='employee-form'>
            <div className='employee-name'>
              <label htmlFor='employee-name'>EmployeeName:</label>
              <input type='text'onChange={(e)=>setEmployeename(e.target.value)} required={true}/>
            </div>
            <br/>
            <div className='employee-id'>
              <label htmlFor='employee-id'>EmployeeID:</label>
              <input type='text'onChange={(e)=>setEmployeeID(e.target.value)}required={true}/>
            </div>
            <br/>
            <div className='employee-email'>
              <label htmlFor='employee-email'>Email.ID:</label>
              <input type='text'onChange={(e)=>setEmployeeEmail(e.target.value)}required={true}/>
            </div>
            <br/>
            <div className='employee-phone'>
              <label htmlFor='employee-phone'>Phone.Number:</label>
              <input type='tel'onChange={(e)=>setEmployeePhone(e.target.value)}required={true}/>
            </div>
            <br/>
            <div className='submit-button'>
              <button onClick={Submit}>Submit</button>
            </div>
        </div>
        <br/>
        <button><Link to="/read">Read</Link>
        </button>
    </div>
  );
}

export default Create;
