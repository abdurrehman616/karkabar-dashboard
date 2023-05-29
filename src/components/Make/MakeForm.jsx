import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useMutation} from "react-query";
import {API, MutationFn} from '../../layout/api.js'
import {MAKE_CREATE_MUTATION, MAKE_ONE_QUERY, MAKE_UPDATE_MUTATION} from "./queries.js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export const MakeForm = ({id}) => {
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate =useNavigate();
    const mutation = useMutation(MutationFn({
        query: id ? MAKE_UPDATE_MUTATION() : MAKE_CREATE_MUTATION()
    }));
    const formik = useFormik({
        initialValues: {
            make_name: '',
        },
        validationSchema: Yup.object({
            make_name: Yup.string()
                .max(30,        'Must be 30 characters or less')
                .required('Required Field'),
        }),
        onSubmit: (values, actions) => {
            mutation.mutate({
                id: id || null,
                input: {
                    make_name: values.make_name,
                }
            }, {
                onSuccess: ({data, errors}) => {
                    if(data) {
                        setError(null)

                        if(id) {
                            toast.success("Make updated successfully")
                            navigate('/makes')
                            return;
                        }

                        toast.success("Make added successfully")
                        navigate('/makes')

                        actions.resetForm({
                            values: {
                                // the type of `values` inferred to be Blog
                                make_name: '',
                            },
                        })
                    } else {
                        setMessage(null)
                        setError(errors.map((error)=> error.message))
                    }
                },
                onSettled: async () => {
                    setLoading(false)
                    console.log('Mutation Settled.');
                }
            });
        },
    });

    // Fetch Make for Update purpose
    const fetchMakeDetails = async (id) => {
        try {
            // Make an API call to fetch the existing Make details
            const {data} = await API.post('', {
                query: MAKE_ONE_QUERY(),
                variables: {
                    id
                },
            }).then((data)=>{
                return data.data
            }).catch(
                (r) => console.log(r)
            )

            // Set the fetched make details in the formik values
            await formik.setValues({
                make_name: data?.makeOne.make_name,
            });
        } catch (error) {
            console.log('Error fetching make details:', error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchMakeDetails(id);
        }
    }, [id]);

    return (
        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-5'>
            <div className='flex flex-col w-full gap-1'>
                <label htmlFor="make_name" className='font-semibold'>Make Name</label>
                <input
                    id="make_name"
                    name="make_name"
                    type="text"
                    className="input input-bordered rounded input-sm w-full focus:outline-none py-5"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.make_name}
                />
                {formik.touched.make_name && formik.errors.make_name ? (
                    <div className="flex w-full">
                        <i className="flex fa-solid fa-times-circle text-xs text-error items-center"/>
                        <span className='text-error text-xs pl-2'>{formik.errors.make_name}</span>
                    </div>
                ) : null}
            </div>

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