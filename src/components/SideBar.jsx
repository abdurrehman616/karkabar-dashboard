import { Link } from "react-router-dom";

export const SideBar = () => {
    return (
        <div className="flex w-1/6 bg-primary">
            <div className="container flex flex-col gap-6">
                <div className="flex items-center w-full">
                    <i className="fa-solid fa-house mr-4"></i>
                    <Link to="/" className="font-semibold text-base-100">Dashboard</Link>
                </div>
    
                <div className="flex items-center w-full">
                    <i className="fa-solid fa-users mr-4"></i>
                    <Link to="/users" className="font-semibold text-base-100">User</Link>
                </div>

                <div className="flex items-baseline w-full">
                    <i className="fa-solid fa-shop mr-4"></i>
                    <Link to="/shops" className="text-base-100 font-semibold">Shops</Link>
                </div>

                <div className="flex items-baseline w-full">
                    <i className="fa-solid fa-store mr-4"></i>
                    <Link to="/my-shop" className="text-base-100 font-semibold">My Shop</Link>
                </div>

                <div className="flex items-baseline w-full">
                    <i className="fa-solid fa-wrench mr-4"></i>
                    <Link to="/makes" className="text-base-100 font-semibold">Make</Link>
                </div>

                <div className="flex items-baseline w-full">
                    <i className="fa-solid fa-bag-shopping mr-4"></i>
                    <Link to="/categories" className="text-base-100 font-semibold">Category</Link>
                </div>

                <div className="flex items-baseline w-full">
                    <i className="fa-solid fa-car mr-4"></i>
                    <Link to="/models" className="text-base-100 font-semibold">Model</Link>
                </div>

                <div className="flex items-baseline w-full">
                    <i className="fa-solid fa-cart-shopping mr-4"></i>
                    <Link to="/products" className="text-base-100 font-semibold">Product</Link>
                </div>
    
                <div className="flex items-baseline w-full">
                    <i className="fa-solid fa-box mr-4"></i>
                    <Link to="/orders" className="text-base-100 font-semibold">Orders</Link>
                </div>
            </div>
        </div>
    )
}