import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useMutation} from "react-query";
import {API, MutationFn} from '../../layout/api.js'
import {SHOP_CREATE_MUTATION, SHOP_ONE_QUERY, SHOP_UPDATE_MUTATION} from "./queries.js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {Popup} from "../../layout/ui/Popup/Popup.jsx";
import {CATEGORY_MANY_QUERY, CATEGORY_ONE_QUERY} from "../Category/queries.js";
import {GetSingleDataQuery} from "../../layout/utils/GetSingleDataQuery.jsx";
import {USER_MANY_QUERY, USER_ONE_QUERY} from "../Auth/queries";

export const ShopForm = ({id}) => {
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [userName, setUserName] = useState('')
    const [selectedId, setSelectedId] = useState(null);
    const [shop, setShop] = useState(null)
    
    const handleSelectUser = (id) => {
        setSelectedId(id);
        setIsPopupOpen(false);
    };
    
    if(selectedId !== null){
        GetSingleDataQuery({
            query: USER_ONE_QUERY(),
            id: selectedId,
        })
            .then((response) => {
                console.log(response)
                setUserName(response.data?.userOne.name)
                // Continue with your logic here
            })
            .catch((error) => {
                console.log('Error fetching user details:', error);
            });
    }
    
    console.log(selectedId)

    const navigate =useNavigate();
    const mutation = useMutation(MutationFn({
        query: id ? SHOP_UPDATE_MUTATION() : SHOP_CREATE_MUTATION()
    }));
    const formik = useFormik({
        initialValues: {
            shop_name: '',
            shop_sku: '',
            user_id: null
        },
        validationSchema: Yup.object({
            shop_name: Yup.string()
                .max(15,        'Must be 15 characters or less')
                .required('Required Field'),
            shop_sku: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required Field'),
        }),
        onSubmit: (values, actions) => {
            mutation.mutate({
                id: id || null,
                input: {
                    shop_name: values.shop_name,
                    shop_sku: values.shop_sku,
                    user_id: selectedId
                }
            }, {
                onSuccess: ({data, errors}) => {
                    if(data) {
                        setError(null)

                        if(id) {
                            toast.success("Shop updated successfully")
                            navigate('/shops')
                            return;
                        }

                        toast.success("Shop added successfully")
                        navigate('/shops')

                        actions.resetForm({
                            values: {
                                // the type of `values` inferred to be Blog
                                shop_name: '',
                                shop_sku: '',
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
    const fetchShopDetails = async (id) => {
        try {
            // Make an API call to fetch the existing shop details
            const {data} = await API.post('', {
                query: SHOP_ONE_QUERY(),
                variables: {
                    id: id
                },
            }).then((data)=>{
                return data.data
            }).catch(
                (r) => console.log(r)
            )
            
            setShop(data?.shopOne)

            // Set the fetched shop details in the formik values
            await formik.setValues({
                shop_name: data?.shopOne.shop_name,
                shop_sku: data?.shopOne.shop_sku,
                user_id: data?.shopOne.user_id
            });
        } catch (error) {
            console.log('Error fetching shop details:', error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchShopDetails(id);
        }
    }, [id]);

    return (
        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-5'>
            <div className='flex flex-col w-full gap-1'>
                <label htmlFor="shop_name" className='font-semibold'>Shop Name</label>
                <input
                    id="shop_name"
                    name="shop_name"
                    type="text"
                    className="input input-bordered rounded input-sm w-full focus:outline-none py-5"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.shop_name}
                />
                {formik.touched.shop_name && formik.errors.shop_name ? (
                    <div className="flex w-full">
                        <i className="flex fa-solid fa-times-circle text-xs text-error items-center"/>
                        <span className='text-error text-xs pl-2'>{formik.errors.shop_name}</span>
                    </div>
                ) : null}
            </div>

            <div className='flex flex-col w-full gap-1'>
                <label htmlFor="shop_sku" className='font-semibold'>Shop SKU</label>
                <input
                    id="shop_sku"
                    name="shop_sku"
                    type="text"
                    className="input input-bordered rounded input-sm w-full focus:outline-none py-5"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.shop_sku}
                />
                {formik.touched.shop_sku && formik.errors.shop_sku ? (
                    <div className="flex w-full">
                        <i className="flex fa-solid fa-times-circle text-xs text-error items-center"/>
                        <span className='text-error text-xs pl-2'>{formik.errors.shop_sku}</span>
                    </div>
                ) : null}
            </div>

            {message ? (
                <div className='bg-success border-black py-2 px-3 flex w-1/3 rounded bg-opacity-25 justify-between'>
                    <span className="text-xs">{message}</span>
                    <i className="fa-solid fa-check-circle text-success" />
                </div>
            ): null}
    
            <div className="flex flex-col w-full gap-1">
                <label htmlFor="make_id" className="font-semibold">
                    User
                </label>
                <div className="relative">
                    <input
                        id="user_id"
                        name="user_id"
                        type="text"
                        className="input input-bordered rounded input-sm w-full focus:outline-none py-5"
                        readOnly
                        value={shop ? shop?.user?.name : userName}
                    />
                    <button
                        type="button"
                        onClick={() => setIsPopupOpen(true)}
                        className='absolute top-0 right-0 px-3 py-2.5 bg-primary rounded-r text-white text-sm focus:outline-none'
                    >
                        Select User
                    </button>
                </div>
            </div>
            {/* ... your existing code ... */}
            {isPopupOpen && (
                <Popup
                    onSelectItem={handleSelectUser}
                    onClose={() => setIsPopupOpen(false)}
                    query={USER_MANY_QUERY()}
                    filteringProperty={"name"}
                    queryName={'userMany'}
                />
            )}

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