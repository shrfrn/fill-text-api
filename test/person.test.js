import { generateData } from '../services/dataGenerator.js'

describe('Person Data Generator Tests', () => {
	describe('Basic Name Fields', () => {
		test('generates firstName', () => {
			const result = generateData({ name: '{firstName}' })
			expect(result[0].name).toMatch(/^[A-Z][a-zA-Z\-\'\s]+$/)
		})

		test('generates lastName', () => {
			const result = generateData({ name: '{lastName}' })
			expect(result[0].name).toMatch(/^[A-Z][a-zA-Z\-\'\s]+$/)
		})

		test('generates middleName', () => {
			const result = generateData({ middle: '{middleName}' })
			expect(result[0].middle).toMatch(/^[A-Z][a-zA-Z\-\'\s]+$/)
		})

		test('generates middleName initial', () => {
			const result = generateData({ middle: '{middleName|initial}' })
			expect(result[0].middle).toMatch(/^[A-Z]\.$/)
		})
	})

	describe('Title Tests', () => {
		test('generates full title', () => {
			const result = generateData({ title: '{title}' })
			expect(result[0].title).toMatch(/^(Mister|Misses|Miss|Doctor|Professor)$/)
		})

		test('generates abbreviated title', () => {
			const result = generateData({ title: '{title|abbr}' })
			expect(result[0].title).toMatch(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.)$/)
		})
	})

	describe('Full Name Combinations', () => {
		test('generates basic fullName', () => {
			const result = generateData({ name: '{fullName}' })
			expect(result[0].name).toMatch(/^[A-Z][a-zA-Z\-\'\s]+ [A-Z][a-zA-Z\-\'\s]+$/)
		})

		test('generates fullName with title', () => {
			const result = generateData({ name: '{fullName|title}' })
			expect(result[0].name).toMatch(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.) [A-Z][a-zA-Z\-\'\s]+ [A-Z][a-zA-Z\-\'\s]+$/)
		})

		test('generates fullName with middle name', () => {
			const result = generateData({ name: '{fullName|middle}' })
			expect(result[0].name).toMatch(/^[A-Z][a-zA-Z\-\'\s]+ [A-Z][a-zA-Z\-\'\s]+ [A-Z][a-zA-Z\-\'\s]+$/)
		})

		test('generates fullName with middle initial', () => {
			const result = generateData({ name: '{fullName|middle,initial}' })
			expect(result[0].name).toMatch(/^[A-Z][a-zA-Z\-\'\s]+ [A-Z]\. [A-Z][a-zA-Z\-\'\s]+$/)
		})

		test('generates fullName with title and middle initial', () => {
			const result = generateData({ name: '{fullName|title,middle,initial}' })
			expect(result[0].name).toMatch(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.) [A-Z][a-zA-Z\-\'\s]+ [A-Z]\. [A-Z][a-zA-Z\-\'\s]+$/)
		})

		test('generates fullName with all options', () => {
			const result = generateData({ name: '{fullName|title,middle}' })
			expect(result[0].name).toMatch(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.) [A-Z][a-zA-Z\-\'\s]+ [A-Z][a-zA-Z\-\'\s]+ [A-Z][a-zA-Z\-\'\s]+$/)
		})

		test('generates fullName with all options and initial', () => {
			const result = generateData({ name: '{fullName|title,middle,initial}' })
			expect(result[0].name).toMatch(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.) [A-Z][a-zA-Z\-\'\s]+ [A-Z]\. [A-Z][a-zA-Z\-\'\s]+$/)
		})
	})

	describe('Combined Fields', () => {
		test('generates full person data', () => {
			const result = generateData({
				title: '{title|abbr}',
				firstName: '{firstName}',
				middleName: '{middleName|initial}',
				lastName: '{lastName}',
			})

			const person = result[0]

			// Title should be abbreviated
			expect(person.title).toMatch(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.)$/)

			// First name should be capitalized
			expect(person.firstName).toMatch(/^[A-Z][a-zA-Z\-\'\s]+$/)

			// Middle name should be initial format
			expect(person.middleName).toMatch(/^[A-Z]\.$/)

			// Last name should be capitalized
			expect(person.lastName).toMatch(/^[A-Z][a-zA-Z\-\'\s]+$/)
		})
	})

	describe('Edge Cases', () => {
		test('handles empty format parameter', () => {
			const result = generateData({ name: '{fullName}' })
			expect(result[0].name).toMatch(/^[A-Z][a-zA-Z\-\'\s]+ [A-Z][a-zA-Z\-\'\s]+$/)
		})

		test('handles invalid format parameter', () => {
			const result = generateData({ name: '{fullName|invalid}' })
			// Should ignore invalid format and return basic firstName lastName
			expect(result[0].name).toMatch(/^[A-Z][a-zA-Z\-\'\s]+ [A-Z][a-zA-Z\-\'\s]+$/)
		})

		test('ignores unknown format options', () => {
			const result = generateData({ name: '{fullName|invalid,wrong,incorrect}' })
			// Should ignore unknown options and return basic firstName lastName
			expect(result[0].name).toMatch(/^[A-Z][a-zA-Z\-\'\s]+ [A-Z][a-zA-Z\-\'\s]+$/)
		})
	})
})
