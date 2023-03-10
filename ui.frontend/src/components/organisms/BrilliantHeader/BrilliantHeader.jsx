import React from 'react';
import { Navbar } from '../../molecules';
import { useState, useEffect } from 'react';
import './BrilliantHeader.scss'

const BrilliantHeader = (props) => {
  const [hidedata, sethidedata] = useState(false);
  const [langs, setLangs] = useState([]);
  const {
    brilliantimage = "",
    menuItems = [],
    languages = "",
    value = "",
    login = "",
    loginurl = "",
    createaccountlink = "",
    createaccountlabel = ""
  } = props;

  const sanitizeLanguageVals = () => {
    let langArr = [...JSON.parse(languages)];
    for(let i = 0; i < langArr.length; i++) {
      langArr[i] = JSON.parse(langArr[i]);
      langArr[i] = {
        text: langArr[i].title,
        value: langArr[i].link
      }
    };
    setLangs(langArr);
  };

  useEffect(() => {
    sanitizeLanguageVals();
  }, []);

  const showdata = () => {
    if (hidedata === true) {
      sethidedata(false)
    }
    else {
      sethidedata(true)
    }
  };

  const onLanguageSelect = (val) => {
    window.location.href = val;
  };

  return (<><div className="header">
    <div className='header-icon' onClick={showdata}>
      {hidedata ? <div className='icon'>&#10006;</div> : <div className='icon'>&#9868;</div>}
    </div>
    <div className='header-image'>
      <img src={brilliantimage} />
    </div>
    <div className='header-login'><a href={loginurl}>{login}</a></div>
  </div>
    <div className={hidedata ? "header-hamburger" : "header-hamburger-hide"}>
      <Navbar
        menuItems={menuItems}
        languages={langs}
        value={value}
        onLanguageSelect={onLanguageSelect}
        createaccountlink={createaccountlink}
        createaccountlabel={createaccountlabel}
      />
      <div className='header-login-desktop'><a href={loginurl}>{login}</a></div>
    </div>
  </>);
}


export default BrilliantHeader;