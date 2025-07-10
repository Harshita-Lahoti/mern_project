import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router"; // to switch onto another page
const Login=()=>{
    const navigate =useNavigate();// initialize useNavigate hook to use it to different pages
    const [email,setEmail] =useState('');
    const [password,setPassword] =useState('');
    const loginUser=(e)=>{
        e.preventDefault();
        // send a request to your server to log in the user
        const data={
            email:email,
            password:password
        };
        fetch('http://localhost:8000/user/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then(response=>{
            if(response.ok){
                return response.json();
            }else{
                alert('Login Failed');
            }
        }).then(data=>{
            if(data.message==='Invalid Credential'){
                alert('Invalid credential');
                return;
            }
            console.log('Login Successful:',data);
            localStorage.setItem('token',data.token);//store the
            localStorage.setItem('firstname',data.data);
            // navigate to the home page or dashboard
            navigate('/'); //Redirect to home page
        }).catch(error=>{
            console.log('Error:',error);
            alert('An error occured while logging in');
        });
    }
    return(
        <div className="container">
            <h1>Login</h1>
            <hr/>
            <form>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="enter your email"></input>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="enter your password"></input>
                </div>
                <button type="submit" onClick={loginUser} className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}
export default Login;