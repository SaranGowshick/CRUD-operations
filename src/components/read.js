import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Update from './update';

const api_base="http://localhost:3001";
function Read() {
    const[employees,setEmployees]=useState([]);
    const[click,setClick]=useState(false);
  
    useEffect(()=>{
        GetEmployee();
    },[]);

    const GetEmployee=()=>{
        fetch(api_base+'/details')
            .then((res)=>res.json())
            .then((data)=>setEmployees(data))
            .catch((error)=>console.log(error))
    }

    const HandleOnClick=()=>{
      
      setClick(true);
      
    }
    const employeeDelete= async id => {
      
      const data = await fetch(api_base + '/deleteemployee/' + id, { method: "DELETE" }).then(res => res.json());
  
      setEmployees(employees=> employees.filter(employees => employees._id !== data.result._id));
      
    }
   
   
  const filteredKeys = Object.keys(employees[0] || {}).filter((key) => key !== '_id' && key !== '__v');
  return (
    <div className='employee'>
        <div className='employee-read'>
          <button><Link to='/'>Create</Link></button>
          <button onClick={HandleOnClick}>Show</button>
          <div>
          <table>
                    <thead>
                        <tr>
                           {filteredKeys && filteredKeys.length>0 &&
                            filteredKeys.map((key)=>(
                                <th key={key}>{key}</th>
                            ))
                            }
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                      {employees && employees.length > 0 &&
                                employees.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.Employeename}</td>
                                        <td>{item.EmployeeID}</td>
                                        <td>{item.Email}</td>
                                        <td>{item.Phone}</td>
                                        <td><button><Link to={`/update/${item._id}`}>update</Link></button></td>
                                        <td><button onClick={() => employeeDelete(item._id)}>delete</button></td>
                                    </tr>
                                ))
                            }
                    </tbody>
                </table>
                 
                 
          </div>
        </div>
        
    </div>
  );
}

export default Read;
