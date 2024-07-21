import { TextField, Button, Card, CardHeader, CardContent, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import '../index.css';
import { useNavigate } from "react-router-dom";
import NavBar from "../helpers/NavBar";

let ViewCustomers = ()=> {
    let navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [displayed, setDisplayed] = useState([]);
    const [searchValue, SetSearchValue] = useState("");

    let handleButton = (event) => {
        let customer = customers[event.target.id];
        //Navigate to user screen
        navigate('/customer',{state:{customer}})
    }

    let handleSearchChange = (event) => {
        SetSearchValue(event.target.value);
        if(event.target.value == ''){
            setDisplayed(customers);
            return;
        }
        const regex = new RegExp(searchValue)
        let newDisplayed = [];
        customers.forEach(item => {
            if(regex.test(item.name)){
                newDisplayed.push(item);
            }
        })
        setDisplayed(newDisplayed);
    }
    useEffect(() => {
        if(localStorage.getItem("FBIdToken") == null || localStorage.getItem("FBIdToken").length < 20){
            navigate("/login");
          }
        let getCustomers =async () => {
            try{
                let res = await axios.get('https://meow-bank-production.up.railway.app/getallcustomers');
                setCustomers(res.data);
                setDisplayed(res.data);
            }catch(err){
                console.log(err);
            }
        }
        getCustomers();
    },[]);
    return (
        <>
        <NavBar/>
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', textAlign:"center",padding:20}}>
            <Typography variant="h2" style={{paddingTop:40}}>
                All Customers
            </Typography>
        </div>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <TextField value={searchValue} 
            onChange={handleSearchChange}
            style={{width:500}}
            placeholder="Search"
            />
            
        </div>
        <div style={{display:'flex', alignItems:'center', justifyContent:'center',flexWrap:'wrap'}}>
        
       {displayed.map((customer,i) => {
        return (
            <Card style={{width:'40%', margin:30,padding:'0 auto', animation:'fadeIn '+(i+2)+'s'}}>
                <CardHeader title={customer.name}/>
                <CardContent>
                    <div style={{float:'left'}}>
                        <Typography>Email: {customer.email}</Typography>
                        <Typography>Number of accounts: {customer.numOfAccounts}</Typography>
                        <Typography>Networth: {customer.netWorth}</Typography>
                    </div>
                    <div style={{float:'right', margin:20}}>
                        <Button variant="contained" id={i} onClick={handleButton} style={{backgroundColor:'orange'}}>Account Info</Button>
                    </div>
                </CardContent>
            </Card>
        );
       })}
      </div>
        </>
      
    );
      
  }
  
  export default ViewCustomers;