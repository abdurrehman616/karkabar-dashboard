import { useLocation } from "react-router-dom";
import { AuthUserForm } from "../../components/Auth/AuthUserForm.jsx";

export const UpdateUser = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    console.log(id)
    
    return (
        <div className="container flex flex-col w-full">
            <div className="card card-bordered shadow-xl w-2/3">
                <div className="flex w-full justify-center">
                    <span className="card-title font-bold pt-5 text-3xl">Update User</span>
                </div>
                <div className="card-body flex w-full">
                    <AuthUserForm id={id} />
                </div>
            </div>
        </div>
    );
};