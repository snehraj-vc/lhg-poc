const BrillantFooter = (props) => {
    const {
        headerimage = "",
        arrayimage = []
    } = props
    return (<div>
        <div><img src={headerimage} alt="" /></div>

        {arrayimage.map((res) => {
            return (<img src={res.url}></img>)
        })
        }
    </div>
    );
}

export default BrillantFooter;