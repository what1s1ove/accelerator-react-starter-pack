export interface IPriceRange {
    min?: number
    max?: number
}

export interface IFilters {
  sortingType: string
  sortingOrder: string
  quantityOfStrings: string[]
  guitarType: string[]
  priceRange: IPriceRange
}
