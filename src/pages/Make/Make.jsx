import { useEffect, useState } from 'react';
import { API } from "../../layout/api.js";
import {MAKE_MANY_QUERY, MAKE_DELETE_MUTATION} from "../../components/Make/queries.js";
import {useQuery} from "react-query";
import {Pagination} from '../../components/Pagination.jsx'
import {SearchBar, FilterSection, SortSection} from "../../layout/utils";
import { Link } from "react-router-dom";

export const Make = () => {
    const [page, setPage] = useState(1)
    const QRY_NAME = 'MakeMany';
    const fetchMakes = async (page = 1) => {
        const {data} = await API.post('', {
            query: MAKE_MANY_QUERY(),
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
    } = useQuery(QRY_NAME, ()=>fetchMakes(page), { keepPreviousData : true ,refetchOnWindowFocus: false })

    // Query Data
    const makeData = data?.makeMany.data
    const hasMore = data?.makeMany.pageInfo.hasMore;
    const totalPages = data?.makeMany.pageInfo.totalPage

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
                        <span className="text-3xl font-bold text-primary">List of Makes</span>
                        <Link to="/add-make" className="flex gap-2 btn btn-primary btn-sm items-center">
                            <div>
                                <i className="fa-solid fa-plus"/>
                            </div>
                            <div className="text-white">Add New Make</div>
                        </Link>
                    </div>

                    <div className="container-sm flex w-full justify-between items-center">
                        <SearchBar/>
                        <div className="flex gap-3">
                            <FilterSection/>
                            <SortSection/>
                        </div>
                    </div>

                    <Pagination data={makeData}
                                error={error}
                                page={page}
                                hasMore={hasMore}
                                totalPages={totalPages}
                                isFetching={isFetching}
                                isPerviousData={isPreviousData}
                                setPage={setPage}
                                refetch={refetch}
                                updateRoute={'/update-make'}
                                deleteMutation={MAKE_DELETE_MUTATION()}
                    />
                </div>
            )}

        </>
    )
}