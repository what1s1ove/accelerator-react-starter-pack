type Guitar = {
  id: number,
  name: string,
  vendorCode: string,
  type: string,
  description: string,
  previewImg: string,
  stringCount: number,
  rating: number,
  price: number,
}

type Comment = {
  id: string,
  userName: string,
  advantage: string,
  comment: string,
  rating: number,
  createAt: string,
  guitarId: number,
}

export type {
  Guitar,
  Comment
};
