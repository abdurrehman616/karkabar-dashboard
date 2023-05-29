import { useLocation } from "react-router-dom";
import { MakeForm } from "../../components/Make/MakeForm.jsx";

export const UpdateMake = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");

    return (
        <div className="container flex flex-col w-full">
            <div className="card card-bordered shadow-xl w-2/3">
                <div className="flex w-full justify-center">
                    <span className="card-title font-bold pt-5 text-3xl">Update Make</span>
                </div>
                <div className="card-body flex w-full">
                    <MakeForm id={id} />
                </div>
            </div>
        </div>
    );
};