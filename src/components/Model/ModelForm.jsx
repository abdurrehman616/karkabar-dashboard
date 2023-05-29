import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useMutation} from "react-query";
import {API, MutationFn} from '../../layout/api.js'
import {MODEL_CREATE_MUTATION, MODEL_ONE_QUERY, MODEL_UPDATE_MUTATION} from "./queries.js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export const ModelForm = ({id}) => {
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate =useNavigate();
    const mutation = useMutation(MutationFn({
        query: id ? MODEL_UPDATE_MUTATION() : MODEL_CREATE_MUTATION()
    }));
    const formik = useFormik({
        initialValues: {
            model_name: '',
        },
        validationSchema: Yup.object({
            model_name: Yup.string()
                .max(30,        'Must be 30 characters or less')
                .required('Required Field'),
        }),
        onSubmit: (values, actions) => {
            mutation.mutate({
                id: id || null,
                input: {
                    model_name: values.model_name,
                }
            }, {
                onSuccess: ({data, errors}) => {
                    if(data) {
                        setError(null)

                        if(id) {
                            toast.success("Model updated successfully")
                            navigate('/models')
                            return;
                        }

                        toast.success("Model added successfully")
                        navigate('/models')

                        actions.resetForm({
                            values: {
                                // the type of `values` inferred to be Blog
                                model_name: '',
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

    // Fetch Model for Update purpose
    const fetchModelDetails = async (id) => {
        try {
            // Model an API call to fetch the existing Model details
            const {data} = await API.post('', {
                query: MODEL_ONE_QUERY(),
                variables: {
                    id
                },
            }).then((data)=>{
                return data.data
            }).catch(
                (r) => console.log(r)
            )

            // Set the fetched model details in the formik values
            await formik.setValues({
                model_name: data?.modelOne.model_name,
            });
        } catch (error) {
            console.log('Error fetching model details:', error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchModelDetails(id);
        }
    }, [id]);

    return (
        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-5'>
            <div className='flex flex-col w-full gap-1'>
                <label htmlFor="model_name" className='font-semibold'>Model Name</label>
                <input
                    id="model_name"
                    name="model_name"
                    type="text"
                    className="input input-bordered rounded input-sm w-full focus:outline-none py-5"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.model_name}
                />
                {formik.touched.model_name && formik.errors.model_name ? (
                    <div className="flex w-full">
                        <i className="flex fa-solid fa-times-circle text-xs text-error items-center"/>
                        <span className='text-error text-xs pl-2'>{formik.errors.model_name}</span>
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