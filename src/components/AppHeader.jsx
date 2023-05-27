import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {logoutAction} from "../store/auth/authActions.js"; // Import the logoutAction

export const AppHeader = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch(); // Get the dispatch function from the Redux store

    const handleLogout = () => {
        // Dispatch the logoutAction when the logout button is clicked
        dispatch(logoutAction());
    };

    return (
        <div className="container flex w-full justify-between items-center shadow-lg rounded-lg">
            <div className="flex w-full">
                <span className="font-bold text-2xl text-primary">AutoBots</span>
            </div>

            {user !== null ? (
                <div className="dropdown dropdown-hover dropdown-end">
                    <label tabIndex={0} className=" m-1">
                        <div>
                            <div className="avatar">
                                <div className="w-8 rounded-full">
                                    <img src={user?.photo} alt="User Avatar" />
                                </div>
                            </div>
                        </div>
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
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
