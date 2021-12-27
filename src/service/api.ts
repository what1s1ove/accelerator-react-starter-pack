import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {GuitarsList} from '../types/guitar';

const BACKEND_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me/';

export const mainAPI = createApi({
  reducerPath: 'mainAPI',
  baseQuery: fetchBaseQuery({baseUrl: BACKEND_URL}),
  endpoints: (build) => ({
    fetchGuitarsList: build.query<GuitarsList, { limit: number; sort?: string; order?:string }> ( {
      query: ({
        limit = 9,
        sort = 'price',
        order = 'asc',
      }) => ({
        url: '/guitars',
        params: {
          _limit: limit,
          _sort: sort,
          _order: order,
        },
      }),
    }),
    fetchAlikeGuitars: build.query<GuitarsList, string> ( {
      query: (name:string) => ({
        url: '/guitars',
        params: {
          'name_like': name,
        },
      }),
    }),
  }),
});

export const {useFetchGuitarsListQuery, useFetchAlikeGuitarsQuery} = mainAPI;
