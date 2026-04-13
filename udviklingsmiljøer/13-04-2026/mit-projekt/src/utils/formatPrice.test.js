import { describe, it, expect } from 'vitest'
import { formatPrice } from './opgave1'

describe('formatPrice', () => {
  it('Formater 10', () => {
    expect(formatPrice(10)).toBe('10 kr.');
  });

  it('Formater 0', () => {
    expect(formatPrice(0)).toBe('0 kr.');
  });

  it('Formater -10', () => {
    expect(formatPrice(-10)).toBe('-10 kr.');
  });

  it('Formater 10.3', () => {
    expect(formatPrice(10.3)).toBe('10.3 kr.');
  });

    it('Formater "f"', () => {
    expect(formatPrice('f')).toBe('f kr.');
  });

    it('Formater "10"', () => {
    expect(formatPrice('10')).toBe('10 kr.');
  });


})