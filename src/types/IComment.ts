export interface ICommentPost {
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
  guitarId: number,
}

export interface IComment extends ICommentPost {
  id: string
  createAt: string
}
