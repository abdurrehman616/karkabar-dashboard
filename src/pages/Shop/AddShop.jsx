import {ShopForm} from "../../components/Shop/ShopForm";

export const AddShop= () =>{
    return (
        <div className='container flex flex-col w-full'>
            <div className="card card-bordered shadow-xl w-2/3">
                <div className='flex w-full justify-center'>
                    <span className="card-title font-bold pt-5 text-3xl">Add Shop</span>
                </div>
                <div className="card-body flex w-full">
                    <ShopForm id={null}/>
                </div>
            </div>
        </div>
    )
}