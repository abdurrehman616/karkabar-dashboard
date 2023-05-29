import { useEffect, useState } from 'react';
import { API } from "../../layout/api.js";
import {MODEL_MANY_QUERY, MODEL_DELETE_MUTATION} from "../../components/Model/queries.js";
import {useQuery} from "react-query";
import {Pagination} from '../../components/Pagination.jsx'
import {SearchBar, FilterSection, SortSection} from "../../layout/utils";
import { Link } from "react-router-dom";

export const Model = () => {
    const [page, setPage] = useState(1)
    const QRY_NAME = 'ModelMany';
    const fetchModels = async (page = 1) => {
        const {data} = await API.post('', {
            query: MODEL_MANY_QUERY(),
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
    } = useQuery(QRY_NAME, ()=>fetchModels(page), { keepPreviousData : true ,refetchOnWindowFocus: false })

    // Query Data
    const modelData = data?.modelMany.data
    const hasMore = data?.modelMany.pageInfo.hasMore;
    const totalPages = data?.modelMany.pageInfo.totalPage

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
                        <span className="text-3xl font-bold text-primary">List of Models</span>
                        <Link to="/add-model" className="flex gap-2 btn btn-primary btn-sm items-center">
                            <div>
                                <i className="fa-solid fa-plus"/>
                            </div>
                            <div className="text-white">Add New Model</div>
                        </Link>
                    </div>

                    <div className="container-sm flex w-full justify-between items-center">
                        <SearchBar/>
                        <div className="flex gap-3">
                            <FilterSection/>
                            <SortSection/>
                        </div>
                    </div>

                    <Pagination data={modelData}
                                error={error}
                                page={page}
                                hasMore={hasMore}
                                totalPages={totalPages}
                                isFetching={isFetching}
                                isPerviousData={isPreviousData}
                                setPage={setPage}
                                refetch={refetch}
                                updateRoute={'/update-model'}
                                deleteMutation={MODEL_DELETE_MUTATION()}
                    />
                </div>
            )}

        </>
    )
}