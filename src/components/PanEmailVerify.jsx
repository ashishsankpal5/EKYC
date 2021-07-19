import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import $ from "jquery"
import axios from 'axios';
import panVerify from "./index"
import { Alert } from 'bootstrap';
// import "./verifyContact.css"

function PanEmailVerify() {
    const [email, setEmail] = useState('');
    const [pan, setPan] = useState('');
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [otp, setOtp] = useState('');
    const [panres, setPenRes] = useState('');
    const [bank, setbank] = useState("")
    const [ifsc, setifsc] = useState('')
 const [submitB, setSubmitB] = useState('Verify PAN')
   useEffect(() => {
    // loadDataOnlyOnce();
       $(".div-otp").hide()
       $(".btn-submit").hide()
       $(".div_bank").hide()
       $(".btn-bank").hide()
       setEmail('')
       setOtp('')
     
   },[])

const getVerify =async (e)=>{
    e.preventDefault()
    const book = {
        pan_no : pan,
        full_name : name,
        date_of_birth : dob
      };

     await axios
        .post('http://localhost:3001/create', book)
         .then(data=>{console.log(data) 
        data.data.message ? $('.div_bank').hide() : $('.div_bank').show() && $('.btn-otp').hide() && $('.btn-bank').show()
        }
         
         )
        .catch(err => {
          console.error(err);
        });
}
const bankVerify = async (e)=>{
    e.preventDefault()
    const bankdetails = {
        beneficiary_account_no : bank,
        beneficiary_ifsc : ifsc,
      };

     await axios
        .post('http://localhost:3001/bank', bankdetails)
        .then(data => {
            console.log(data)
            data.data.message ? alert("failed") : (window.location.href="/EmailTemplate")
        } )
        .catch(err => {
          console.error(err);
        });

            // window.location.href="/EmailTemplate"
          
}


    const getSubmit =(e)=>{
        e.preventDefault()
        if(email!=="" && otp!==""){
            window.location.href="/verifyPin"
            // return
        }
    }
  


    return (
        <>
      <div className="auth-wrapper">
        <div className="auth-inner">
            <form>
                <h3>Verify Pan</h3>
             
                <div className="form-group">
                    {/* <label>Enter Contact</label> */}
                    <TextField type="text" value={pan} onChange={(e)=>setPan(e.target.value)} className="form-control"  label="Enter PAN NO" />
                    {/* <input type="text" value={contact} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Enter Contact" /> */}
                </div>
                <div className="form-group">
                    {/* <label>Enter Contact</label> */}
                    <TextField type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control"  label="Enter NAME" />
                    {/* <input type="text" value={contact} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Enter Contact" /> */}
                </div>
                <div className="form-group">
                    {/* <label>Enter Contact</label> */}
                    <TextField type="text" value={dob} onChange={(e)=>setDob(e.target.value)} className="form-control"  label="Enter DOB" />
                    {/* <input type="text" value={contact} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Enter Contact" /> */}
                </div>

             <div className="div_bank">
             <div className="form-group">
                    {/* <label>Enter Contact</label> */}
                    <TextField type="text" value={bank} onChange={(e)=>setbank(e.target.value)} className="form-control"  label="BANK ACCOUNT NO." />
                    {/* <input type="text" value={contact} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Enter Contact" /> */}
                </div>
                <div className="form-group">
                    {/* <label>Enter Contact</label> */}
                    <TextField type="text" value={ifsc} onChange={(e)=>setifsc(e.target.value)} className="form-control"  label="BANK IFSC" />
                    {/* <input type="text" value={contact} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Enter Contact" /> */}
                </div>
             </div>

              
<div className="btn-class-submit">
                <button type="submit" onClick={getVerify} className="btn btn-primary btn-block btn-otp">{submitB}</button>
                <button type="submit" onClick={bankVerify} className="btn btn-primary btn-block btn-bank">BANK VERIFYs</button>
                {/* <button type="submit" onClick={getSubmit} className="btn btn-primary btn-block btn-submit">Submit</button> */}
                {/* <a href="https://services.digitallocker.gov.in/savelocker/api/1/savelocker.js" type="submit" className="btn btn-primary btn-block">Connect to Digilocker</a> */}
                {/* <button type="submit" onClick={fetchData} className="btn btn-primary btn-block">Fetch API</button> */}
                </div>
                <p className="forgot-password text-right">
                    Email <Link to="/EmailTemplate">verify?</Link>
                </p>
            </form>

        </div>
        </div>
        </>
    )
}
export default PanEmailVerify