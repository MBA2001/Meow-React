import React, { useEffect, useState } from "react";
import Logo from "../assets/logo3.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { Navigate } from "react-router-dom";
import {withRouter} from '../helpers/WithRouter';

class Login extends React.Component {

constructor(props){
  super(props);
  this.state = {
    showPassword: false,
    password: "",
    email: "",
    errorMessage: ""
  }
  this.handleLogin = this.handleLogin.bind(this);
}

  handleLogin = async (event) =>{
    event.preventDefault();
    try{
      let res = await axios.post('https://meow-bank-production.up.railway.app/login',{
        email: this.state.email,
        password: this.state.password
      })
      if(res.status === 200){
        localStorage.setItem("FBIdToken",res.data.token);
        localStorage.setItem("email",this.state.email);
        localStorage.setItem('refresh',"1");
        this.props.navigate('/');
      }
    }catch(err){
      if(err.response != undefined){
        if(err.response.data.general){
          this.setState({errorMessage: err.response.data.general})
        }
      }
      
      console.log(err.message)
    }
    
  }
  componentDidMount(){
    if(localStorage.getItem("refresh") == "1"){
      localStorage.setItem("refresh","0");
      window.location.reload();
    }
  }
  handleChange = (event) => {
    this.setState({
        [event.target.name]:event.target.value
    })
  }
  render(){
    return (
      <div className="login-main">
        <div className="login-right">
          <div className="login-right-container">
            <div className="login-logo">
              <img src={Logo} alt="" className="login-logo-img"/>
            </div>
            <div className="login-center">
              <h2>Meow Bank</h2>
              <form>
                <input type="email" placeholder="Email" name="email" onChange={this.handleChange} />
                <div className="pass-input-div">
                  <input type={this.state.showPassword ? "text" : "password"} onChange={this.handleChange} name="password" placeholder="Password" />
                  {this.state.showPassword ? <FaEyeSlash onClick={() => {this.setState({showPassword: !this.state.showPassword})}} /> : <FaEye onClick={() => {this.setState({showPassword: !this.state.showPassword})}} />}
                  
                </div>
  
                <div className="login-center-options">
                  {this.state.errorMessage != "" ? <h6 style={{color:"red",fontSize:17}}>{this.state.errorMessage}</h6>:""}
                  <a href="#" className="forgot-pass-link">
                    Forgot password?
                  </a>
                </div>
                <div className="login-center-buttons">
                  <button type="button" onClick={this.handleLogin}>Log In</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  }




export default withRouter(Login);
