import { describe, it, expect } from 'vitest'
import { square } from './opgave1'

describe('isAdult', () => {
  it('Square af 2', () => {
    expect(square(2)).toBe(4);
  });

  it('Square af 0', () => {
    expect(square(0)).toBe(0)
  });

  it('Square af -2', () => {
    expect(square(-2)).toBe(4)
  });
})