import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import '../index.css';
import { useNavigate } from "react-router-dom";

let AddEmployee = ()=> {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass,setConfirmPass] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [success, setsuccess] = useState(false);
    const [error,setError] = useState("");
    let onNameChange = (event)=>{
        setName(event.target.value);
    }

    let onEmailChange = (event)=>{
        setEmail(event.target.value);
    }

    let myFunction = ()=> {
        setsuccess(false);
    }

    useEffect(()=>{
        if(localStorage.getItem("FBIdToken") == null || localStorage.getItem("FBIdToken").length < 20){
            navigate("/login");
          }
    },[])

    let handleOnClick = (event) => {
        if(password != confirmPass){
            setError("password and confirmpassword do not match");
            return;
        }else if(password.length < 6){
            setError("password should be atleast 6 characters");
            return;
        }
        console.log(email);
        console.log(name);
        axios.post('https://meow-bank-production.up.railway.app/signup',{
            name: name.trim(),
            email: email.trim(),
            password,
            jobTitle,
            age
        }).then(data => {
            if(data.data.token != undefined){
                console.log("success");
                setsuccess(true);
                setError("");
                setTimeout(myFunction, 80000)
            }
        }).catch(err => {
            console.log(err);
        })
    }
    return (
      <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
        <div style={{paddingTop:30,paddingBottom:60, fontSize:30}} className='fade-in-text'>
          <h2>Add a new Employee</h2>
        </div>
        <div style={{float:'left', boxShadow:'5px 10px', margin:20, padding:90, borderRadius:'25px', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', textAlign:'center'}}>
            <div>
                <div style={{padding:20}}>
                    <h2>Full Name</h2>
                    <TextField style={{width:400}} value={name} onChange={onNameChange}/>
                </div>
                <div style={{padding:20}}>
                    <h2>Password</h2>
                    <TextField type="password" style={{width:400}} value={password} onChange={(event)=> setPassword(event.target.value)}/>
                </div>
                <div style={{padding:20}}>
                    <h2>Confirm Password</h2>
                    <TextField style={{width:400}} type="password" value={confirmPass} onChange={(event)=> setConfirmPass(event.target.value)}/>
                </div>
                <div style={{padding:20}}>
                    <h2>Email</h2>
                    <TextField style={{width:400}} value={email} onChange={onEmailChange}/>
                </div>
                
                <div style={{padding:20}}>
                    <h2>Job title</h2>
                    <TextField style={{width:400}} value={jobTitle} onChange={event => setJobTitle(event.target.value)}/>
                </div>
                <div style={{padding:20}}>
                    <h2>Age</h2>
                    <TextField type="number" style={{width:400}} value={age} onChange={event => setAge(event.target.value)}/>
                </div>
                {success ? <h2 className="fade-out-text">Employee added Successfuly</h2> : ""}
                {error != "" ? <h2 className="fade-out-text" style={{color:'red'}}>{error}</h2> : ""}
                
            </div>
            <Button variant="contained" style={{backgroundColor:'orange', padding:20}} onClick={handleOnClick}>Add Employee</Button>
        </div>
      </div>
    );
      
  }
  
  export default AddEmployee;