import { API } from "../api.js";

export const GetSingleDataQuery = async ({ query, id }) => {
    try {
        // API call to fetch the existing details
        const response = await API.post('', {
            query: query,
            variables: {
                id
            },
        });
        
        return response.data;
    } catch (error) {
        console.log('Error fetching model details:', error);
        return null;
    }
};