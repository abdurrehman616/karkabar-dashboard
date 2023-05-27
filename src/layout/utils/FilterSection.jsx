export const FilterSection = () =>{
    return (
        <div className="flex w-full">
            <select className="select select-bordered select-xs rounded focus:outline-1 items-center">
                <option value="" disabled selected>Filter By</option>
                <option value="Hello">Hello</option>
            </select>
        </div>
    )
}