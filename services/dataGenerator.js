import { faker } from '@faker-js/faker'

const parseType = (value) => {
    // Handle format parameters like {phone|format} or {numberRange|1,100}
    const matches = value.match(/\{(\w+)(?:\|([^}]+))?\}/)
    if (!matches) return { type: value }
    
    return {
        type: matches[1],
        format: matches[2]
    }
}

export const generateData = (params) => {
    const rows = parseInt(params.rows) || 1
    const data = []
    const generatedValues = {} // Store values for {this.*} references

    for (let i = 0; i < rows; i++) {
        const item = {}
        
        Object.entries(params).forEach(([key, value]) => {
            if (key === 'rows') return

            // Handle array values like [HR,IT,Sales,Marketing]
            if (value.startsWith('[') && value.endsWith(']')) {
                const options = value.slice(1, -1).split(',')
                item[key] = options[Math.floor(Math.random() * options.length)]
                return
            }

            // Handle concatenation with ~
            if (value.includes('~')) {
                item[key] = value.split('~')
                    .map(part => generateValue(part.trim(), i, generatedValues))
                    .join(' ')
                return
            }

            // Handle regular values
            item[key] = generateValue(value, i, generatedValues)
            generatedValues[key] = item[key]
        })
        
        data.push(item)
    }
    
    return data
}

const generateValue = (value, index, previousValues) => {
    // Handle static values
    if (!value.startsWith('{')) return value

    const { type, format } = parseType(value)

    // Handle {this.*} references
    if (type.startsWith('this.')) {
        const refKey = type.substring(5)
        return previousValues[refKey] || ''
    }

    switch (type) {
        // Person data
        case 'firstName':
            return faker.person.firstName()
        case 'lastName':
            return faker.person.lastName()
        case 'username':
            return faker.internet.userName()
        case 'password':
            return format ? faker.internet.password(parseInt(format)) : faker.internet.password()
        case 'email':
            return faker.internet.email()

        // Contact data
        case 'phone':
            const phoneNumber = faker.phone.number('##########')
                .split(/[xX]/)[0]
                .trim()
            return format === 'format'
                ? phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
                : phoneNumber

        // Location data
        case 'streetAddress':
            return faker.location.streetAddress()
        case 'city':
            return faker.location.city()
        case 'zip':
            return faker.location.zipCode()
        case 'country':
            return format === 'abbr2' 
                ? faker.location.countryCode()
                : format === 'abbr3'
                    ? faker.location.countryCode('alpha-3')
                    : faker.location.country()
        case 'usState':
            return format === 'abbr'
                ? faker.location.state({ abbreviated: true })
                : faker.location.state()

        // Business data
        case 'business':
            return faker.company.name()

        // Payment data
        case 'ccType':
            return format === 'abbr'
                ? faker.helpers.arrayElement(['VISA', 'MC', 'AMEX', 'DISC'])
                : faker.helpers.arrayElement(['Visa', 'Mastercard', 'American Express', 'Discover'])
        case 'ccNumber':
            return faker.finance.creditCardNumber()

        // Numbers and IDs
        case 'index':
            return index + 1
        case 'numberRange':
            if (format) {
                const [min, max] = format.split(',').map(Number)
                return faker.number.int({ min, max })
            }
            return faker.number.int({ min: 0, max: 1000 })
        case 'numberLength':
            return faker.string.numeric(parseInt(format) || 5)

        // Dates and strings
        case 'date':
            const date = faker.date.recent()
            if (format) {
                return format
                    .replace('yyyy', date.getFullYear())
                    .replace('MM', String(date.getMonth() + 1).padStart(2, '0'))
                    .replace('dd', String(date.getDate()).padStart(2, '0'))
                    .replace('HH', String(date.getHours()).padStart(2, '0'))
                    .replace('mm', String(date.getMinutes()).padStart(2, '0'))
                    .replace('ss', String(date.getSeconds()).padStart(2, '0'))
            }
            return date.toISOString()
        case 'string':
            return faker.string.alphanumeric(parseInt(format) || 5)

        // Complex objects
        case 'addressObject':
            return {
                streetAddress: faker.location.streetAddress(),
                city: faker.location.city(),
                state: faker.location.state({ abbreviated: true }),
                zip: faker.location.zipCode()
            }

        default:
            return value
    }
} 