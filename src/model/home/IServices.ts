import {images} from '../../../assets';

export interface ICategory {
  id: number;
  title?: string;
  image?: any;
}
export const CategoryList: ICategory[] = [
  {
    id: 0,
    title: 'All',
    image: images.menuIcon,
  },
  {
    id: 2,
    title: 'Bouquet',
    image: images.bouquet,
  },
  {
    id: 3,
    title: 'Table',
    image: images.table,
  },
  {
    id: 4,
    title: 'Aisle',
    image: images.aisle,
  },
  {
    id: 5,
    title: 'Accessories',
    image: images.accessories,
  },
  {
    id: 6,
    title: 'Bouquet',
    image: images.bouquet,
  },
  {
    id: 7,
    title: 'Table',
    image: images.table,
  },
  {
    id: 8,
    title: 'Aisle',
    image: images.aisle,
  },
  {
    id: 9,
    title: 'Accessories',
    image: images.accessories,
  },
];
