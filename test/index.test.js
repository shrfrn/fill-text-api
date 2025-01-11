import { generateData } from '../services/dataGenerator';

describe('Index Generation Tests', () => {
  test('generates default zero-based index', () => {
    const result = generateData({
      rows: '3',
      idx: '{index}'
    });

    expect(result).toHaveLength(3);
    expect(result[0].idx).toBe(0);
    expect(result[1].idx).toBe(1);
    expect(result[2].idx).toBe(2);
  });

  test('generates index with custom start value', () => {
    const result = generateData({
      rows: '3',
      idx: '{index|1}'
    });

    expect(result).toHaveLength(3);
    expect(result[0].idx).toBe(1);
    expect(result[1].idx).toBe(2);
    expect(result[2].idx).toBe(3);
  });

  test('generates index with custom start value of 100', () => {
    const result = generateData({
      rows: '3',
      idx: '{index|100}'
    });

    expect(result).toHaveLength(3);
    expect(result[0].idx).toBe(100);
    expect(result[1].idx).toBe(101);
    expect(result[2].idx).toBe(102);
  });

  test('handles invalid format gracefully', () => {
    const result = generateData({
      rows: '2',
      idx: '{index|invalid}'
    });

    expect(result).toHaveLength(2);
    expect(result[0].idx).toBe(0);  // Falls back to default
    expect(result[1].idx).toBe(1);
  });

  test('handles empty format gracefully', () => {
    const result = generateData({
      rows: '2',
      idx: '{index|}'
    });

    expect(result).toHaveLength(2);
    expect(result[0].idx).toBe(0);  // Falls back to default
    expect(result[1].idx).toBe(1);
  });

  test('handles negative start index', () => {
    const result = generateData({
      rows: '3',
      idx: '{index|-2}'
    });

    expect(result).toHaveLength(3);
    expect(result[0].idx).toBe(-2);
    expect(result[1].idx).toBe(-1);
    expect(result[2].idx).toBe(0);
  });
}); 