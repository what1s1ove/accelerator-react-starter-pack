import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {Guitar, GuitarsList} from '../types/guitar';
import {getURL} from '../const/const';

const BACKEND_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me/';

export const mainAPI = createApi({
  reducerPath: 'mainAPI',
  baseQuery: fetchBaseQuery({baseUrl: BACKEND_URL}),
  endpoints: (build) => ({
    fetchGuitarsList: build.query<GuitarsList,
      { limit: number; sort:string | undefined; order:string | undefined; type:string | undefined, stringCount:string | undefined; minPrice:string | undefined; maxPrice: string | undefined; } > ( {
        query: ({limit, sort, order, type, stringCount, minPrice, maxPrice}) => ({
          url: getURL(type, stringCount),
          params: {
            _limit: limit,
            _sort: sort,
            _order: order,
            stringCount: stringCount,
            'price_gte': minPrice,
            'price_lte': maxPrice,
          },
        }),
      }),
    fetchAlikeGuitars: build.query<GuitarsList, string> ( {
      query: (name?:string ) => ({
        url: name ? `/guitars?name_like=${name}` : '/guitars',
      }),
    }),
    fetchMinPrice: build.query<Guitar[], { type: string | undefined; stringCount: string | undefined; }> ( {
      query: ({type, stringCount}) => ({
        url: getURL(type, stringCount),
        params: {
          _limit: 1, _sort: 'price', _order: 'asc',
        },
      }),
    }),
    fetchMaxPrice: build.query<Guitar[], { type: string | undefined; stringCount: string | undefined; }> ( {
      query: ({type, stringCount}) => ({
        url: getURL(type, stringCount),
        params: {
          _limit: 1, _sort: 'price', _order: 'desc',
        },
      }),
    }),
  }),
});

export const {
  useFetchGuitarsListQuery,
  useFetchAlikeGuitarsQuery,
  useFetchMinPriceQuery,
  useFetchMaxPriceQuery,
} = mainAPI;
