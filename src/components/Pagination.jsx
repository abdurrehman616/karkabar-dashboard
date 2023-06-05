import {Table} from "../layout/ui/Table/Table.jsx";
import {useState} from "react";

export const Pagination = ({
       data, page, hasMore, totalPages, isFetching,
       isPreviousData, setPage, refetch, updateRoute,
        deleteMutation, omitKeys
}) => {
    const [active, setActive] = useState(true)
    // it is for page numbers between next and previous button
    const getPages = () => {
        const elements = [];
        for (let i = 1; i <= totalPages; i++) {
            elements.push(
                <div
                    className={`${page === i ? "active" : ""} flex btn-group`}
                    onClick={() => setPage(i)}
                    key={i}
                >
                    <input
                        type="radio"
                        name="options"
                        // disabled={page === i}
                        data-title={i < 10 ? `0${i}` : i }
                        className="btn btn-xs btn-ghost border-accent"/>
                </div>
            );
        }
        return elements; // [<div>1</div>, <div>2</div>....]
    };

    return (
        <div className='container flex flex-col w-full overflow-y-auto'>
            <div>
                <Table data={data}
                       page={page}
                       refetch={refetch}
                       updateRoute={updateRoute}
                       deleteMutation={deleteMutation}
                       omitKeys={omitKeys}
                />
            </div>

            <div className='flex justify-end gap-2 w-full pt-3'>
                {/*<span className='text-xs flex text-left'>Current Page: {currentPage}</span>*/}
                <button
                    className='btn btn-xs btn-ghost'
                    onClick={() => setPage(old => Math.max(old - 1, 1))}
                    disabled={page === 1}
                >
                    <span>&lt;</span>
                </button>

                {getPages()}

                <button
                    className='btn btn-xs btn-ghost'
                    onClick={() => {
                        if (!isPreviousData && hasMore) {
                            setPage(old => old + 1)
                        }
                    }}
                    // Disable the Next Page button until we know a next page is available
                    disabled={isPreviousData || !hasMore}
                >
                    <span>&gt;</span>
                </button>
            </div>
            {isFetching ? <span> Loading...</span> : null}{' '}
        </div>
    )
}