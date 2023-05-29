import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {forgetPasswordAction} from "../../store/auth/authActions";
import {toast} from "react-toastify";
import {useState} from "react";

export const AuthForgetPasswordForm = () => {
    const dispatch = useDispatch()
    const [err, setErr] = useState(null)
    const loading = useSelector((state)=>state.auth.loading)
    const status = useSelector((state)=>state.auth.status)
    const error = useSelector((state)=>state.auth.error)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Required Field').email('Not a proper email'),
        }),
        onSubmit: (values,actions) => {
            setErr(null)
            dispatch(forgetPasswordAction(values.email)); // Perform any necessary logic with the form values
            if(status === "success") {
                toast.info(`Check your email! ${values.email}`)

                actions.resetForm({
                    values: {
                        // the type of `values` inferred to be Blog
                        email: '',
                    },
                })
            } else {
                setErr(error)
            }
        },
    });

    return (
        <div className="container flex items-center justify-center">
            <div className="card flex w-1/3 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Forget Password</h2>
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

                            {err ? (
                                <div className="flex gap-2 items-center bg-opacity-20 bg-error p-2 border rounded border-error">
                                    <i className="flex fa-solid fa-times-circle text-xs text-error items-center"/>
                                    <div className="text-error text-xs">{err}</div>
                                </div>
                            ): null}

                            <div className="flex justify-between">
                                <span>
                                  Back to login?
                                  <Link to="/auth/login" className="link">
                                    Login
                                  </Link>
                                </span>

                                <button type="submit"
                                        className={`flex w-1/5 btn btn-sm btn-primary text-base-100
                                            ${loading ? 'opacity-50 pointer-events-none' : ''}
                                        `}
                                        disabled={loading}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
