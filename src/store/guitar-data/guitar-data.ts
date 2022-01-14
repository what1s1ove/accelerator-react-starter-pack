import { createReducer } from '@reduxjs/toolkit';
import { FetchStatus } from '../../const';
import { CommentType } from '../../types/comment';
import { GuitarType } from '../../types/guitar';
import { loadComments, loadGuitars, loadGuitarsCount, setCatalogFetchStatusAction } from '../action';

type CatalogType = {
  catalog: GuitarType[],
  isDataLoaded: boolean,
  guitarsCount: number,
  comments: CommentType[],
  catalogFetchStatus: FetchStatus;
}

const initialState: CatalogType = {
  catalog: [
    {
      id: 0,
      name: '',
      vendorCode: '',
      type: '',
      description: '',
      previewImg: '',
      stringCount: 0,
      rating: 0,
      price: 0,
    },
  ],
  isDataLoaded: false,
  guitarsCount: 0,
  comments: [],
  catalogFetchStatus: FetchStatus.Unset,
};

const guitarData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadGuitars, (state, action) => {
      state.catalog = action.payload.guitars;
      state.isDataLoaded = true;
    })
    .addCase(loadGuitarsCount, (state, action) => {
      const {guitars} = action.payload;
      const guitarsCount = guitars.length;
      state.guitarsCount = guitarsCount;
    })
    .addCase(loadComments, (state, action) => {
      const {comments} = action.payload;
      state.comments = state.comments.concat(comments);
    })
    .addCase(setCatalogFetchStatusAction, (state, action) => {
      state.catalogFetchStatus = action.payload;
    });
});

export {guitarData};

