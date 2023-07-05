import axios from 'axios'
import Lodash from 'lodash'

const DEFAULT_PAGE_SIZE = 10

export const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    }
})

const QueryFn = (payload) => {
    return async () => {
        const {data} = await API.post('', {
            query: payload.query,
            variables: payload.variables,
        }).catch(
            (r) => console.log(r)
        )

        // console.log('Fetched Data: ', data.data)
        return data.data
    }
}

const PaginatedQueryFn = (payload) => {
    return async ({pageParam = null}) => {
        console.log("pageParams: ", pageParam)
        const {data} = await API.post('', {
            query: payload.query,
            variables: {
                ...payload.variables,
                page: pageParam
            }
        }).catch(
            (r) => console.log(r)
        )

        return data.data
    }
}

const PaginatedQueryGetNextPageCursor = (queryName, dataGroup) => {
    let hasMore = false
    if (dataGroup[queryName].length === 0) {
        hasMore = false;
        return;
    }

    hasMore = dataGroup[queryName].pageInfo.hasMore;
    if (!hasMore) return

    const page = dataGroup[queryName].next?.page;

    return page;
}

const PaginatedQueryMergePages = (queryResult, queryName) => {
    if (queryResult.isSuccess && !queryResult.isFetching) {
        let mergedEdges = [];

        queryResult.data.pages.map(
            (page) => {
                mergedEdges = [...mergedEdges, ...page[queryName].data];
            }
        );
        return Lodash.flatMap(mergedEdges, (data) => data);
    }
}

const FlattenEdges = (edges) => Lodash.flatMap(edges, (edge) => edge.node);

const MutationFn = (payload) => {
    
    return async (obj) => {
        console.log(obj.image)
        const {data} = await API.post('', {
            query: payload.query,
            variables: {
                ...payload.variables,
                ...obj
            }
        }).catch(
            (error) => console.log(error)
        )

        console.log(data)
        return data
    }
}

const FormDataMutationFn = (payload) => {
    return async (obj) => {
        console.log(obj.image);
        
        const formData = new FormData();
        formData.append('image', obj.image);
        
        // Check if payload has variables field
        if (payload.variables) {
            // Append variables to the FormData object
            Object.entries(payload.variables).forEach(([key, value]) => {
                formData.append(key, value);
            });
        }
        
        const { data } = await API.post('', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                query: payload.query,
            },
        }).catch((error) => console.log(error));
        
        console.log(data);
        return data;
    };
};

export {
    DEFAULT_PAGE_SIZE,
    QueryFn,
    PaginatedQueryFn,
    PaginatedQueryGetNextPageCursor,
    PaginatedQueryMergePages,
    MutationFn,
    FlattenEdges,
    FormDataMutationFn
}