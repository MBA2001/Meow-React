import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import '../index.css';
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../helpers/NavBar";

let CreateAccount = ()=> {
    const navigate = useNavigate();
    const [amount, setAmount] = useState(0);
    const {state} = useLocation();
    let onAmountChange = (event)=>{
        if(Number(event.target.value) < 0){
            setAmount(0);
        }else{
            setAmount(Number(event.target.value));
        }
    }

    useEffect(() => {
        if(localStorage.getItem("FBIdToken") == null || localStorage.getItem("FBIdToken").length < 20){
            navigate("/login");
          }
    },[])

    let handleBack = (event) => {

        navigate(-1);
    }

    let handleOnClick = (event) => {
        axios.post('https://meow-bank-production.up.railway.app/addaccount',{
            customerName: state.customer.name,
            customerEmail: state.customer.email,
            accountBalance: amount
        }).then(data => {
            if(data.data.message == "success") navigate(-1);
        }).catch(err => {
            console.log(err.message);
        })
    }
    return (
        <>
        <NavBar/>
      <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
        <div style={{paddingTop:30,paddingBottom:60, fontSize:30}} className='fade-in-text'>
          <h2>Add an Account for {state.customer.name}</h2>
        </div>
        <div style={{float:'left', boxShadow:'5px 10px', margin:20, padding:90, borderRadius:'25px', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', textAlign:'center'}}>
            <div>
                <div style={{padding:20}}>
                    <h2 style={{padding:20}}>Amount To Deposit</h2>
                    <TextField placeholder="4000" type="number" style={{width:400}} onChange={onAmountChange} value={amount}/>
                </div>                
            </div>
            <Button variant="contained" style={{backgroundColor:'orange', padding:20}} onClick={handleOnClick}>Add Account</Button>
        </div>
        <Button style={{fontSize:15}} onClick={handleBack}>Back</Button>
      </div>
      </>
    );
      
  }
  
  export default CreateAccount;