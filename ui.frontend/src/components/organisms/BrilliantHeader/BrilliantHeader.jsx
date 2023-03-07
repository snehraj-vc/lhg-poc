import React from 'react';
import { Navbar } from '../../atoms';
import './BrilliantHeader.scss'
import 'font-awesome/css/font-awesome.min.css';
import { useState } from 'react';

const BrilliantHeader = (props) => {
  const [hidedata,sethidedata]=useState(false)
  const { imageurl = "",
    data = [],
    options = [],
    value = "",
    onChange = () => null
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
               <div className='header-icon' >
                 <i class="fa-solid fa-bars" onClick={showdata}></i>
               </div>
               <div className='header-image'>
                  <img src={imageurl} />
               </div>
               <div className='header-login'>Login</div>
              </div>
               <div className={hidedata ? "header-hamburger" : "header-hamburger-hide"}>
                 <Navbar data={data} options={options} value={value} onChange={onChange} />
               </div>
  </>);
}


export default BrilliantHeader;