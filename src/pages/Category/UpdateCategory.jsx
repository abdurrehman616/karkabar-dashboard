import { useLocation } from "react-router-dom";
import { CategoryForm } from "../../components/Category/CategoryForm.jsx";

export const UpdateCategory = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");

    return (
        <div className="container flex flex-col w-full">
            <div className="card card-bordered shadow-xl w-2/3">
                <div className="flex w-full justify-center">
                    <span className="card-title font-bold pt-5 text-3xl">Update Category</span>
                </div>
                <div className="card-body flex w-full">
                    <CategoryForm id={id} />
                </div>
            </div>
        </div>
    );
};