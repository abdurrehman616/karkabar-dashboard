import { Link } from "react-router-dom";

export const SideBar = () => {
    return (
        <div className="flex w-1/6 bg-primary">
            <div className="container flex flex-col gap-6">
                <div className="flex items-center w-full">
                    <i className="fa-solid fa-house mr-4"></i>
                    <Link to="/" className="font-semibold text-base-100">Dashboard</Link>
                </div>

                <div className="flex items-baseline w-full">
                    <i className="fa-solid fa-shop mr-4"></i>
                    <Link to="/shops" className="text-base-100 font-semibold">Shop</Link>
                </div>

                <div className="flex items-baseline w-full">
                    <i className="fa-solid fa-wrench mr-4"></i>
                    <a href="/shop/shops" className="text-base-100 font-semibold">Make</a>
                </div>

                <div className="flex items-baseline w-full">
                    <i className="fa-solid fa-bag-shopping mr-4"></i>
                    <a href="/shop/shops" className="text-base-100 font-semibold">Category</a>
                </div>

                <div className="flex items-baseline w-full">
                    <i className="fa-solid fa-car mr-4"></i>
                    <a href="/shop/shops" className="text-base-100 font-semibold">Model</a>
                </div>

                <div className="flex items-baseline w-full">
                    <i className="fa-solid fa-cart-shopping mr-4"></i>
                    <a href="/shop/shops" className="text-base-100 font-semibold">Product</a>
                </div>
            </div>
        </div>
    )
}