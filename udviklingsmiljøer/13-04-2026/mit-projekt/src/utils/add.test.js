import { describe, it, expect } from 'vitest'
import { add } from './add'

describe('add', () => {
  it('kan lægge to positive tal sammen', () => {
    expect(add(2, 3)).toBe(5)
  })

  it('kan lægge to negative tal sammen', () => {
    expect(add(-1, -1)).toBe(-2)
  })

  it('returnerer 0 når begge tal er 0', () => {
    expect(add(0, 0)).toBe(0)
  })

  it('håndterer strings fra HTML input-felter', () => {
    expect(add('5', '2')).toBe(7)
  })
})