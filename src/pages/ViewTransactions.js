import { TextField, Button, Card, CardHeader, CardContent, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import '../index.css';
import { useNavigate } from "react-router-dom";

let ViewTransactions = ()=> {
    const [transactions, setTransactions] = useState([]);
    const [time, setTime] = useState(Date.now());
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem("FBIdToken") == null || localStorage.getItem("FBIdToken").length < 20){
            navigate("/login");
          }
        let getTransactions =async () => {
            try{
                let res = await axios.get('https://meow-bank-production.up.railway.app/getalltransactions');
                console.log(res.data);
                let t = transactions;
                setTransactions(res.data);
                res.data.foreach(data => {
                    if(!t.includes(data)){
                        t.push(data);
                    }
                });
                setTransactions(t);
            }catch(err){
                console.log(err);
            }
        }
        getTransactions();

        const interval = setInterval(() => {
            setTime(Date.now())
            getTransactions();
        }, 10000);
        return () => {
            clearInterval(interval);
        };
    },[]);

    setTimeout(function(){
        window.location.reload(1);
     }, 10000);

     let handleButton = async (event) => {
        //Navigate to user screen
        try{
            let res = await axios.get('https://meow-bank-production.up.railway.app/getcustomer/'+transactions[event.target.id].customerName);
            console.log(res.data);
            navigate('/customer',{state:{customer:res.data}})
        }catch(err){
            console.log(err);
        }
    }

    return (
        <>
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', textAlign:"center",padding:20}}>
            <Typography variant="h2">
                All Transactions (In-Real-Time)
            </Typography>
        </div>
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexWrap:'wrap'}}>
        
       {transactions.map((transaction,i) => {
        if(transaction.type == "D"){
            return (
                <Card style={{width:'40%', margin:30,padding:'0 auto', animation:'fadeIn 1s'}}>
                    <CardHeader title={transaction.customerName}/>
                    <CardContent>
                        <div style={{float:'left'}}>
                        <Typography>Type: Deposit</Typography>
                            <Typography>Account number: {transaction.accountNumber}</Typography>
                            <Typography>Amount: {transaction.amount}</Typography>
                            <Typography>Employee name: {transaction.EmployeeName}</Typography>
                        </div>
                        <div style={{float:'right', margin:30}}>
                            <Button variant="contained" style={{backgroundColor:'orange'}} onClick={handleButton} id={i}>Account Info</Button>
                        </div>
                    </CardContent>
                </Card>
            );
        }else if(transaction.type == "W"){
            return (
                <Card style={{width:'40%', margin:30,padding:'0 auto', animation:'fadeIn 1s'}}>
                    <CardHeader title={transaction.customerName}/>
                    <CardContent>
                        <div style={{float:'left'}}>
                            <Typography>Type: Withdrawal</Typography>
                            <Typography>Account number: {transaction.accountNumber}</Typography>
                            <Typography>Amount: {transaction.amount}</Typography>
                            <Typography>Employee name: {transaction.EmployeeName}</Typography>
                        </div>
                        <div style={{float:'right', margin:30}}>
                            <Button variant="contained" style={{backgroundColor:'orange'}} onClick={handleButton} id={i}>Account Info</Button>
                        </div>
                    </CardContent>
                </Card>
            );
        }else {
            return(
            <Card style={{width:'40%', margin:30,padding:'0 auto', animation:'fadeIn 1s'}}>
            <CardHeader title={transaction.customerName}/>
            <CardContent>
                <div style={{float:'left'}}>
                    <Typography>Type: Transfer</Typography>
                    <Typography>From Account number: {transaction.accountNumber}</Typography>
                    <Typography>To Account number: {transaction.recieverNumber}</Typography>
                    <Typography>Amount: {transaction.amount}</Typography>
                    <Typography>Employee name: {transaction.EmployeeName}</Typography>
                </div>
                <div style={{float:'right', margin:30}}>
                    <Button variant="contained" style={{backgroundColor:'orange'}} onClick={handleButton} id={i}>Account Info</Button>
                </div>
            </CardContent>
        </Card>);
        }
        
       })}
      </div>
        </>
      
    );
      
  }
  
  export default ViewTransactions;