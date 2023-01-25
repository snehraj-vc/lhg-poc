import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./location.css"


function Location() {
  const [currLocation, setCurrLocation] = useState({});
  const [greet,setgreet]=useState('')
  const [inputdata,setinputdata]=useState('')
  const [validation,setvalidation]=useState(true)
 

  useEffect(() => {
    getLocation();
    time()
  }, []);

  const getLocation = async () => {
    try{
         const location = await axios.get("https://ipapi.co/json");
           setCurrLocation(location.data);
              console.log(location.data)
       }
    catch(error){
      console.error("the server is down")
    }
  };
  const set_storage=()=>{
                localStorage.setItem('City_name',currLocation.city );
                localStorage.setItem('State_name', currLocation.region);
                localStorage.setItem('Postal_code', currLocation.postal);
                localStorage.setItem('Country_name', currLocation.country_name);
                localStorage.setItem('Country_calling_code', currLocation.country_calling_code);
                console.log("hi comp")
  }

    //direct data from api while enter into the page 
    set_storage();

  const remove_storage=()=>{
        localStorage.removeItem('City_name');
        localStorage.removeItem('State_name');
        localStorage.removeItem('Postal_code');
        localStorage.removeItem('Country_name');
        localStorage.removeItem('Country_calling_code');
}
const nameInputChangeHandler=(event)=>{
setinputdata(event.target.value)
}
 
    //form submission handling function
     const form_submit=(event)=>{
         event.preventDefault();
           setgreet('Thank You,Your Form Sumbmited')
             console.log(greet)
             console.log(`${inputdata}input data`)
                       //data from after sumbisson
                       set_storage()
                       //clearing the data after the 5-min
                       time()
        }
 const remove = (event) => {
     event.preventDefault();
     remove_storage();

    };


 //time out function(ather 5-mint the data get wanished )
 //timing calculation 1sec=1000ms 1min=60,000 
      const time=()=>{

               const timer = setTimeout(() => {
               console.log('This comp from time out')
               remove_storage();
                }, 10000);
      return () => clearTimeout(timer);
 }
const valid_form= validation ? 'first_name' : 'invalid invalid'
  return (
    <div>
      <h1>Location Integration form</h1>
      <form onSubmit={form_submit} >
              <div id={valid_form}>
                        <label>FIRST NAME</label><br/><br/>
                        <input placeholder='First Name' type="text" name="firstname" onChange={nameInputChangeHandler}/><br/><br/>
                        </div>
                        <label>LAST NAME</label><br/><br/>
                        <input  placeholder='Last Name'type="text"></input><br/><br/>
                
                        <label>CITY</label><br/><br/>
                        <input type="text" value={localStorage.getItem('City_name',currLocation.city )}></input><br/><br/>
               
                        <label>STATE</label><br/><br/>
                        <input type="text" value={currLocation.region}></input><br/><br/>
               
                        <label>ZIP CODE</label><br/><br/>
                        <input value={currLocation.postal}type="number"></input><br/><br/>
               
                        <label>COUNTRY</label><br/><br/>
                        <input value={currLocation.country_name}></input><br/><br/>
              
                        <label>COUNTRY CODE</label><br/><br/>
                        <input type="text"value={currLocation.country_calling_code}></input><br/><br/>
             
                        <label>PHONE NUMBER</label><br/><br/>
                        <input placeholder="Enter phone Number"type="number"></input><br/><br/>
            
                      <button onClick={remove}>CANCEl</button><br/><br/>
                      <button type="submit">REGISTER</button>
                
            </form>
   <h3>{greet}</h3>
    </div>
  );
}

export default Location;