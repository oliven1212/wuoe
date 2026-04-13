import { describe, it, expect } from 'vitest'
import { isAdult } from './opgave1'

describe('isAdult', () => {
  it('Er 18 voksen', () => {
    expect(isAdult(18)).toBeTruthy()
  });

  it('Er 17.9 voksen', () => {
    expect(isAdult(17.9)).toBeFalsy()
  });
  
  it('Er 0 voksen', () => {
    expect(isAdult(0)).toBeFalsy()
  });

  it('Er -3 voksen', () => {
    expect(isAdult(-3)).toBeFalsy()
  });

  it('Er "s" voksen', () => {
    expect(isAdult('s')).toBeFalsy()
  });

  it('Er 0 voksen', () => {
    expect(isAdult(0)).toBeFalsy()
  });

  it('Er 19 voksen', () => {
    expect(isAdult(19)).toBeTruthy()
  });
})