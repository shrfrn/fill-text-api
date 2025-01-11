import { generateData } from '../services/dataGenerator'

describe('Country Generation Tests', () => {
	test('generates full country name by default', () => {
		const result = generateData({ location: '{country}' })
		// Should be a string with at least 2 characters, containing letters and possibly spaces
		expect(result[0].location).toMatch(/^[A-Za-z\s]{2,}$/)
	})

	test('generates 2-letter country code', () => {
		const result = generateData({ code: '{country|abbr2}' })
		// Should be exactly 2 uppercase letters (ISO 3166-1 alpha-2)
		expect(result[0].code).toMatch(/^[A-Z]{2}$/)
	})

	test('generates 3-letter country code', () => {
		const result = generateData({ code: '{country|abbr3}' })
		// Should be exactly 3 uppercase letters (ISO 3166-1 alpha-3)
		expect(result[0].code).toMatch(/^[A-Z]{3}$/)
	})

	test('generates multiple different countries', () => {
		const result = generateData({
			rows: '10',
			country: '{country}',
		})
		const uniqueCountries = new Set(result.map(r => r.country))
		expect(uniqueCountries.size).toBeGreaterThan(1)
	})
})

describe('US State Generation Tests', () => {
	test('generates full state name by default', () => {
		const result = generateData({ state: '{usState}' })
		// Should be a string with at least 4 characters (Utah), containing letters and possibly spaces
		expect(result[0].state).toMatch(/^[A-Za-z\s]{4,}$/)
	})

	test('generates abbreviated state name', () => {
		const result = generateData({ state: '{usState|abbr}' })
		// Should be exactly 2 uppercase letters
		expect(result[0].state).toMatch(/^[A-Z]{2}$/)
	})

	test('generates multiple different states', () => {
		const result = generateData({
			rows: '10',
			state: '{usState}',
		})
		const uniqueStates = new Set(result.map(r => r.state))
		expect(uniqueStates.size).toBeGreaterThan(1)
	})
})

describe('Combined Location Tests', () => {
	test('generates valid address with abbreviated state', () => {
		const result = generateData({
			address: '{streetAddress}',
			city: '{city}',
			state: '{usState|abbr}',
			zip: '{zip}',
		})

		expect(result[0].address).toBeTruthy()
		expect(result[0].city).toBeTruthy()
		expect(result[0].state).toMatch(/^[A-Z]{2}$/)
		expect(result[0].zip).toBeTruthy()
	})

	test('generates address object with abbreviated state', () => {
		const result = generateData({
			location: '{addressObject}',
		})

		expect(result[0].location).toEqual(
			expect.objectContaining({
				streetAddress: expect.any(String),
				city: expect.any(String),
				state: expect.stringMatching(/^[A-Z]{2}$/),
				zip: expect.any(String),
			})
		)
	})
})
