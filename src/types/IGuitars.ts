export interface IGuitar {
  id: number
  name: string
  vendorCode: string
  type: string
  description: string
  previewImg: string
  stringCount: number
  rating: number
  price: number
}

export interface IGuitarsState {
  guitars: Array<IGuitar>
  guitarsByName: Array<IGuitar>
}
