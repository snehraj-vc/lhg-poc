import React from 'react';
import { Navbar } from '../../molecules';
import { useState } from 'react';
import './BrilliantHeader.scss'

const BrilliantHeader = (props) => {
  const [hidedata, sethidedata] = useState(false)
  const { 
    brilliantimage = "",
    menuItems = [],
    languages = [],
    value = "",
    onChange = () => null,
    login = "",
    loginurl ="",
    createaccountlink="",
    createaccountlabel=""
  } = props

  const showdata = () => {
    if (hidedata === true) {
      sethidedata(false)
    }
    else {
      sethidedata(true)
    }
  }
  return (<><div className="header">
    <div className='header-icon' onClick={showdata}>
      {hidedata ? <div className='icon'>&#10006;</div> : <div  className='icon'>&#9868;</div>}
    </div>
    <div className='header-image'>
      <img src={brilliantimage} />
    </div>
    <div className='header-login'><a href={loginurl}>{login}</a></div>
  </div>
    <div className={hidedata ? "header-hamburger" : "header-hamburger-hide"}>
      <Navbar menuItems={menuItems} options={languages} value={value} onChange={onChange} createaccountlink={createaccountlink} createaccountlabel={createaccountlabel}/>
      <div className='header-login-desktop'><a href={loginurl}>{login}</a></div>
    </div>
  </>);
}


export default BrilliantHeader;