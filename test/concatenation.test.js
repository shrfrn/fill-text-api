import { generateData } from '../services/dataGenerator.js'

describe('Concatenation Tests', () => {
    test('concatenates first and last name with ~', () => {
        const result = generateData({ name: '{firstName}~{lastName}' })
        expect(result[0].name).toMatch(/^[A-Z][a-zA-Z\-\'\s]+[A-Z][a-zA-Z\-\'\s]+$/)
    })

    test('concatenates title and full name with ~', () => {
        const result = generateData({ name: '{title}~{firstName}~{lastName}' })
        expect(result[0].name).toMatch(/^(Mister|Misses|Miss|Doctor|Professor) [A-Z][a-zA-Z\-\'\s]+ [A-Z][a-zA-Z\-\'\s]+$/)
    })

    test('concatenates multiple fields with ~', () => {
        const result = generateData({ 
            fullAddress: '{usState|abbr}~{zip}' 
        })
        expect(result[0].fullAddress).toMatch(/^[A-Z]{2} \d{5}(-\d{4})?$/)
    })
}) 