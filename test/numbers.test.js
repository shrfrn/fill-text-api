import { generateData } from '../services/dataGenerator'

describe('Index Generation Tests', () => {
	test('generates default zero-based index', () => {
		const result = generateData({
			rows: '3',
			idx: '{index}',
		})

		expect(result).toHaveLength(3)
		expect(result[0].idx).toBe(0)
		expect(result[1].idx).toBe(1)
		expect(result[2].idx).toBe(2)
	})

	test('generates index with custom start value', () => {
		const result = generateData({
			rows: '3',
			idx: '{index|1}',
		})

		expect(result).toHaveLength(3)
		expect(result[0].idx).toBe(1)
		expect(result[1].idx).toBe(2)
		expect(result[2].idx).toBe(3)
	})

	test('generates index with custom start value of 100', () => {
		const result = generateData({
			rows: '3',
			idx: '{index|100}',
		})

		expect(result).toHaveLength(3)
		expect(result[0].idx).toBe(100)
		expect(result[1].idx).toBe(101)
		expect(result[2].idx).toBe(102)
	})

	test('handles invalid format gracefully', () => {
		const result = generateData({
			rows: '2',
			idx: '{index|invalid}',
		})

		expect(result).toHaveLength(2)
		expect(result[0].idx).toBe(0) // Falls back to default
		expect(result[1].idx).toBe(1)
	})

	test('handles empty format gracefully', () => {
		const result = generateData({
			rows: '2',
			idx: '{index|}',
		})

		expect(result).toHaveLength(2)
		expect(result[0].idx).toBe(0) // Falls back to default
		expect(result[1].idx).toBe(1)
	})

	test('handles negative start index', () => {
		const result = generateData({
			rows: '3',
			idx: '{index|-2}',
		})

		expect(result).toHaveLength(3)
		expect(result[0].idx).toBe(-2)
		expect(result[1].idx).toBe(-1)
		expect(result[2].idx).toBe(0)
	})
	test('generates numbers within specified range', () => {
		const result = generateData({
			rows: 100,
			num1: '{numberRange|1,10}',
			num2: '{numberRange|50,55}',
			num3: '{numberRange|-10,0}',
		})

		result.forEach(item => {
			expect(item.num1).toBeGreaterThanOrEqual(1)
			expect(item.num1).toBeLessThanOrEqual(10)

			expect(item.num2).toBeGreaterThanOrEqual(50)
			expect(item.num2).toBeLessThanOrEqual(55)

			expect(item.num3).toBeGreaterThanOrEqual(-10)
			expect(item.num3).toBeLessThanOrEqual(0)
		})
	})

	test('generates numbers with specified length', () => {
		const result = generateData({
			rows: 10,
			num1: '{numberLength|3}',
			num2: '{numberLength|5}',
			num3: '{numberLength|1}',
		})

		result.forEach(item => {
			expect(item.num1.toString()).toHaveLength(3)
			expect(item.num2.toString()).toHaveLength(5)
			expect(item.num3.toString()).toHaveLength(1)

			// Verify they're all numeric strings
			expect(item.num1).toMatch(/^\d+$/)
			expect(item.num2).toMatch(/^\d+$/)
			expect(item.num3).toMatch(/^\d+$/)
		})
	})
})
