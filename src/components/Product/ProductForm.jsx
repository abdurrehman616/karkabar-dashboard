import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {MutationFn} from "../../layout/api.js";
import {PRODUCT_CREATE_MUTATION, PRODUCT_UPDATE_MUTATION} from "./queries.js"; // Replace with your API functions

export const ProductForm = ({ id }) => {
    const navigate = useNavigate();

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
            image: '',
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
                const { data } = await mutation.mutateAsync({
                    id,
                    input: {
                        name: values.name,
                        from: values.from,
                        to: values.to,
                        price: values.price,
                        chasis_number: values.chasis_number,
                        description: values.description,
                        sku: values.sku,
                        images:{
                            image_url: values.image
                        }
                    }
                });

                if (data) {
                    toast.success(`${id ? 'Product updated' : 'Product added'} successfully`);
                    navigate('/products');
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('An error occurred. Please try again.');
            }
        },
    });
    
    // Generate years
    //Determine the Current Year.
    let currentYear = (new Date()).getFullYear();
    let arrayOfYear = []
    
    //Loop and add the Year values to DropDownList.
    for (let i = 1950; i <= currentYear; i++) {
        arrayOfYear = [i, ...arrayOfYear]
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.image}
                />
                {formik.touched.image && formik.errors.image ? (
                    <div className='flex w-full'>
                        <i className='flex fa-solid fa-times-circle text-xs text-error items-center' />
                        <span className='text-error text-xs pl-2'>{formik.errors.image}</span>
                    </div>
                ) : null}
            </div>

            <div className='flex flex-col w-full gap-1'>
                <label htmlFor='category_id' className='font-semibold'>
                    Category
                </label>
                <select
                    id='category_id'
                    name='category_id'
                    className='input input-bordered rounded input-sm w-full focus:outline-none py-5'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.category_id}
                >
                    <option value='' disabled>Select category</option>
                    {/* Render options for categories */}
                </select>
                {formik.touched.category_id && formik.errors.category_id ? (
                    <div className='flex w-full'>
                        <i className='flex fa-solid fa-times-circle text-xs text-error items-center' />
                        <span className='text-error text-xs pl-2'>{formik.errors.category_id}</span>
                    </div>
                ) : null}
            </div>

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
