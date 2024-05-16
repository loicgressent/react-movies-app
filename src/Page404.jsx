import { Link } from "react-router-dom";

const Page404 = () =>{
    return(
        <>
            <h1>404 : Not found</h1>
            <Link to='/'><h2>Home</h2></Link>
        </>
    )
}

export default Page404