import React, {useCallback} from 'react';
import {Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../store/reducer';
import {Sorts} from '../../const';
import {Actions} from '../../store/action-type';
import {changeSort} from '../../store/action';
import {sortingByParametr} from '../../utils';
import GuitarList from '../guitar-list/guitar-list';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import Pagination from '../pagination/pagination';

const mapStateToProps = ({guitars, activeSort}: State) => ({
  guitars: sortingByParametr(guitars, activeSort),
  activeSort,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onChangeSortType(sort: Sorts) {
    dispatch(changeSort(sort));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ConnectedComponentProps = PropsFromRedux;

function CatalogScreen({guitars, activeSort, onChangeSortType}:ConnectedComponentProps): JSX.Element {

  const sorts = Object.values(Sorts) as Sorts[];

  const changeSortCallBack = useCallback((sortActive) => {
    onChangeSortType(sortActive);
  }, [onChangeSortType]);

  return (
    <div className="catalog">
      <CatalogFilter />
      <CatalogSort sorts={sorts} activeSort={activeSort} onChangeSortType={changeSortCallBack}/>
      <GuitarList guitars={guitars}/>
      <Pagination />
    </div>
  );
}

export {CatalogScreen};
export default connector(CatalogScreen);
