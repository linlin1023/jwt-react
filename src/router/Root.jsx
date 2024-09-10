import NavBar from "../cmps/NavBar";
import { Outlet } from 'react-router-dom';

function Root() {
    return ( 
        <>
        <NavBar />
        <Outlet />
        </>
     );
}

export default Root;