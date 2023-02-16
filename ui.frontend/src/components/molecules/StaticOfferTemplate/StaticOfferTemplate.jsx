const StaticOfferTemplate = (props) => {

  const {
        title="",
        description="",
        source="",

    } = props

    return (  <>
            <div>
                <h1>{props.title}</h1>
                <p>{props.description}</p>
                <img src={props.source}/>
            </div>
             </>);
}
 
export default StaticOfferTemplate;