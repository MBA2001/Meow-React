import { TextField, Button, Typography,Card,CardHeader,CardContent } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import '../index.css';
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../helpers/NavBar";

let Customer = ()=> {
    const [accounts, setAccounts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const {state} = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem("FBIdToken") == null || localStorage.getItem("FBIdToken").length < 20){
            navigate("/login");
          }
        let getAccounts =async () => {
            try{
                let res = await axios.get('https://meow-bank-production.up.railway.app/getbycustomer/'+state.customer.name);
                console.log(res.data);
                setAccounts(res.data);
            }catch(err){
                console.log(err);
            }
        }
        let getTransactions = async()=> {
            try{
                let res = await axios.get('https://meow-bank-production.up.railway.app/gettransactionbycustomer/'+state.customer.name);
                console.log(res.data);
                setTransactions(res.data);
            }catch(err){
                console.log(err);
            }
        }
        getAccounts();
        getTransactions();
    },[]);

    let handleDeleteAccount = async(event)=>{
        console.log('deleteed id');
        console.log(accounts[event.target.id].accountNumber);
        await axios.delete('https://meow-bank-production.up.railway.app/deleteaccount/'+accounts[event.target.id].accountNumber);
        let remaining = [];
        accounts.forEach((account,i) => {
            if(i != event.target.id){
                remaining.push(account);
            }
        })
        setAccounts(remaining);
    }

    let handleRemoveCustomer = async (event) => {
        await axios.delete('https://meow-bank-production.up.railway.app/deletecustomer/'+state.customer.name);
        navigate(-1);
    }
    let handleCreateTransaction = (event) => {
        navigate('/createtransaction',{state:{customer: state.customer, account: accounts[event.target.id]}});
    }
   
    let handleCreateNewAccount = (event) => {
        navigate('/createaccount',{state:{customer: state.customer}})
    }
    return (
        <>
        <NavBar/>
      <div style={{display:'flex', alignItems:'center', justifyContent:'center',flexWrap:'wrap'}}>
        <div style={{paddingTop:10,paddingBottom:20, fontSize:30, width:'100%', textAlign:'center'}} className='fade-in-text'>
          <h2>{state.customer.name}'s Info</h2>
        </div>
        <div style={{float:'left', boxShadow:'5px 10px', margin:20, padding:20, borderRadius:'25px', display:'flex',flexWrap:'wrap', alignItems:'center', justifyContent:'center', textAlign:'center'}}>
            <div style={{width:'100%', display:'flex', flexDirection:'row'}}>
                <div style={{ fontSize:20, width:'40%'}}>
                    <h2>Email</h2>
                    <Typography>{state.customer.email}</Typography>
                </div>    
                <div style={{width:'40%', fontSize:20}}>
                    <h2>Networth</h2>
                    <Typography>{state.customer.netWorth}</Typography>
                </div>
            </div>
            <div style={{width:'100%', display:'flex', flexWrap:'wrap'}}>
            {accounts.map((account,i) => {
                return (
                    <Card style={{width:'30%', margin:30, animation:'fadeIn '+(i+2)+'s'}}>
                        <CardHeader title={'AccountNumber: ' +account.accountNumber}/>
                        <CardContent>
                            <div style={{float:'left'}}>
                                <Typography>Account balance: {account.accountBalance}</Typography>
                                <Typography>Number of transactions: {account.numberOfTransactions}</Typography>
                            </div>
                            <div style={{float:'right', margin:5}}>
                                <Button style={{backgroundColor:'orange'}} variant="contained" id={i} onClick={handleCreateTransaction}>New Transaction</Button>
                                <Button style={{backgroundColor:'red', margin:5}} variant="contained" id={i} onClick={handleDeleteAccount}>Delete Account</Button>

                            </div>
                        </CardContent>
                    </Card>
                );
            })}
            </div>
            <Button variant="contained" style={{backgroundColor:'orange'}} onClick={handleCreateNewAccount}>Create New Account</Button>
            <Button variant="contained" style={{backgroundColor:'red', margin:5}} onClick={handleRemoveCustomer}>Remove Customer</Button>

        </div>
      </div>
      <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexWrap:'wrap'}}>
        
        {transactions.map((transaction,i) => {
         if(transaction.type == "D"){
             return (
                 <Card style={{width:'20%', margin:30,padding:'0 auto', animation:'fadeIn 1s'}}>
                     <CardHeader title={transaction.customerName}/>
                     <CardContent>
                         <div style={{float:'left'}}>
                         <Typography>Type: Deposit</Typography>
                             <Typography>Account number: {transaction.accountNumber}</Typography>
                             <Typography>Amount: {transaction.amount}</Typography>
                             <Typography>Employee name: {transaction.EmployeeName}</Typography>
                         </div>
                     </CardContent>
                 </Card>
             );
         }else if(transaction.type == "W"){
             return (
                 <Card style={{width:'20%', margin:30,padding:'0 auto', animation:'fadeIn 1s'}}>
                     <CardContent>
                         <div style={{float:'left'}}>
                             <Typography>Type: Withdrawal</Typography>
                             <Typography>Account number: {transaction.accountNumber}</Typography>
                             <Typography>Amount: {transaction.amount}</Typography>
                             <Typography>Employee name: {transaction.EmployeeName}</Typography>
                         </div>
                     </CardContent>
                 </Card>
             );
         }else {
             return(
             <Card style={{width:'20%', margin:30,padding:'0 auto', animation:'fadeIn 1s'}}>
             <CardContent>
                 <div style={{float:'left'}}>
                     <Typography>Type: Transfer</Typography>
                     <Typography>From Account number: {transaction.accountNumber}</Typography>
                     <Typography>To Account number: {transaction.recieverNumber}</Typography>
                     <Typography>Amount: {transaction.amount}</Typography>
                     <Typography>Employee name: {transaction.EmployeeName}</Typography>
                 </div>
             </CardContent>
         </Card>);
         }
         
        })}
       </div>
      </>
    );
      
  }
  
  export default Customer;