import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useMutation} from "react-query";
import {API, MutationFn} from '../../layout/api.js'
import {CATEGORY_CREATE_MUTATION, CATEGORY_ONE_QUERY, CATEGORY_UPDATE_MUTATION} from "./queries.js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export const CategoryForm = ({id}) => {
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate =useNavigate();
    const mutation = useMutation(MutationFn({
        query: id ? CATEGORY_UPDATE_MUTATION() : CATEGORY_CREATE_MUTATION()
    }));
    const formik = useFormik({
        initialValues: {
            category_name: '',
        },
        validationSchema: Yup.object({
            category_name: Yup.string()
                .max(30,        'Must be 30 characters or less')
                .required('Required Field'),
        }),
        onSubmit: (values, actions) => {
            mutation.mutate({
                id: id || null,
                input: {
                    category_name: values.category_name,
                }
            }, {
                onSuccess: ({data, errors}) => {
                    if(data) {
                        setError(null)

                        if(id) {
                            toast.success("Category updated successfully")
                            navigate('/categories')
                            return;
                        }

                        toast.success("Category added successfully")
                        navigate('/categories')

                        actions.resetForm({
                            values: {
                                // the type of `values` inferred to be Blog
                                category_name: '',
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

    // Fetch Category for Update purpose
    const fetchCategoryDetails = async (id) => {
        try {
            // Category an API call to fetch the existing Category details
            const {data} = await API.post('', {
                query: CATEGORY_ONE_QUERY(),
                variables: {
                    id
                },
            }).then((data)=>{
                return data.data
            }).catch(
                (r) => console.log(r)
            )

            // Set the fetched category details in the formik values
            await formik.setValues({
                category_name: data?.categoryOne.category_name,
            });
        } catch (error) {
            console.log('Error fetching category details:', error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchCategoryDetails(id);
        }
    }, [id]);

    return (
        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-5'>
            <div className='flex flex-col w-full gap-1'>
                <label htmlFor="category_name" className='font-semibold'>Category Name</label>
                <input
                    id="category_name"
                    name="category_name"
                    type="text"
                    className="input input-bordered rounded input-sm w-full focus:outline-none py-5"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.category_name}
                />
                {formik.touched.category_name && formik.errors.category_name ? (
                    <div className="flex w-full">
                        <i className="flex fa-solid fa-times-circle text-xs text-error items-center"/>
                        <span className='text-error text-xs pl-2'>{formik.errors.category_name}</span>
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