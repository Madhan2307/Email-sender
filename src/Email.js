import React, { useState } from 'react'
import './email.scss';

function Email() {


    const [body, setBody]= useState('')
    const [to, setTo]= useState('')
    const [subject, setSubject]= useState('')

    const handlesubmit = async (e)=>{
        e.preventDefault()

        const data={
            body:body,
            to:to,
            subject:subject
        }

        const request ={
            method:'POST',
            headers:{
                'content-type':'application/json'
            },

            body:JSON.stringify(data)   
        }

        try{
            const response = await fetch ('http://127.0.0.1:5000/send-mail',request);
            if (!response.ok){
                throw new Error ("failed to send email");
            }

            const result = await response.json();
            console.log("email sent succesfully",result);
            
        }
        catch(error){
            console.log("error sending email",error.message);
            
        }
        

    }



  return (
    <div>
        <div className='email-container'>
            <form onSubmit={handlesubmit}>
                <h1>send mail</h1>
                <label>enter the email : </label><input type='text' placeholder='to' value={to} onChange={(e)=> setTo (e.target.value)}></input><br/>
                <label>enetr the subject : </label><textarea type='text' placeholder='subject' value={subject} onChange={(e)=> setSubject(e.target.value)}></textarea><br/>
                <label>enetr the content : </label><textarea type='text' placeholder='body' value={body} onChange={(e)=> setBody (e.target.value)}></textarea><br/><br/>
                <button type='submit'>submit</button>
            </form>
        </div>
    </div>
    
  )
}

export default Email