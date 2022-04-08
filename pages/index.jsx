import React, {useState, useEffect} from "react";
import {Appwrite} from "appwrite";

const Home = () => {

  // Init our Web SDK
  const sdk = new Appwrite();
  sdk
  .setEndpoint('http://localhost/v1') // our API Endpoint
  .setProject('625096a705e1ad5fd1ad') // our project ID
  ;

  //creating an anonymous Session
      
  const createAnonymousSession = async() => {
    try{
      await sdk.account.createAnonymousSession();
    }catch(err){
      console.log(err)
    }
      
  }
  useEffect(()=> {
    createAnonymousSession()
  }, [])

  // email state 

  const [emailAddress, setEmailAddress] = useState()

  // handle email submission

  const handleEmailAddress = async () => {
    try {
      await sdk.database.createDocument('6250973004902c6f0bff', 'unique()',{
        "emailAddress": emailAddress
      } )

      setEmailAddress('');
      alert("Email saved successfully!")
    } catch (error) {
      console.log(error)
      alert("error encountered")
      
    }

  }

  return(
    <div className="home">
      <div className="title-container">
        <h2>Orange Music</h2>
        <p>Input your email address to get updates when we launch!</p>
        <input 
        type="text" 
        value={emailAddress}
        onChange= {(e) => setEmailAddress(e.target.value)}
        />
        <button type="button" onClick={handleEmailAddress}>Add email address</button>
      </div>
    </div>
  )
}

export default Home;