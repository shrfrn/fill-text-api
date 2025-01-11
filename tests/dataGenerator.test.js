import axios from 'axios'

const API_URL = 'http://localhost:3000/api'

describe('Data Generator API Tests', () => {
    // Helper function to make API requests
    const getData = async (params) => {
        const response = await axios.get(API_URL + params)
        return response.data[0] // Get first item since we only need one for testing
    }

    // Add this helper function for better error messages
    const expectWithData = (received, matcher, message = '') => {
        try {
            expect(received).toMatch(matcher)
        } catch (error) {
            // Create an object that will force a detailed comparison failure
            expect({
                type: 'Error',
                message: message,
                received: received,
                expected: matcher.toString(),
                details: `
                    Expected the value to match ${matcher}
                    Received: ${JSON.stringify(received, null, 2)}
                `
            }).toMatchObject({
                type: 'Success'  // This will always fail and show our detailed message
            })
        }
    }

    describe('Personal Information', () => {
        test('firstName should return a valid name', async () => {
            const data = await getData('?name={firstName}')
            expectWithData(data.name, /^[A-Z][a-z]+$/, 'Invalid first name format')
        })

        test('middleName formats', async () => {
            const fullMiddle = await getData('?middle={middleName}')
            expect(fullMiddle.middle).toMatch(/^[A-Z][a-z]+$/)

            const initial = await getData('?middle={middleName|initial}')
            expect(initial.middle).toMatch(/^[A-Z]\.$/)
        })

        test('fullName combinations', async () => {
            const basic = await getData('?name={fullName}')
            expect(basic.name).toMatch(/^[A-Z][a-z]+ [A-Z][a-z]+$/)

            const withTitle = await getData('?name={fullName|title}')
            expect(withTitle.name).toMatch(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.) [A-Z][a-z]+ [A-Z][a-z]+$/)

            const withMiddle = await getData('?name={fullName|middle}')
            expect(withMiddle.name).toMatch(/^[A-Z][a-z]+ [A-Z][a-z]+ [A-Z][a-z]+$/)

            const withTitleAndMiddle = await getData('?name={fullName|title,middle}')
            expect(withTitleAndMiddle.name)
                .toMatch(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.) [A-Z][a-z]+ [A-Z][a-z]+ [A-Z][a-z]+$/)

            const withInitial = await getData('?name={fullName|title,middle,initial}')
            expect(withInitial.name)
                .toMatch(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.) [A-Z][a-z]+ [A-Z]\. [A-Z][a-z]+$/)
        })
    })

    describe('Contact Information', () => {
        test('phone number formats', async () => {
            const basic = await getData('?phone={phone}')
            expect(basic.phone).toMatch(/^\d{3}-\d{3}-\d{4}$/) // Basic format is likely XXX-XXX-XXXX

            const formatted = await getData('?phone={phone|format}') 
            expect(formatted.phone).toMatch(/^\(\d{3}\) \d{3}-\d{4}$/)
        })
    })

    describe('Date Formatting', () => {
        test('basic date formats', async () => {
            const iso = await getData('?date={date}')
            expect(iso.date).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)

            const formatted = await getData('?date={date|MM/dd/yyyy}')
            expect(formatted.date).toMatch(/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/)
        })

        test('text-based date formats', async () => {
            const withDow = await getData('?date={date|dow, Mon d, yyyy}')
            expect(withDow.date).toMatch(/^(Sun|Mon|Tue|Wed|Thu|Fri|Sat), [A-Z][a-z]{2} \d{1,2}, \d{4}$/)

            const fullFormat = await getData('?date={date|DOW, Month d, yyyy}')
            expect(fullFormat.date)
                .toMatch(/^(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday), [A-Z][a-z]+ \d{1,2}, \d{4}$/)
        })

        test('date ranges', async () => {
            const rangeDate = await getData('?date={date|01-01-1980,31-12-1999|yyyy-MM-dd}')
            const year = parseInt(rangeDate.date.split('-')[0])
            expect(year).toBeGreaterThanOrEqual(1980)
            expect(year).toBeLessThanOrEqual(1999)
        })
    })

    describe('Text Generation', () => {
        test('lorem ipsum generation', async () => {
            const basic = await getData('?text={lorem}')
            expect(basic.text.split(' ')).toHaveLength(7) // Default is 7 words

            const fixed = await getData('?text={lorem|5}')
            expect(fixed.text.split(' ')).toHaveLength(5)

            const range = await getData('?text={lorem|3,6}')
            const wordCount = range.text.split(' ').length
            expect(wordCount).toBeGreaterThanOrEqual(3)
            expect(wordCount).toBeLessThanOrEqual(6)
        })
    })

    describe('Numbers and IDs', () => {
        test('number ranges', async () => {
            const number = await getData('?num={numberRange|1,100}')
            expect(number.num).toBeGreaterThanOrEqual(1)
            expect(number.num).toBeLessThanOrEqual(100)
        })

        test('number length', async () => {
            const number = await getData('?num={numberLength|6}')
            expect(number.num).toMatch(/^\d{6}$/)
        })
    })

    describe('Complex Objects', () => {
        test('address object', async () => {
            const data = await getData('?address={addressObject}')
            expect(data.address).toMatchObject({
                streetAddress: expect.any(String),
                city: expect.any(String),
                state: expect.stringMatching(/^[A-Z]{2}$/),
                zip: expect.stringMatching(/^\d{5}(-\d{4})?$/)
            })
        })
    })

    describe('Multiple Parameters', () => {
        test('combined parameters', async () => {
            const data = await getData('?name={fullName|title}&date={date|MM/dd/yyyy}&text={lorem|5}')
            expect(data.name).toMatch(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.) [A-Z][a-z]+ [A-Z][a-z]+$/)
            expect(data.date).toMatch(/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/)
            expect(data.text.split(' ')).toHaveLength(5)
        })
    })
}) 