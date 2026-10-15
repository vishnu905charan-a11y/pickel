import type { ProductCategory } from '../types';

export interface CategoryInfo {
  id: string;
  name: ProductCategory;
  slug: string;
  count: number;
  description: string;
  badgeColor: string;
  icon: string;
  bannerImage: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'veg',
    name: 'Veg Pickles',
    slug: 'veg',
    count: 22,
    description: 'Traditional vegetarian pickles handcrafted with fresh seasonal produce, ground spices, and cold-pressed oils.',
    badgeColor: 'border-pickle-green text-pickle-green bg-green-50',
    icon: 'Leaf',
    bannerImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'non-veg',
    name: 'Non-Veg Pickles',
    slug: 'non-veg',
    count: 21,
    description: 'Rich, flavorful non-vegetarian pickles prepared with tender cuts of chicken, mutton, prawns, and fish steeped in aromatic masalas.',
    badgeColor: 'border-pickle-red text-pickle-red bg-red-50',
    icon: 'Flame',
    bannerImage: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=80',
  },
];
