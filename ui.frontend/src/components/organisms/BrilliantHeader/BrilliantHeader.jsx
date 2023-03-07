import React from 'react';
import { Navbar } from '../../atoms';
import { useState } from 'react';
// import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import 'font-awesome/css/font-awesome.min.css';
import './BrilliantHeader.scss'

const BrilliantHeader = (props) => {
  const [hidedata,sethidedata]=useState(false)
  const { brilliantimage= "",
  menuItems = [],
    options = [],
    value = "",
    onChange = () => null,
    login=""
  } = props

 const showdata=()=>{
 if(hidedata === true){
  sethidedata(false)
 }
else{
  sethidedata(true)
}
 }
   console.log(sethidedata)
  return (<><div className="header">
               <div className='header-icon'>
               <i class="fa-sharp fa-regular fa-bars" onClick={showdata} ></i>
               </div>
               <div className='header-image'>
                  <img src={brilliantimage} />
               </div>
               <div className='header-login'><h3>{login}</h3></div>
              </div>
               <div className={hidedata ? "header-hamburger" : "header-hamburger-hide"}>
                 <Navbar menuItems={menuItems} options={options} value={value} onChange={onChange}/>
               </div>
  </>);
}


export default BrilliantHeader;