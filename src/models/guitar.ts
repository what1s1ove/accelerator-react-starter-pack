import IGuitarReview from './guitar-review';

export type GuitarType = ['electric', 'acoustic', 'ukulele'];
export type GuitarId = string;

interface IGuitar {
    id: GuitarId;
    name: string;
    vendorCode: string;
    type: GuitarType;
    description: string;
    previewImg: string;
    stringCount: number;
    rating: number;
    price: number;
    comments: IGuitarReview[];
}

export default IGuitar;
