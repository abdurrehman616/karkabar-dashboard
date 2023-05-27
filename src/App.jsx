import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Shop } from './pages/Shop/Shop';
import { AddShop } from './pages/Shop/AddShop.jsx';
import { Loading } from './layout/utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateShop } from './pages/Shop/UpdateShop.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import { Login } from './pages/Auth/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from "./store/auth/authSlice.js";
import { AppHeader } from './components/AppHeader.jsx';
import { SideBar } from './components/SideBar.jsx';
import {API} from "./layout/api.js";
import {USER_ONE_QUERY} from "./components/Auth/queries.js";
import jwtDecode from 'jwt-decode';
import {Register} from "./pages/Auth/Register.jsx";

function App() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const isAuthenticated = useSelector((state) => state.auth.user != null);
    console.log(isAuthenticated)

    const preloader = document.getElementById('preloader');

    if (preloader) {
        setTimeout(() => {
            preloader.style.display = 'none';
            setLoading(false);
        }, 2000);
    }

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(() => setLoading(false), 1000);

            // Check if accessToken is present in localStorage
            const accessToken = localStorage.getItem('accessToken');

            if (accessToken) {
                // Decode the accessToken to get the user ID
                const decodedToken = jwtDecode(accessToken);
                const id = decodedToken.user;
                let user = null;

                // Use the `id` variable in your API call or other logic
                try {
                    const { data } = await API.post('', {
                        query: USER_ONE_QUERY(),
                        variables: {
                            userId: id
                        },
                    });
                    user = data.data?.userOne;
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }

                // Dispatch loginSuccess action with the stored accessToken
                dispatch(loginSuccess({ access_token: accessToken, user: user }));
            } else {
                // If accessToken is not present, navigate to the login page
                navigate('/auth/login');
            }
        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated]);

    return loading ? (
        <div className="flex w-full justify-center items-center">
            <Loading />
        </div>
    ) : (
        <>
            <ToastContainer />
            {(location.pathname !== '/auth/login' && location.pathname !== '/auth/register') && <AppHeader />}
            <div className='flex w-full max-w-full h-[calc(100vh-80px)]'>
                {(location.pathname !== '/auth/login' && location.pathname !== '/auth/register') && <SideBar />}
                <Routes>
                    {/* Protected routes */}
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* SHOPS */}
                    <Route
                        path="/shops"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Shop />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/add-shop"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <AddShop />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/update-shop"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <UpdateShop />
                            </ProtectedRoute>
                        }
                    />


                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                </Routes>
            </div>
        </>
    );
}

export default App;