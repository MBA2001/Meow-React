import logo from '../logo.svg';
import './main.css';
import React,{useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import NavBar from '../helpers/NavBar';
import axios from 'axios';
import '../index.css';

let HomePage = ()=> {
  const navigate = useNavigate()
  const [pageurl, changePageurl] = useState("");
  const [employee, setEmployee] = useState("");
  useEffect(() => {
    
    let getUser = async () => {
      let email = localStorage.getItem("email");
      console.log(email);
      try{

        let data = await axios.get('https://meow-bank-production.up.railway.app/getbyemail/'+email);
        setEmployee(data.data);
      }catch(err){
        console.log(err)
      }
    }
    if(localStorage.getItem("FBIdToken") == null || localStorage.getItem("FBIdToken").length < 20){
      navigate("/login");
    }else{
      getUser();
      if(localStorage.getItem("refresh") == "1"){
        localStorage.setItem("refresh","0");
        window.location.reload();
      }
    }
  },[]);


    
  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div style={{paddingTop:30, fontSize:30}} className='fade-in-text'>
        <h2>Welcome Back {employee.name}</h2>
      </div>
    </div>
  );
    
}

export default HomePage;