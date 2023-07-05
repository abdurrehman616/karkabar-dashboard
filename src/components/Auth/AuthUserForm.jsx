import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useMutation} from "react-query";
import {API, MutationFn} from '../../layout/api.js'
import {USER_UPDATE_QUERY, USER_ONE_QUERY} from "./queries.js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export const AuthUserForm = ({id}) => {
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)
    console.log("AuthForm:", id)
    
    const navigate =useNavigate();
    const mutation = useMutation(MutationFn({
        query: id ? USER_UPDATE_QUERY() : null
    }));
    const formik = useFormik({
        initialValues: {
            name: '',
            username: '',
            photo: null,
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(30,        'Must be 15 characters or less')
                .required('Required Field'),
            username: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required Field'),
        }),
        onSubmit: (values, actions) => {
            mutation.mutate({
                id: id || null,
                input: {
                    name: values.name,
                    username: values.username,
                    photo: values.photo
                }
            }, {
                onSuccess: ({data, errors}) => {
                    if(data) {
                        setError(null)
                        
                        if(id) {
                            toast.success("User updated successfully")
                            navigate('/users')
                            return;
                        }
                        
                        actions.resetForm({
                            values: {
                                // the type of `values` inferred to be Blog
                                name: '',
                                username: '',
                                photo: null
                            },
                        })
                    } else {
                        setMessage(null)
                        setError(errors.map((error)=> error.message))
                    }
                },
                onSettled: async () => {
                    console.log('Mutation Settled.');
                }
            });
        },
    });
    
    // Fetch Shop for Update purpose
    const fetchUserDetails = async (id) => {
        try {
            // Make an API call to fetch the existing shop details
            const {data} = await API.post('', {
                query: USER_ONE_QUERY(),
                variables: {
                    id: id
                },
            }).then((data)=>{
                console.log("HERE",data)
                return data.data
            }).catch(
                (r) => console.log(r)
            )
            
            // Set the fetched shop details in the formik values
            await formik.setValues({
                name: data?.userOne.name,
                username: data?.userOne.username,
                photo: data?.userOne?.photo
            });
        } catch (error) {
            console.log('Error fetching user details:', error);
        }
    };
    
    useEffect(() => {
        if (id) {
            fetchUserDetails(id);
        }
    }, [id]);
    
    return (
        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-5'>
            <div className='flex flex-col w-full gap-1'>
                <label htmlFor="name" className='font-semibold'>Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    className="input input-bordered rounded input-sm w-full focus:outline-none py-5"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                    <div className="flex w-full">
                        <i className="flex fa-solid fa-times-circle text-xs text-error items-center"/>
                        <span className='text-error text-xs pl-2'>{formik.errors.name}</span>
                    </div>
                ) : null}
            </div>
            
            <div className='flex flex-col w-full gap-1'>
                <label htmlFor="username" className='font-semibold'>Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    className="input input-bordered rounded input-sm w-full focus:outline-none py-5"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? (
                    <div className="flex w-full">
                        <i className="flex fa-solid fa-times-circle text-xs text-error items-center"/>
                        <span className='text-error text-xs pl-2'>{formik.errors.username}</span>
                    </div>
                ) : null}
            </div>
            
            {message ? (
                <div className='bg-success border-black py-2 px-3 flex w-1/3 rounded bg-opacity-25 justify-between'>
                    <span className="text-xs">{message}</span>
                    <i className="fa-solid fa-check-circle text-success" />
                </div>
            ): null}
            
            {error ? (
                <div className="flex gap-2 items-center">
                    <i className="flex fa-solid fa-times-circle text-xs text-error items-center"/>
                    <div className="text-error text-xs">{error}</div>
                </div>
            ): null}
            
            <div className="flex justify-end">
                <button
                    type="submit"
                    className={`flex w-1/5 btn btn-sm btn-primary text-base-100
                            ${mutation.isLoading ? 'opacity-50 pointer-events-none' : ''}
                            `}
                    disabled={mutation.isLoading}
                >
                    {mutation.isLoading ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </form>
    );
};