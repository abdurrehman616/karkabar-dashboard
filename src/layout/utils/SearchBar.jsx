export const SearchBar = () => {
    return (
        <div className="relative flex w-1/3">
            <i className="fa-solid fa-search text-black absolute top-3.5 left-3.5"></i>
            <input type="text"
                   placeholder="Search Shops"
                   className="input input-bordered rounded input-sm w-full focus:outline-none py-5 pl-11"
            />
        </div>
    )
}