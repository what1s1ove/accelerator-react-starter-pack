import { IComment } from './IComment';

export interface IGuitar {
  id: string
  name: string
  vendorCode: string
  type: string
  description: string
  previewImg: string
  stringCount: number
  rating: number
  price: number
  comments?: Array<IComment>
}

export interface IGuitarsState {
  guitars: Array<IGuitar>
  filteredGuitars: {
    data: Array<IGuitar>
    loading: string
    currentRequestId: string
  }
  guitarById: {
    data: IGuitar
    loading: string
    currentRequestId: string
  }
  guitarsByName: Array<IGuitar>
}
