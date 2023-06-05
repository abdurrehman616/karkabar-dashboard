import { useEffect, useState } from 'react';
import { API } from "../../layout/api.js";
import {PRODUCT_DELETE_MUTATION, PRODUCT_MANY_QUERY} from "../../components/Product/queries.js";
import {useQuery} from "react-query";
import {Pagination} from '../../components/Pagination.jsx'
import {SearchBar, FilterSection, SortSection} from "../../layout/utils";
import { Link } from "react-router-dom";

export const Product = () => {
    const [page, setPage] = useState(1)
    const QRY_NAME = 'productMany';
    const fetchProducts = async (page = 1) => {
        const {data} = await API.post('', {
            query: PRODUCT_MANY_QUERY(),
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
    } = useQuery(QRY_NAME, ()=>fetchProducts(page), { keepPreviousData : true ,refetchOnWindowFocus: false })

    // Query Data
    const productData = data?.productMany.data
    console.log(productData)
    const hasMore = data?.productMany.pageInfo.hasMore;
    const totalPages = data?.productMany.pageInfo.totalPage

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
                        <span className="text-3xl font-bold text-primary">List of Products</span>
                        <Link to="/add-product" className="flex gap-2 btn btn-primary btn-sm items-center">
                            <div>
                                <i className="fa-solid fa-plus"/>
                            </div>
                            <div className="text-white">Add New Product</div>
                        </Link>
                    </div>

                    <div className="container-sm flex w-full justify-between items-center">
                        <SearchBar/>
                        <div className="flex gap-3">
                            <FilterSection/>
                            <SortSection/>
                        </div>
                    </div>

                    <Pagination data={productData}
                                error={error}
                                page={page}
                                hasMore={hasMore}
                                totalPages={totalPages}
                                isFetching={isFetching}
                                isPerviousData={isPreviousData}
                                setPage={setPage}
                                refetch={refetch}
                                updateRoute={'/update-product'}
                                deleteMutation={PRODUCT_DELETE_MUTATION()}
                                omitKeys={['category', 'category_id', 'shop', 'shop_id', 'status', 'id', 'description']}
                    />
                </div>
            )}

        </>
    )
}