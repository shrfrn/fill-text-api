import moment from 'moment'
import { generateData } from '../services/dataGenerator.js'

describe('Date Generation', () => {
	test('generates dates with default format', () => {
		const result = generateData({
				rows: 10,
				date: '{date}'
		})

		result.forEach(item => {
			expect(item.date).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
			expect(Date.parse(item.date)).toBeTruthy()
		})
	})

	test('generates dates with basic format', () => {
		const result = generateData({
			rows: 10,
			date1: '{date|yyyy-MM-dd}'
		})

		result.forEach(item => {
			expect(item.date1).toMatch(/^\d{4}-\d{2}-\d{2}$/)
			expect(moment(item.date1, 'YYYY-MM-DD').isValid()).toBeTruthy()
		})
	})

	test('generates dates within specified range', () => {
		const result = generateData({
			rows: 50,
			date1: '{date|01-01-2020,31-12-2020}'
		})

		result.forEach(item => {
			const date = moment(item.date1)
			expect(date.isBetween('2020-01-01', '2020-12-31', 'day', '[]')).toBeTruthy()
		})
	})
})
