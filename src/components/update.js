import react,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';

const api_base="http://localhost:3001";
function Update(){
    const {id}=useParams();
    const[employee,setEmployee]=useState([]);
    const [updatedEmployeeName, setUpdatedEmployeeName] = useState('');
    const [updatedEmployeeID, setUpdatedEmployeeID] = useState('');
    const [updatedEmployeeEmail, setUpdateEmployeeEmail] = useState('');
    const [updatedEmployeePhone, setUpdateEmployeePhone] = useState('');
    useEffect(()=>{
        fetch(api_base+`/details/${id}`)
        .then((res)=>res.json())
        .then((fetchedData)=>{
            const data=fetchedData;
            setEmployee(data)
            setUpdatedEmployeeName(data[0].Employeename);
            setUpdatedEmployeeID(data[0].EmployeeID);
            setUpdateEmployeeEmail(data[0].Email);
            setUpdateEmployeePhone(data[0].Phone);
        });
    },[id])

    async function Submit(){
        await fetch(api_base+`/update/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Employeename:updatedEmployeeName,
                EmployeeID:updatedEmployeeID,
                Email: updatedEmployeeEmail,
                Phone: updatedEmployeePhone,
            }),
        });
    }
    const filteredKeys = Object.keys(employee[0] || {}).filter((key) => key !== '_id' && key !== '__v');

    return(
        <div className='update-employee'>
            <div className='current-employee'>
                <table>
                    <thead>
                        <tr>
                           {filteredKeys && filteredKeys.length>0 &&
                            filteredKeys.map((key)=>(
                                <th key={key}>{key}</th>
                            ))
                           }
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        { employee && employee.length >0 &&
                            employee.map((item)=>(
                                <><td key={item._id}>{item.Employeename}</td>
                                    <td key={item._id}>{item.EmployeeID}</td>
                                    <td key={item._id}>{item.Email}</td>
                                    <td key={item._id}>{item.Phone}</td></>
                                
                        ))
                    }
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className='modify-employee'>
                <div class="update-form">
                    <div className='employee-name'>
                        <label htmlFor='employee-name'>EmployeeName:</label>
                        <input type='text' placeholder='Enter Your Name' onChange={(e)=>setUpdatedEmployeeName(e.target.value)}/>
                    </div>
                    <div className='employee-id'>
                        <label htmlFor='employee-id'>EmployeeID:</label>
                        <input type='text' placeholder='Enter Your ID'onChange={(e)=>setUpdatedEmployeeID(e.target.value)}/>
                    </div>
                    <div className='employee-email'>
                        <label htmlFor='employee-email'>Email.ID:</label>
                        <input type='text'onChange={(e)=>setUpdateEmployeeEmail(e.target.value)}required={true}/>
                    </div>
                    <br/>
                    <div className='employee-phone'>
                        <label htmlFor='employee-phone'>Phone.Number:</label>
                        <input type='tel'onChange={(e)=>setUpdateEmployeePhone(e.target.value)}required={true}/>
                    </div>
                    <div className='submit-button'>
                        <button onClick={Submit}>Submit</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Update;