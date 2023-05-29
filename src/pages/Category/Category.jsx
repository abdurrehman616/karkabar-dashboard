import { useEffect, useState } from 'react';
import { API } from "../../layout/api.js";
import {CATEGORY_MANY_QUERY, CATEGORY_DELETE_MUTATION} from "../../components/Category/queries.js";
import {useQuery} from "react-query";
import {Pagination} from '../../components/Pagination.jsx'
import {SearchBar, FilterSection, SortSection} from "../../layout/utils";
import { Link } from "react-router-dom";

export const Category = () => {
    const [page, setPage] = useState(1)
    const QRY_NAME = 'CategoryMany';
    const fetchCategorys = async (page = 1) => {
        const {data} = await API.post('', {
            query: CATEGORY_MANY_QUERY(),
            variables: {
                page: page
            },
        }).then((data)=>{
            return data.data
        }).catch(
            (r) => console.log(r)
        )

        return data
    }

    const {
        isLoading,
        isError,
        error,
        data,
        isFetching,
        isPreviousData,
        refetch
    } = useQuery(QRY_NAME, ()=>fetchCategorys(page), { keepPreviousData : true ,refetchOnWindowFocus: false })

    // Query Data
    const categoryData = data?.categoryMany.data
    const hasMore = data?.categoryMany.pageInfo.hasMore;
    const totalPages = data?.categoryMany.pageInfo.totalPage

    useEffect(() => {
        refetch();
    }, [page, refetch]);


    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>Error: {error.message}</div>
            ) : (

                <div className="flex flex-col w-full">
                    <div className="container-sm flex w-full justify-between items-center gap-3">
                        <span className="text-3xl font-bold text-primary">List of Categorys</span>
                        <Link to="/add-category" className="flex gap-2 btn btn-primary btn-sm items-center">
                            <div>
                                <i className="fa-solid fa-plus"/>
                            </div>
                            <div className="text-white">Add New Category</div>
                        </Link>
                    </div>

                    <div className="container-sm flex w-full justify-between items-center">
                        <SearchBar/>
                        <div className="flex gap-3">
                            <FilterSection/>
                            <SortSection/>
                        </div>
                    </div>

                    <Pagination data={categoryData}
                                error={error}
                                page={page}
                                hasMore={hasMore}
                                totalPages={totalPages}
                                isFetching={isFetching}
                                isPerviousData={isPreviousData}
                                setPage={setPage}
                                refetch={refetch}
                                updateRoute={'/update-category'}
                                deleteMutation={CATEGORY_DELETE_MUTATION()}
                    />
                </div>
            )}

        </>
    )
}