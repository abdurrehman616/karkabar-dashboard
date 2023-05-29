import {CategoryForm} from "../../components/Category/CategoryForm.jsx";

export const AddCategory= () =>{
    return (
        <div className='container flex flex-col w-full'>
            <div className="card card-bordered shadow-xl w-2/3">
                <div className='flex w-full justify-center'>
                    <span className="card-title font-bold pt-5 text-3xl">Add Category</span>
                </div>
                <div className="card-body flex w-full">
                    <CategoryForm id={null}/>
                </div>
            </div>
        </div>
    )
}