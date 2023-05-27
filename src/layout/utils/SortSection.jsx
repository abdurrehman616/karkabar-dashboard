export const SortSection = () =>{
    return (
        <div className="flex w-full">
            <select className="select select-bordered select-xs rounded focus:outline-1">
                <option value="" disabled selected>Sort By</option>
                <option value="Hello">Hello</option>
            </select>
        </div>
    )
}