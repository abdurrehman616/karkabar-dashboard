import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { MutationFn} from "../../layout/api.js";
import {PRODUCT_CREATE_MUTATION, PRODUCT_UPDATE_MUTATION} from "./queries.js";
import {Popup} from "../../layout/ui/Popup/Popup.jsx";
import {CATEGORY_MANY_QUERY, CATEGORY_ONE_QUERY} from "../Category/queries";
import {useState} from "react";
import {GetSingleDataQuery} from "../../layout/utils/GetSingleDataQuery.jsx";
import {useSelector} from "react-redux";

export const ProductForm = ({ id }) => {
    const [selectedId, setSelectedId] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [categoryName, setCategoryName] = useState('')
    const [image, setImage] = useState(null)
    
    const shop = useSelector((state)=> state?.auth.user?.shop)
    const navigate = useNavigate();
    
    
    const handleSelectCategory = (makeId) => {
        setSelectedId(makeId);
        setIsPopupOpen(false);
    };
    
    const mutation = useMutation(MutationFn({
        query: id ? PRODUCT_UPDATE_MUTATION() : PRODUCT_CREATE_MUTATION()
    }));
    
    const formik = useFormik({
        initialValues: {
            name: '',
            from: '',
            to: '',
            price: 0.0,
            chasis_number: '',
            description: '',
            sku: '',
            category_id: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required Field'),
            from: Yup.string().required('Required Field'),
            to: Yup.string().required('Required Field'),
            price: Yup.number().required('Required Field'),
            chasis_number: Yup.string().required('Required Field'),
            sku: Yup.string().required('Required Field'),
        }),
        onSubmit: async (values) => {
            try {
                if(image !== {}) {
                    const { data, errors } = await mutation.mutateAsync({
                        id,
                        
                        input: {
                            name: values.name,
                            from: values.from,
                            to: values.to,
                            price: values.price,
                            chasis_number: values.chasis_number,
                            description: values.description,
                            sku: values.sku,
                            category_id: selectedId,
                            shop_id: shop?.id,
                            image: image
                        },
                    });
    
                    if (data?.productCreate !== null) {
                        toast.success(`${id ? 'Product updated' : 'Product added'} successfully`);
                        navigate('/products');
                    }else {
                        toast.error(`${errors[0].message}`)
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('An error occurred. Please try again.');
            }
        },
    });
    
    console.log("image: ", image)
    // Generate years
    //Determine the Current Year.
    let currentYear = (new Date()).getFullYear();
    let arrayOfYear = []
    
    //Loop and add the Year values to DropDownList.
    for (let i = 1950; i <= currentYear; i++) {
        arrayOfYear = [i, ...arrayOfYear]
    }
    
    if(selectedId !== null){
        GetSingleDataQuery({
            query: CATEGORY_ONE_QUERY(),
            id: selectedId,
        })
            .then((response) => {
                setCategoryName(response.data?.categoryOne.category_name)
                // Continue with your logic here
            })
            .catch((error) => {
                console.log('Error fetching make details:', error);
            });
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className='flex flex-col w-full gap-1'>
                <label htmlFor='name' className='font-semibold'>
                    Name
                </label>
                <input
                    id='name'
                    name='name'
                    type='text'
                    className='input input-bordered rounded input-sm w-full focus:outline-none py-5'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                    <div className='flex w-full'>
                        <i className='flex fa-solid fa-times-circle text-xs text-error items-center' />
                        <span className='text-error text-xs pl-2'>{formik.errors.name}</span>
                    </div>
                ) : null}
            </div>

            <div className='flex flex-col w-full gap-1'>
                <label htmlFor='from' className='font-semibold'>
                    From
                </label>
                <select
                    id='from'
                    name='from'
                    className='input input-bordered rounded input-sm w-full focus:outline-none py-2 h-auto'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.from || ''}
                >
                    <option value='' disabled>Select year</option>
                    {arrayOfYear.map((year, i)=> (
                        <option key={i}
                                value={year.toString()}
                        >
                            {year}
                        </option>
                    ))}
                    {/* Render options for years */}
                </select>
                {formik.touched.from && formik.errors.from ? (
                    <div className='flex w-full'>
                        <i className='flex fa-solid fa-times-circle text-xs text-error items-center' />
                        <span className='text-error text-xs pl-2'>{formik.errors.from}</span>
                    </div>
                ) : null}
            </div>

            <div className='flex flex-col w-full gap-1'>
                <label htmlFor='to' className='font-semibold'>
                    To
                </label>
                <select
                    id='to'
                    name='to'
                    className='input input-bordered rounded input-sm w-full focus:outline-none py-2 h-auto'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.to}
                >
                    <option value='' disabled>Select year</option>
                    {arrayOfYear.map((year, i)=> (
                        <option key={i}
                                value={year.toString()}
                        >
                            {year}
                        </option>
                    ))}
                    {/* Render options for years */}
                </select>
                {formik.touched.to && formik.errors.to ? (
                    <div className='flex w-full'>
                        <i className='flex fa-solid fa-times-circle text-xs text-error items-center' />
                        <span className='text-error text-xs pl-2'>{formik.errors.to}</span>
                    </div>
                ) : null}
            </div>

            <div className='flex flex-col w-full gap-1'>
                <label htmlFor='price' className='font-semibold'>
                    Price
                </label>
                <input
                    id='price'
                    name='price'
                    type='number'
                    className='input input-bordered rounded input-sm w-full focus:outline-none py-5'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                />
                {formik.touched.price && formik.errors.price ? (
                    <div className='flex w-full'>
                        <i className='flex fa-solid fa-times-circle text-xs text-error items-center' />
                        <span className='text-error text-xs pl-2'>{formik.errors.price}</span>
                    </div>
                ) : null}
            </div>

            <div className='flex flex-col w-full gap-1'>
                <label htmlFor='chasis_number' className='font-semibold'>
                    Chasis Number
                </label>
                <input
                    id='chasis_number'
                    name='chasis_number'
                    type='text'
                    className='input input-bordered rounded input-sm w-full focus:outline-none py-5'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.chasis_number}
                />
                {formik.touched.chasis_number && formik.errors.chasis_number ? (
                    <div className='flex w-full'>
                        <i className='flex fa-solid fa-times-circle text-xs text-error items-center' />
                        <span className='text-error text-xs pl-2'>{formik.errors.chasis_number}</span>
                    </div>
                ) : null}
            </div>

            <div className='flex flex-col w-full gap-1'>
                <label htmlFor='description' className='font-semibold'>
                    Description
                </label>
                <textarea
                    id='description'
                    name='description'
                    className='input input-bordered rounded input-sm w-full focus:outline-none'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                />
                {formik.touched.description && formik.errors.description ? (
                    <div className='flex w-full'>
                        <i className='flex fa-solid fa-times-circle text-xs text-error items-center' />
                        <span className='text-error text-xs pl-2'>{formik.errors.description}</span>
                    </div>
                ) : null}
            </div>

            <div className='flex flex-col w-full gap-1'>
                <label htmlFor='sku' className='font-semibold'>
                    SKU
                </label>
                <input
                    id='sku'
                    name='sku'
                    type='text'
                    className='input input-bordered rounded input-sm w-full focus:outline-none py-5'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.sku}
                />
                {formik.touched.sku && formik.errors.sku ? (
                    <div className='flex w-full'>
                        <i className='flex fa-solid fa-times-circle text-xs text-error items-center' />
                        <span className='text-error text-xs pl-2'>{formik.errors.sku}</span>
                    </div>
                ) : null}
            </div>
    
            <div className='flex flex-col w-full gap-1'>
                <label htmlFor='image' className='font-semibold'>
                    Images
                </label>
                <input
                    id='image'
                    name='image'
                    type='file'
                    multiple
                    className='input input-bordered rounded input-sm w-full focus:outline-none h-auto'
                    onChange={(e) => setImage(e.target.files[0])}
                />
                {formik.touched.image && formik.errors.image ? (
                    <div className='flex w-full'>
                        <i className='flex fa-solid fa-times-circle text-xs text-error items-center' />
                        <span className='text-error text-xs pl-2'>{formik.errors.image}</span>
                    </div>
                ) : null}
            </div>
    
            <div className="flex flex-col w-full gap-1">
                <label htmlFor="make_id" className="font-semibold">
                    Category
                </label>
                <div className="relative">
                    <input
                        id="category_id"
                        name="category_id"
                        type="text"
                        className="input input-bordered rounded input-sm w-full focus:outline-none py-5"
                        readOnly
                        value={categoryName}
                    />
                    <button
                        type="button"
                        onClick={() => setIsPopupOpen(true)}
                        className="absolute top-0 right-0 px-3 py-2.5 bg-primary rounded-r text-white text-sm focus:outline-none"
                    >
                        Select Category
                    </button>
                </div>
            </div>
            {/* ... your existing code ... */}
            {isPopupOpen && (
                <Popup
                    onSelectItem={handleSelectCategory}
                    onClose={() => setIsPopupOpen(false)}
                    query={CATEGORY_MANY_QUERY()}
                    filteringProperty={"category_name"}
                    queryName={'categoryMany'}
                />
            )}
            
            
            
            {shop && (
                <div className="flex flex-col w-full bordered">
                    <span className="text-lg">{shop.shop_name}</span>
                    <span className="text-xs">{shop.shop_sku}</span>
                </div>
            )}
            

            <div className='flex justify-end'>
                <button
                    type='submit'
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
