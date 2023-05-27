import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {loginAction} from "../../store/auth/authActions";

export const AuthLoginForm = () => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Required Field').email('Not a proper email'),
            password: Yup.string().required('Required Field').min(8, 'Password is too short - should be 8 chars minimum.'),
        }),
        onSubmit: (values) => {
            dispatch(loginAction(values.email, values.password)); // Perform any necessary logic with the form values
        },
    });

    return (
        <div className="container flex items-center justify-center">
            <div className="card flex w-1/2 h-1/2 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Login</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col w-full gap-5">
                            <input
                                type="email"
                                className="input input-bordered rounded input-sm w-full focus:outline-none py-5"
                                placeholder="Email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="flex w-full">
                                    <i className="flex fa-solid fa-times-circle text-xs text-error items-center" />
                                    <span className="text-error text-xs pl-2">{formik.errors.email}</span>
                                </div>
                            ) : null}
                            <input
                                type="password"
                                className="input input-bordered rounded input-sm w-full focus:outline-none py-5"
                                placeholder="Password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="flex w-full">
                                    <i className="flex fa-solid fa-times-circle text-xs text-error items-center" />
                                    <span className="text-error text-xs pl-2">{formik.errors.password}</span>
                                </div>
                            ) : null}
                            <div className="flex justify-between">
                                <span>
                                  Create an account?
                                  <Link to="/auth/register" className="link">
                                    Register
                                  </Link>
                                </span>

                                <button type="submit" className="flex w-1/5 btn btn-sm btn-primary text-base-100">
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
