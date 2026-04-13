import { describe, it, expect } from 'vitest'
import { fullName } from './opgave1'

describe('fullName', () => {
  it('Kan man kombinere 2 navne', () => {
    expect(fullName('Steve', 'Jobs')).toBe('Steve Jobs')
  });
  
  it('Acceptere number som navne', () => {
    expect(fullName(2, 3)).toBe('2 3')
  });
  
  it('Kun fornavn givet', () => {
    expect(fullName('Steve', '')).toBe('Steve ')
  });

  it('Kun efternavn givet', () => {
    expect(fullName('','Jobs')).toBe(' Jobs')
  });
})