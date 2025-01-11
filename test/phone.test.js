import { generateData } from '../services/dataGenerator.js'

describe('Phone Number Generator Tests', () => {
	describe('Basic Phone Formats', () => {
		test('generates default 10-digit phone number', () => {
			const result = generateData({ phone: '{phone}' })
			expect(result[0].phone).toMatch(/^\d{10}$/)
		})

		test('generates custom length phone number', () => {
			const result = generateData({ phone: '{phone|7}' })
			expect(result[0].phone).toMatch(/^\d{7}$/)
		})
	})

	describe('Country Code Format', () => {
		test('generates phone with country code', () => {
			const result = generateData({ phone: '{phone|country}' })
			expect(result[0].phone).toMatch(/^\+\d{1,3}-\d{10}$/)
		})
	})

	describe('Area Code Formats', () => {
		test('generates phone with default area code', () => {
			const result = generateData({ phone: '{phone|area}' })
			expect(result[0].phone).toMatch(/^\((\d{2})\)-\d{8}$|^\((\d{3})\)-\d{7}$/)
		})

		test('generates phone with 2-digit area code', () => {
			const result = generateData({ phone: '{phone|area2}' })
			expect(result[0].phone).toMatch(/^\(\d{2}\)-\d{8}$/)
		})

		test('generates phone with 3-digit area code', () => {
			const result = generateData({ phone: '{phone|area3}' })
			expect(result[0].phone).toMatch(/^\(\d{3}\)-\d{7}$/)
		})
	})

	describe('Combined Formats', () => {
		test('generates phone with country and area code', () => {
			const result = generateData({ phone: '{phone|country,area}' })
			expect(result[0].phone).toMatch(/^\+\d{1,3}-\(\d{2}\)-\d{8}$|^\+\d{1,3}-\(\d{3}\)-\d{7}$/)
		})

		test('generates phone with country and custom area code', () => {
			const result = generateData({ phone: '{phone|country,area2}' })
			expect(result[0].phone).toMatch(/^\+\d{1,3}-\(\d{2}\)-\d{8}$/)
		})

		test('generates phone with custom length and area code', () => {
			const result = generateData({ phone: '{phone|8,area3}' })
			expect(result[0].phone).toMatch(/^\(\d{3}\)-\d{5}$/)
		})
	})

	describe('Edge Cases', () => {
		test('handles empty format parameter', () => {
			const result = generateData({ phone: '{phone|}' })
			expect(result[0].phone).toMatch(/^\d{10}$/)
		})

		test('handles invalid format parameter', () => {
			const result = generateData({ phone: '{phone|invalid}' })
			expect(result[0].phone).toMatch(/^\d{10}$/)
		})

		test('handles multiple invalid formats', () => {
			const result = generateData({ phone: '{phone|invalid1,invalid2}' })
			expect(result[0].phone).toMatch(/^\d{10}$/)
		})
	})

	describe('Multiple Phone Numbers', () => {
		test('generates multiple formatted phone numbers', () => {
			const result = generateData({
				rows: '3',
				phone: '{phone|country,area}',
			})

			expect(result).toHaveLength(3)
			result.forEach(item => {
				expect(item.phone).toMatch(/^\+\d{1,3}-\(\d{2}\)-\d{8}$|^\+\d{1,3}-\(\d{3}\)-\d{7}$/)
			})

			// Verify we're getting different numbers
			const uniqueNumbers = new Set(result.map(r => r.phone))
			expect(uniqueNumbers.size).toBeGreaterThan(1)
		})
	})

	describe('Area Code Variations', () => {
		test('generates random length area codes when using generic area option', () => {
			// Generate multiple numbers to ensure we get both lengths
			const results = generateData({
				rows: '30', // Generate enough samples to likely get both lengths
				phone: '{phone|area}',
			})

			// Extract area code lengths
			const areaLengths = results.map(r => {
				const match = r.phone.match(/^\((\d{2,3})\)-/)
				return match[1].length
			})

			// Convert to Set to get unique lengths
			const uniqueLengths = new Set(areaLengths)

			// We should see both lengths of 2 and 3
			expect(uniqueLengths.size).toBe(2)
			expect(uniqueLengths.has(2)).toBe(true)
			expect(uniqueLengths.has(3)).toBe(true)
		})
	})
})
