import { useFormik } from 'formik';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../store/auth/authActions';
import { toast } from 'react-toastify';
import { useState } from 'react';

export const AuthResetPasswordForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // getting reset token
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const [err, setErr] = useState(null);
    const loading = useSelector((state) => state.auth.status === 'loading');

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            password: Yup.string().required('Required Field').min(8, 'Password is too short - should be 8 chars minimum.'),
            confirmPassword: Yup.string()
                .required('Required Field')
                .min(8, 'Password is too short - should be 8 chars minimum.')
                .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        }),
        onSubmit: (values) => {
            setErr(null);
            dispatch(resetPassword({
                resetToken: token, newPassword: values.password, confirmPassword: values.confirmPassword
            }))
                .then(() => {
                    toast.success('Password Reset Successful');
                    navigate('/auth/login');
                })
                .catch((error) => {
                    setErr(error.message);
                });
        },
    });

    return (
        <div className="container flex items-center justify-center">
            <div className="card flex w-1/3 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Reset Password</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col w-full gap-5">
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

                            <input
                                type="password"
                                className="input input-bordered rounded input-sm w-full focus:outline-none py-5"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                <div className="flex w-full">
                                    <i className="flex fa-solid fa-times-circle text-xs text-error items-center" />
                                    <span className="text-error text-xs pl-2">{formik.errors.confirmPassword}</span>
                                </div>
                            ) : null}

                            {err ? (
                                <div className="flex gap-2 items-center bg-opacity-20 bg-error p-2 border rounded border-error">
                                    <i className="flex fa-solid fa-times-circle text-xs text-error items-center" />
                                    <div className="text-error text-xs">{err}</div>
                                </div>
                            ) : null}

                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className={`flex w-1/5 btn btn-sm btn-primary text-base-100 ${
                                        loading ? 'opacity-50 pointer-events-none' : ''
                                    }`}
                                    disabled={loading}
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};