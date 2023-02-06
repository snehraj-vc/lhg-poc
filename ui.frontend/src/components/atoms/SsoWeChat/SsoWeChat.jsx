import WechatLogin from "react-wechat-login";

const SsoWeChat =()=>{


const loginWechatRes = (res) => {
  console.log(res);
}

<WechatLogin
  appid=""
  redirectUri="http://localhost:4000/api/wechatlogin"
  onSuccess={loginWechatRes}
/>
}
export default SsoWeChat;