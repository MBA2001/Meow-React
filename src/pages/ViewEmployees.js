import { TextField, Button, Card, CardHeader, CardContent, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import '../index.css';
import { useNavigate } from "react-router-dom";

let ViewEmployees = ()=> {
    let navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [displayed, setDisplayed] = useState([]);
    const [searchValue, SetSearchValue] = useState("");


    let handleSearchChange = (event) => {
        SetSearchValue(event.target.value);
        if(event.target.value == ''){
            setDisplayed(employees);
            return;
        }
        const regex = new RegExp(searchValue)
        let newDisplayed = [];
        employees.forEach(item => {
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
        let getEmployees =async () => {
            try{
                let res = await axios.get('https://meow-bank-production.up.railway.app/getall');
                setEmployees(res.data);
                setDisplayed(res.data);
            }catch(err){
                console.log(err);
            }
        }
        getEmployees();
    },[]);

    let handleButton = async (event) => {
        await axios.delete('https://meow-bank-production.up.railway.app/delete/'+displayed[event.target.id].name);
        let remaining = [];
        displayed.forEach((account,i) => {
            if(i != event.target.id){
                remaining.push(account);
            }
        })
        setDisplayed(remaining);
    }
    return (
        <>
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', textAlign:"center",padding:20}}>
            <Typography variant="h2" style={{paddingTop:40}}>
                All Employees
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
        
       {displayed.map((employee,i) => {
        return (
            <Card style={{width:'40%', margin:30,padding:'0 auto', animation:'fadeIn '+(i+2)+'s'}}>
                <CardHeader title={employee.name}/>
                <CardContent>
                    <div style={{float:'left'}}>
                        <Typography>Email: {employee.email}</Typography>
                        <Typography>Job Title: {employee.jobTitle}</Typography>
                        <Typography>Age: {employee.age}</Typography>
                    </div>
                    <div style={{float:'right', margin:20}}>
                        <Button variant="contained" id={i} onClick={handleButton} style={{backgroundColor:'red'}}>Delete</Button>
                    </div>
                </CardContent>
            </Card>
        );
       })}
      </div>
        </>
      
    );
      
  }
  
  export default ViewEmployees;