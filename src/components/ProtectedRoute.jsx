import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"

export const ProtectedRoute = ({isAuthenticated, children}) => {
    let location = useLocation();

    if(!isAuthenticated) {
        return <Navigate to="/auth/login" state={{ from: location}} replace />
    }
    return children

};