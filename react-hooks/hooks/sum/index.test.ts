import sum from './index';
import {describe, expect, test} from '@jest/globals';

describe('sum', () => {
  test('should return the sum of two numbers', () => {
    const result = sum(2, 3);
    expect(result).toBe(5);
  });

  test('should return the sum of negative numbers', () => {
    const result = sum(-5, -10);
    expect(result).toBe(-15);
  });

  test('should return the sum of a positive and a negative number', () => {
    const result = sum(8, -4);
    expect(result).toBe(4);
  });
});