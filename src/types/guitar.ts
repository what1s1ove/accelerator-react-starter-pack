type Id = number & {'database identity':void};
type Name = string;
type VendorCode = string;
type Type = string;
type Description = string;
type PreviewImg = string;
type StringCount = number & {'guitar intrinsic property': void};
type Rating = number;
type Price = number;

export type Guitar = {
  id: Id;
  name: Name;
  vendorCode: VendorCode;
  type: Type;
  description: Description;
  previewImg: PreviewImg;
  stringCount: StringCount;
  rating: Rating;
  price: Price;
};

export type GuitarsList = Guitar[];
