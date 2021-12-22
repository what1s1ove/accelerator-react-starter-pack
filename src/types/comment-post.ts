type GuitarId = number;
type UserName = string;
type Advantage = string;
type Disadvantage = string;
type CommentText = string;
type Rating = number;

export type CommentPost = {
  guitarId: GuitarId;
  userName: UserName;
  advantage: Advantage;
  disadvantage: Disadvantage;
  comment: CommentText;
  rating: Rating;
};
