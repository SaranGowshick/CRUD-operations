import react,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './css/index.css';
import logo from './assets/logo.png'

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
        }).then(alert("Employee Updated SuccessFully"))
    }
    const filteredKeys = Object.keys(employee[0] || {}).filter((key) => key !== '_id' && key !== '__v');

    return(
        <div className='update-employee'>
            <header className='employee-dashboard'>
                <div className='h1-text'>
                    <div>
                    <h1 id='dashboard-text'>Employee Dashboard</h1>
                    </div>
                </div>
                <div>
                    <img src={logo} alt='logo'/>
                </div>
            </header>
           
            <div className='employee'>
               
                <div class="employee-form">
                <div className="employee-align">
                <div className='text'>
                  <h3><b>Update Employee Details</b></h3>
                </div>    
                    <div className='employee-name'>
                        {/* <label htmlFor='employee-name'>EmployeeName:</label><br/> */}
                        <input type='text' onChange={(e)=>setUpdatedEmployeeName(e.target.value)} value={updatedEmployeeName}/>
                    </div>
                    <div className='employee-id'>
                        {/* <label htmlFor='employee-id'>EmployeeID:</label><br/> */}
                        <input type='text' onChange={(e)=>setUpdatedEmployeeID(e.target.value)} value={updatedEmployeeID}/>
                    </div>
                    <div className='employee-email'>
                        {/* <label htmlFor='employee-email'>Email.ID:</label><br/> */}
                        <input type='text'onChange={(e)=>setUpdateEmployeeEmail(e.target.value)}required={true} value={updatedEmployeeEmail}/>
                    </div>
                    <div className='employee-phone'>
                        {/* <label htmlFor='employee-phone'>Phone.Number:</label><br/> */}
                        <input type='tel'onChange={(e)=>setUpdateEmployeePhone(e.target.value)}required={true} value={updatedEmployeePhone}/>
                    </div>
                    <div className='button'>
                        <button id='btn'><Link className="link" to="/">Back</Link></button>
                        <button className='btn-submit'id='btn'onClick={Submit}><Link className="link" to="/">Submit</Link></button>
                    </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Update;
