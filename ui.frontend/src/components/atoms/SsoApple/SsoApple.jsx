import AppleSignin from "react-apple-signin-auth";

/** Apple Signin button */
const SsoApple = () => (
  <AppleSignin
    authOptions={{
      clientId: "com.nekoverse.nekoversebattle",
      scope: "email name",
      redirectURI: "https://17s61b.csb.app",
      state: "",
      nonce: "nonce",
      usePopup: true
    }}
    uiType="dark"
    onSuccess={(response) => console.log(response)} // default = undefined
    /** Called upon signin error */
    onError={(error) => console.error(error)} // default = undefined
  />
);

export default SsoApple;
