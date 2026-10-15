import { describe, it, expect } from 'vitest';
import { INITIAL_PRODUCTS } from '../data/products';

describe('Catalog Search, Filtering, and Sorting Logic', () => {
  it('searches products by name accurately', () => {
    const query = 'avakaya';
    const matches = INITIAL_PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    expect(matches.length).toBeGreaterThanOrEqual(2);
    expect(matches.some((p) => p.name === 'Mango Avakaya Pickle')).toBe(true);
    expect(matches.some((p) => p.name === 'Bellam Avakaya Pickle')).toBe(true);
  });

  it('searches non-veg products by meat/seafood keywords', () => {
    const prawnMatches = INITIAL_PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes('prawn')
    );
    expect(prawnMatches.length).toBe(4); // Small Prawn, Large Prawn, Small Prawn Gongura, Large Prawn Gongura

    const muttonMatches = INITIAL_PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes('mutton')
    );
    expect(muttonMatches.length).toBe(6); // Mutton, Boneless Mutton, Mutton Kheema, Mutton Gongura, Boneless Mutton Gongura, Mutton Kheema Gongura
  });

  it('filters by category accurately', () => {
    const vegOnly = INITIAL_PRODUCTS.filter((p) => p.category === 'Veg Pickles');
    const nonVegOnly = INITIAL_PRODUCTS.filter((p) => p.category === 'Non-Veg Pickles');

    expect(vegOnly).toHaveLength(22);
    expect(nonVegOnly).toHaveLength(21);
    expect(vegOnly.every((p) => p.category === 'Veg Pickles')).toBe(true);
    expect(nonVegOnly.every((p) => p.category === 'Non-Veg Pickles')).toBe(true);
  });

  it('sorts products by price low to high', () => {
    const sortedAsc = [...INITIAL_PRODUCTS].sort((a, b) => a.price - b.price);
    expect(sortedAsc[0].price).toBe(140);
    expect(sortedAsc[sortedAsc.length - 1].price).toBe(475);

    for (let i = 0; i < sortedAsc.length - 1; i++) {
      expect(sortedAsc[i].price).toBeLessThanOrEqual(sortedAsc[i + 1].price);
    }
  });

  it('sorts products by price high to low', () => {
    const sortedDesc = [...INITIAL_PRODUCTS].sort((a, b) => b.price - a.price);
    expect(sortedDesc[0].price).toBe(475);
    expect(sortedDesc[sortedDesc.length - 1].price).toBe(140);

    for (let i = 0; i < sortedDesc.length - 1; i++) {
      expect(sortedDesc[i].price).toBeGreaterThanOrEqual(sortedDesc[i + 1].price);
    }
  });

  it('sorts products alphabetically A to Z and Z to A', () => {
    const sortedAZ = [...INITIAL_PRODUCTS].sort((a, b) => a.name.localeCompare(b.name));
    const sortedZA = [...INITIAL_PRODUCTS].sort((a, b) => b.name.localeCompare(a.name));

    expect(sortedAZ[0].name.localeCompare(sortedAZ[1].name)).toBeLessThanOrEqual(0);
    expect(sortedZA[0].name.localeCompare(sortedZA[1].name)).toBeGreaterThanOrEqual(0);
  });
});
