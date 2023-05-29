import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Shop } from './pages/Shop/Shop';
import { AddShop } from './pages/Shop/AddShop.jsx';
import { Loading } from './layout/utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateShop } from './pages/Shop/UpdateShop.jsx';
import { ProtectedRoute } from './layout/utils/ProtectedRoute.jsx';
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
import {ForgetPassword} from './pages/Auth/ForgetPassword.jsx'
import {ResetPassword} from "./pages/Auth/ResetPassword.jsx";
import {Make} from "./pages/Make/Make.jsx";
import {AddMake} from "./pages/Make/AddMake.jsx";
import {UpdateMake} from "./pages/Make/UpdateMake.jsx";
import {Model} from "./pages/Model/Model";
import {AddModel} from "./pages/Model/AddModel.jsx";
import {UpdateModel} from "./pages/Model/UpdateModel.jsx";
import {Category} from "./pages/Category/Category.jsx";
import {AddCategory} from "./pages/Category/AddCategory.jsx";
import {UpdateCategory} from "./pages/Category/UpdateCategory.jsx";

function App() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const isAuthenticated = useSelector((state) => state.auth.user != null && state.auth.accessToken);
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

            console.log(accessToken)
            if (accessToken != null ||accessToken !== undefined) {
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
            {!location.pathname.includes('/auth') && <AppHeader />}
            <div className='flex w-full max-w-full h-[calc(100vh-80px)]'>
                {!location.pathname.includes('/auth') && <SideBar />}
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

                    {/* MAKE */}
                    <Route
                        path="/makes"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Make />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/add-make"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <AddMake />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/update-make"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <UpdateMake />
                            </ProtectedRoute>
                        }
                    />

                    {/* MODEL */}
                    <Route
                        path="/models"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Model />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/add-model"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <AddModel />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/update-model"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <UpdateModel />
                            </ProtectedRoute>
                        }
                    />

                    {/* Category */}
                    <Route
                        path="/categories"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Category />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/add-category"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <AddCategory />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/update-category"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <UpdateCategory />
                            </ProtectedRoute>
                        }
                    />


                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                    <Route path="/auth/forgot-password" element={<ForgetPassword />} />
                    <Route path="/auth/reset-password" element={<ResetPassword />} />
                </Routes>
            </div>
        </>
    );
}

export default App;