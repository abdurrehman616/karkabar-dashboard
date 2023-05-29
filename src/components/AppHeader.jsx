import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {logoutAction} from "../store/auth/authActions.js";
import Dropdown from "../layout/ui/Dropdown/Dropdown.jsx"; // Import the logoutAction

export const AppHeader = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch(); // Get the dispatch function from the Redux store

    const handleLogout = () => {
        // Dispatch the logoutAction when the logout button is clicked
        dispatch(logoutAction());
    };

    const handleSelect = (option) => {
        console.log('Selected Option:', option);
    };


    return (
        <div className="container flex w-full justify-between items-center shadow-lg rounded-lg">
            <div className="flex w-full">
                <span className="font-bold text-2xl text-primary">AutoBots</span>
            </div>

            {user !== null ? (
                <div>
                    <Dropdown userImg={user.photo}>
                        <li onClick={() => handleLogout()}>Logout</li>
                    </Dropdown>
                </div>
            ) : (
                <div className="flex w-full justify-end">
                    <Link to="/auth/login">
                        <button className="btn btn-sm btn-primary text-white">Login</button>
                    </Link>
                </div>
            )}
        </div>
    );
};
