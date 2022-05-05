export const ActionType = {
  LOAD_GUITARS: 'guitars/load',
  LOAD_GUITARS_BY_NAME: 'guitars/loadByName',
  LOAD_FILTERED_GUITARS: 'guitars/loadFiltered ',
  LOAD_SORTING_TYPE: 'sorting/loadType',
  LOAD_SORTING_ORDER: 'sorting/loadOrder',
  LOAD_QUANTITY_OF_STRINGS: 'filters/loadQuantityOfStrings',
  REMOVE_QUANTITY_OF_STRINGS: 'filters/removeQuantityOfStrings',
  LOAD_GUITAR_TYPE: 'filters/loadGuitarType',
  REMOVE_GUITAR_TYPE: 'filters/removeGuitarType',
  LOAD_PRICE_RANGE: 'filters/loadPriceRange',
  LOAD_CURRENT_PAGE: 'pagination/loadCurrentPage',
  LOAD_ALL_PAGES: 'pagination/loadAllPages',
} as const;
