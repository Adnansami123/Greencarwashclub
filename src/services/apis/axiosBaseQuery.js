import { apiClient } from './apiClient';

export const axiosBaseQuery = () => async ({ url, method, data, body, query }) => {
    try {
      
        const getURL = url;
        //  console.log("axiosBaseQuery" , body);
        const response = await apiClient({ url, method, data, body, query});
    return { data: response };

} catch (axiosError) {
    const err = axiosError;
    return { data: err.response?.data };
}
};