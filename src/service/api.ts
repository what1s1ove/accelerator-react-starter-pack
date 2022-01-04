import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {Guitar, GuitarsList} from '../types/guitar';

const BACKEND_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me/';

const getURL = (type:string | undefined, stringCount:string | undefined):string => {
  if (type && stringCount === undefined) {
    return `/guitars?type=${type}`;
  }
  else if (stringCount && type === undefined) {
    return `/guitars?stringCount=${stringCount}`;
  }
  else if (type && stringCount) {
    return `/guitars?type=${type}&stringCount=${stringCount}`;
  }
  else {
    return '/guitars';
  }
};

export const mainAPI = createApi({
  reducerPath: 'mainAPI',
  baseQuery: fetchBaseQuery({baseUrl: BACKEND_URL}),
  endpoints: (build) => ({
    fetchGuitarsList: build.query<GuitarsList,
      { limit: number; sort:string | undefined; order:string | undefined; type:string | undefined, stringCount:string | undefined; } > ( {
        query: ({limit, sort, order, type, stringCount}) => ({
          url: getURL(type, stringCount),
          params: {
            _limit: limit,
            _sort: sort,
            _order: order,
            stringCount: stringCount,
          },
        }),
      }),
    fetchAlikeGuitars: build.query<GuitarsList, string> ( {
      query: (name?:string ) => ({
        url: `/guitars?name_like=${name}`,
      }),
    }),
    fetchMinPrice: build.query<Guitar[], ''> ( {
      query: () => ({
        url: '/guitars',
        params: {
          _limit: 1, _sort: 'price', _order: 'asc',
        },
      }),
    }),
    fetchMaxPrice: build.query<Guitar[], ''> ( {
      query: () => ({
        url: '/guitars',
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
