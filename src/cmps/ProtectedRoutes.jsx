import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
function ProtectedRoutes({children}) {
    const navigate = useNavigate();
    const {isAuthenticated} = useSelector((state) => state.user);

    useEffect(() => {
        if(!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated]);

    return ( 
        <div>
            {children}
        </div>
     );
}

export default ProtectedRoutes;