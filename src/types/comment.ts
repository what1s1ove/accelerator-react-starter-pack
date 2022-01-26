type CommentType = {
    id: string,
    userName: string,
    advantage: string,
    disadvantage: string,
    comment: string,
    rating: number,
    createAt: Date,
    guitarId: number,
}

type NewCommentType = {
  guitarId: number,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
};

export type {CommentType, NewCommentType};
