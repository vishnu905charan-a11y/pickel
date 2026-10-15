import { describe, it, expect } from 'vitest';
import { INITIAL_PRODUCTS } from '../data/products';

describe('Product Catalog Integrity — All 43 Products', () => {
  it('contains exactly 43 initial products', () => {
    expect(INITIAL_PRODUCTS).toHaveLength(43);
  });

  it('contains exactly 22 vegetarian and 21 non-vegetarian products', () => {
    const vegProducts = INITIAL_PRODUCTS.filter((p) => p.category === 'Veg Pickles');
    const nonVegProducts = INITIAL_PRODUCTS.filter((p) => p.category === 'Non-Veg Pickles');

    expect(vegProducts).toHaveLength(22);
    expect(nonVegProducts).toHaveLength(21);
  });

  it('verifies every product has default package size of 250 g', () => {
    INITIAL_PRODUCTS.forEach((product) => {
      expect(product.packageSize).toBe('250 g');
    });
  });

  it('verifies Mango Avakaya Pickle costs ₹150 per 250 g', () => {
    const mangoAvakaya = INITIAL_PRODUCTS.find((p) => p.name === 'Mango Avakaya Pickle');
    expect(mangoAvakaya).toBeDefined();
    expect(mangoAvakaya?.price).toBe(150);
    expect(mangoAvakaya?.packageSize).toBe('250 g');
    expect(mangoAvakaya?.category).toBe('Veg Pickles');
  });

  it('verifies Korameenu Fish Pickle costs ₹325 with exact canonical name', () => {
    const korameenu = INITIAL_PRODUCTS.find((p) => p.name === 'Korameenu Fish Pickle');
    expect(korameenu).toBeDefined();
    expect(korameenu?.price).toBe(325);
    expect(korameenu?.category).toBe('Non-Veg Pickles');
  });

  it('verifies all 22 Veg Pickles match supplied exact names and prices', () => {
    const expectedVeg: Record<string, number> = {
      'Mango Avakaya Pickle': 150,
      'Bellam Avakaya Pickle': 140,
      'Coriander Pickle': 140,
      'Red Chilli Pickle': 140,
      'Mango Thokku Pickle': 140,
      'Ginger Pickle': 140,
      'Curry Leaves Pickle': 140,
      'Garlic Pickle': 140,
      'Drumsticks Pickle': 140,
      'Green Chilli Pickle': 140,
      'Lemon Pickle': 140,
      'Tomato Pickle': 140,
      'Tamarind Pickle': 140,
      'Bitter Gourd Pickle': 140,
      'Gongura Pickle': 140,
      'Amla Pickle': 140,
      'Cauliflower Pickle': 140,
      'Pudina Pickle': 140,
      'Nallerukada Pickle': 140,
      'Dabbakaya Pickle': 140,
      'Red Chilli Gongura Pickle': 140,
      'Vankaya Pickle': 140,
    };

    Object.entries(expectedVeg).forEach(([name, expectedPrice]) => {
      const match = INITIAL_PRODUCTS.find((p) => p.name === name);
      expect(match, `Expected product "${name}" to exist in catalog`).toBeDefined();
      expect(match?.price, `Expected "${name}" to cost ₹${expectedPrice}`).toBe(expectedPrice);
      expect(match?.category).toBe('Veg Pickles');
    });
  });

  it('verifies all 21 Non-Veg Pickles match supplied exact names and prices', () => {
    const expectedNonVeg: Record<string, number> = {
      'Chicken Pickle': 250,
      'Boneless Chicken Pickle': 300,
      'Natukodi Pickle': 350,
      'Korameenu Fish Pickle': 325,
      'Pandugappa Fish Pickle': 400,
      'Crab Pickle': 325,
      'Small Prawn Pickle': 375,
      'Large Prawn Pickle': 425,
      'Mutton Pickle': 425,
      'Boneless Mutton Pickle': 475,
      'Mutton Kheema Pickle': 475,
      'Cheruvu Fish': 300,
      'Metalllu Fish': 300,
      'Chicken Gongura': 250,
      'Boneless Chicken Gongura': 300,
      'Natukodi Gongura': 350,
      'Small Prawn Gongura': 375,
      'Large Prawn Gongura': 425,
      'Mutton Gongura': 375,
      'Boneless Mutton Gongura': 475,
      'Mutton Kheema Gongura': 425,
    };

    Object.entries(expectedNonVeg).forEach(([name, expectedPrice]) => {
      const match = INITIAL_PRODUCTS.find((p) => p.name === name);
      expect(match, `Expected product "${name}" to exist in catalog`).toBeDefined();
      expect(match?.price, `Expected "${name}" to cost ₹${expectedPrice}`).toBe(expectedPrice);
      expect(match?.category).toBe('Non-Veg Pickles');
    });
  });
});
