import React from 'react';
import './HelloWorld.scss';

/**
 * Text React component
 */
// class HelloWorld extends Component {
  const Helloworld = (props) => {
    
    return ( <div className="test">{props.text}</div>);
  }
  
   
  export default Helloworld;
//   render() {
//     return <div>{this.props.text}</div>;
//   }
// }

// export default HelloWorld;