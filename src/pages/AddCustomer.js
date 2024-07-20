import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import '../index.css';
import { useNavigate } from "react-router-dom";

let AddCustomer = ()=> {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [success, setsuccess] = useState(false);
    let onNameChange = (event)=>{
        setName(event.target.value.trim());
    }

    let onEmailChange = (event)=>{
        setEmail(event.target.value.trim());
    }

    let myFunction = async ()=> {
        let response = await axios.get('https://meow-bank-production.up.railway.app/getcustomer/'+name);
        navigate('/customer',{state:{customer:response.data}});
    }

    useEffect(()=>{
        if(localStorage.getItem("FBIdToken") == null || localStorage.getItem("FBIdToken").length < 20){
            navigate("/login");
          }
    },[])

    let handleOnClick = (event) => {
        console.log(email);
        console.log(name);
        axios.post('https://meow-bank-production.up.railway.app/addcustomer',{
            name,
            email
        }).then(data => {
            if(data.data.message == "success"){
                console.log("success");
                setsuccess(true);
                setTimeout(myFunction, 1000);
            }
        }).catch(err => {
            console.log(err.message);
        })
    }
    return (
      <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
        <div style={{paddingTop:30,paddingBottom:60, fontSize:30}} className='fade-in-text'>
          <h2>Add a new customer</h2>
        </div>
        <div style={{float:'left', boxShadow:'5px 10px', margin:20, padding:90, borderRadius:'25px', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', textAlign:'center'}}>
            <div>
                <div style={{padding:20}}>
                    <h2>Full Name</h2>
                    <TextField style={{width:400}} onChange={onNameChange}/>
                </div>
                <div style={{padding:20}}>
                    <h2>Email</h2>
                    <TextField style={{width:400}} onChange={onEmailChange}/>
                </div>
                {success ? <h2 className="fade-out-text">Customer added Successfuly</h2> : ""}
                
            </div>
            <Button variant="contained" style={{backgroundColor:'orange', padding:20}} onClick={handleOnClick}>Add Customer</Button>
        </div>
      </div>
    );
      
  }
  
  export default AddCustomer;