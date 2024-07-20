import { TextField, Button, FormControl, InputLabel,Select,MenuItem, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import '../index.css';
import { useLocation, useNavigate } from "react-router-dom";

let CreateTransaction = ()=> {
    const navigate = useNavigate();
    const [amount, setAmount] = useState();
    const [type, setType] = useState("");
    const [account, setAccount] = useState("");
    const [myAccounts, setMyAccounts] = useState([]);
    const [myAccountNumbers, setMyAccountNumbers] = useState([]);
    const [accountNumber, setAccountNumber] = useState("");
    const [accountNames,setAccountNames] = useState([]);
    const [accountNumbers,setAccountNumbers] = useState([]);
    const [displayedAccountNumbers, setDisplayedAccountNumbers] = useState([]);
    const [error, setError] = useState(false);
    const [recieverName, setRecieverName] = useState("");
    const [recieverNumber, setRecieverNumber] = useState("");


    const types = ["Transfer", 'Deposit', "Withdraw"];
    const {state} = useLocation();
    let onAmountChange = (event)=>{
        if(type == "W" && (Number(event.target.value) > Number(state.account.accountBalance))){
            setAmount(Number(state.account.accountBalance));
        }else if(type == "T" && (Number(event.target.value) > Number(state.account.accountBalance))){
            setAmount(Number(state.account.accountBalance));
        }
        else if(Number(event.target.value) < 0){
            setAmount(0);
        }else{
            setAmount(Number(event.target.value));
        }
    }

    let handleBack = (event) => {

        navigate(-1);
    }

    useEffect(()=>{
        let getData = async () => {
            try{
                if(myAccounts.length >0) return;
                let res = await axios.get('https://meow-bank-production.up.railway.app/getbycustomer/'+state.customer.name);
                console.log(res.data);
                let myaccs = [];
                res.data.forEach(account => {
                    if(account.accountNumber != state.account.accountNumber){
                        myaccs.push(account);
                    }
                })
                setMyAccounts(myaccs);
                let accountNumbers = [];
                myaccs.forEach(account => {
                    accountNumbers.push(account.accountNumber);
                })
                console.log('account Numbers')
                console.log(accountNumbers);
                setMyAccountNumbers(accountNumbers);
            }catch(err){
                console.log(err);
            }
        }
        getData();
    },[myAccounts])

    let handleOnWithdraw =async (event) => {
        try{
            let reciever = recieverNumber
            let recivername = recieverName;
            if(account == 'I'){
                setRecieverNumber(accountNumber);
                reciever = accountNumber
                recivername = state.customer.name
            }
            
            let data = await axios.get('https://meow-bank-production.up.railway.app/getbyemail/'+localStorage.getItem('email'));
            axios.post('https://meow-bank-production.up.railway.app/addtransaction',{
                customerName: state.customer.name,
                accountNumber: state.account.accountNumber,
                amount,
                recieverNumber: reciever,
                recieverName: recivername,
                employeeName:data.data.name,
                type    
            }).then(data => {
                if(data.data.message == "success") navigate(-1);
            }).catch(err => {
                console.log(err.message);
            })
          }catch(err){
            console.log(err)
          }
        
    }
    
    let handleTransferChange = async (event) => {
        setAccount(event.target.value)
        console.log('1')
        console.log(myAccountNumbers);
        if(event.target.value == "E"){
            
        
            try{
                let res = await axios.get('https://meow-bank-production.up.railway.app/getallaccounts/');
                console.log(res.data);
                let accountNumberss = [];
                let accountNamess = [];
                res.data.forEach(account => {
                    if(account.customerName != state.customer.name){
                        accountNumberss.push(account.accountNumber);
                        accountNamess.push(account.customerName);
                    }
                })
                setAccountNumbers(accountNumberss);
                setAccountNames(accountNamess);
                setDisplayedAccountNumbers(accountNumberss);
                console.log(accountNumberss);
                console.log(accountNamess);
            }catch(err){
                console.log(err);
            }
        }
    }

    let handleAccountNameExternal = (event) => {
        setRecieverName(event.target.value);
        let displayed = [];
        accountNames.forEach((accountName,i) => {
            if(accountName === event.target.value){
                displayed.push(accountNumbers[i]);
            }
        })
        setDisplayedAccountNumbers(displayed);
    }

    let handleAccountNumberExternal = (event) => {
        setRecieverNumber(event.target.value);
    }

    let handleAccountNumber = (event) => {
        console.log(event.target.key)
        setAccountNumber(event.target.value);
        setRecieverName(state.customer.name);
    }
    return (
      <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
        <div style={{paddingTop:30,paddingBottom:60, fontSize:30}} className='fade-in-text'>
          <h2>Transaction by {state.customer.name}</h2>
        </div>
        <div style={{float:'left', boxShadow:'5px 10px', margin:20, padding:90, borderRadius:'25px', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', textAlign:'center'}}>
            <div>
            <div style={{marginBottom:20}}>
                <Typography style={{fontSize:20}}>Current Account Balance: {state.account.accountBalance}</Typography> 
            </div>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Transaction Type</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="type"
                onChange={(event)=> setType(event.target.value)}
            >
                <MenuItem value={"W"}>Withdrawal</MenuItem>
                <MenuItem value={"D"}>Deposit</MenuItem>
                <MenuItem value={"T"}>Transfer</MenuItem>
            </Select>
            </FormControl>
            {type == "W" ? (<div>
                    <div style={{padding:20}}>
                        <h2 style={{padding:20}}>Amount To Withdraw</h2>
                        <TextField placeholder="4000" type="number" value={amount} style={{width:400}} onChange={onAmountChange}/>
                    </div>
                    <div> 
            <Button variant="contained" style={{backgroundColor:'orange', padding:20}} onClick={handleOnWithdraw}>Withdraw</Button>
                    </div>     
                    </div>) :type == "D"? (<div>

                        <div style={{padding:20}}>
                        <h2 style={{padding:20}}>Amount To Deposit</h2>
                        <TextField placeholder="4000" type="number" value={amount} style={{width:400}} onChange={onAmountChange}/>
                    </div>
                    <div> 
            <Button variant="contained" style={{backgroundColor:'orange', padding:20}} onClick={handleOnWithdraw}>Deposit</Button>
                    </div>     
                    </div>): type == "T"? (<div style={{marginTop:30}}>
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Account</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={account}
                                label="account"
                                onChange={handleTransferChange}
                            >
                                <MenuItem value={"I"}>Internal</MenuItem>
                                <MenuItem value={"E"}>External</MenuItem>
                            </Select>
                        </FormControl>
                        {account == "I"? (<div style={{marginTop:30}}>
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Accounts</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={accountNumber}
                                label="account"
                                onChange={handleAccountNumber}
                            >
                                {myAccountNumbers.map((number,i) => {
                                    return (<MenuItem value={number} key={i} >{number}</MenuItem>);
                                })}
                            </Select>
                        </FormControl>
                        </div>): <div> <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Accounts</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={recieverName}
                                label="account"
                                onChange={handleAccountNameExternal}
                            >
                                {accountNames.map((name,i) => {
                                    return (<MenuItem value={name} key={i} >{name}</MenuItem>);
                                })}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Accounts</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={recieverNumber}
                                label="account"
                                onChange={handleAccountNumberExternal}
                            >
                                {displayedAccountNumbers.map((name,i) => {
                                    return (<MenuItem value={name} key={i} >{name}</MenuItem>);
                                })}
                            </Select>
                        </FormControl> </div>}
                            <div style={{padding:20}}>
                            <h2 style={{padding:20}}>Amount To Transfer</h2>
                            <TextField placeholder="4000" type="number" value={amount} style={{width:400}} onChange={onAmountChange}/>
                            </div>
                            <div> 
                            <Button variant="contained" style={{backgroundColor:'orange', padding:20}} onClick={handleOnWithdraw}>Transfer</Button>
                            </div>     
                        </div>) :""}
            </div>
        </div>
        <Button style={{fontSize:15}} onClick={handleBack}>Back</Button>
      </div>
    );
      
  }
  
  export default CreateTransaction;