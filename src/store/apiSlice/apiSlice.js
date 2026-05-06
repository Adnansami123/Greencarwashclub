import {createApi} from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../services/apis/axiosBaseQuery';

export const apiSlice = createApi({
    reducerPath: `apiSlice`,
    baseQuery: axiosBaseQuery(),
    endpoints: () =>({}),
    tagTypes:["Configuration"]
});
