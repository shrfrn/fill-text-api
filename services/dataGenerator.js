import { faker } from '@faker-js/faker'

export const generateData = (params) => {
    const rows = parseInt(params.rows) || 10
    const data = []
    const generatedValues = {} // Store values for {this.*} references

    for (let i = 0; i < rows; i++) {
        const item = {}
        
        Object.entries(params).forEach(([key, value]) => {
            if (key === 'rows') return

            // Handle array values like [HR,IT,Sales,Marketing]
            if (value.startsWith('[') && value.endsWith(']')) {
                const options = value.slice(1, -1).split(/\s*,\s*|\s+/)
                item[key] = options[Math.floor(Math.random() * options.length)]
                return
            }

            // Handle concatenation with ~
            if (value.includes('~')) {
                item[key] = value.split('~').map(part => 
                    generateValue(part.trim(), i, generatedValues)).join(' ')
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

    const { type, format } = parseType(value)

    // Handle {this.*} references
    if (type.startsWith('{this.')) {
        const refKey = type.slice(6, -1)
        return previousValues[refKey] || ''
    }

    // Handle static values
    if (!value.startsWith('{')) return value

    // Route to specialized generators
    if (isPersonData(type)) return generatePersonData(type, format)
    if (isLocationData(type)) return generateLocationData(type, format)
    if (isBusinessData(type)) return generateBusinessData(type, format)
    if (isPrimitiveType(type)) return generatePrimitiveData(type, format, index)
        
    if (type === 'phone') return generatePhoneData(format)
    if (type === 'date') return generateDateData(format)
    if (type === 'lorem') return generateLoremData(format)

    return value
}

const generatePersonData = (type, format) => {
    switch (type.toLowerCase()) {
        case 'firstname':
            return faker.person.firstName()
        case 'lastname':
            return faker.person.lastName()
        case 'middlename':
            return format === 'initial' 
                ? faker.person.firstName().charAt(0) + '.'
                : faker.person.firstName()
        case 'title':
            return format === 'abbr'
                ? faker.helpers.arrayElement(['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.'])
                : faker.helpers.arrayElement(['Mister', 'Misses', 'Miss', 'Doctor', 'Professor'])
        case 'fullname':
            const title = format?.includes('title') 
                ? faker.helpers.arrayElement(['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.']) + ' '
                : ''
            const middle = format?.includes('middle') 
                ? format.includes('initial')
                    ? ` ${faker.person.firstName().charAt(0)}. `
                    : ` ${faker.person.firstName()} `
                : ' '
            return `${title}${faker.person.firstName()}${middle}${faker.person.lastName()}`
        case 'username':
            return faker.internet.userName()
        case 'password':
            return format ? faker.internet.password(parseInt(format)) : faker.internet.password()
        case 'email':
            return faker.internet.email()
        default:
            return ''
    }
}

const generatePhoneData = (format) => {
    // Parse format options if present
    const formatOptions = format ? format.split(',') : [];
    
    // Determine the total length needed based on format options
    let totalDigits = 10; // default
    
    // Check for explicit digit count first as it overrides defaults
    const explicitDigits = formatOptions.find(opt => !isNaN(opt));
    if (explicitDigits) {
        totalDigits = parseInt(explicitDigits);
    } else {
        // If no explicit digits specified, use format-based defaults
        if (formatOptions.includes('area2')) {
            totalDigits = 10; // 2 for area + 8 for number
        } else if (formatOptions.includes('area3')) {
            totalDigits = 10; // 3 for area + 7 for number
        } else if (formatOptions.includes('area')) {
            // Random between 2 and 3 for area code, adjust total accordingly
            totalDigits = faker.number.int({ min: 0, max: 1 }) === 0 ? 10 : 10;
        }
    }
    
    // Generate base digits
    const digits = faker.string.numeric(totalDigits);
    
    // Start building the phone number
    let result = '';
    
    // Add country code if requested
    if (formatOptions.includes('country')) {
        const countryLength = faker.number.int({ min: 1, max: 3 });
        const countryDigits = faker.string.numeric(countryLength);
        result += `+${countryDigits}`;
        if (digits.length > 0) result += '-';
    }
    
    // Add area code if requested
    if (formatOptions.includes('area') || 
        formatOptions.includes('area2') || 
        formatOptions.includes('area3')) {
        let areaLength = 3; // default
        if (formatOptions.includes('area2')) {
            areaLength = 2;
        } else if (formatOptions.includes('area3')) {
            areaLength = 3;
        } else if (formatOptions.includes('area')) {
            // Randomly choose between 2 and 3 digits for generic area code
            areaLength = faker.number.int({ min: 2, max: 3 });
        }
        
        result += `(${digits.slice(0, areaLength)})`;
        if (digits.slice(areaLength).length > 0) result += '-';
        
        // Add remaining digits based on area code length
        const remainingDigits = digits.slice(areaLength);
        result += remainingDigits;
    } else {
        // No area code, just add all digits
        result += digits;
    }
    
    return result;
}

const isPersonData = (type) => {
    return /^(firstName|lastName|middleName|title|fullName|username|password|email)$/i.test(type);
}

const isLocationData = (type) => {
    return /^(streetAddress|city|zip|country|usState|addressObject)$/i.test(type);
}

const isBusinessData = (type) => {
    return /^(business|cctype|ccnumber)$/i.test(type);
}

const isPrimitiveType = (type) => {
    return /^(index|number|string|boolean)$/i.test(type);
}

const generateLocationData = (type, format) => {
    switch (type.toLowerCase()) {
        case 'streetaddress':
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
        case 'usstate':
            return format === 'abbr'
                ? faker.location.state({ abbreviated: true })
                : faker.location.state()
        case 'addressobject':
            return {
                streetAddress: faker.location.streetAddress(),
                city: faker.location.city(),
                state: faker.location.state({ abbreviated: true }),
                zip: faker.location.zipCode()
            }
        default:
            return ''
    }
}

const generateBusinessData = (type, format) => {
    switch (type.toLowerCase()) {
        case 'business':
            return faker.company.name()
        case 'cctype':
            return format === 'abbr'
                ? faker.helpers.arrayElement(['VISA', 'MC', 'AMEX', 'DISC'])
                : faker.helpers.arrayElement(['Visa', 'Mastercard', 'American Express', 'Discover'])
        case 'ccnumber':
            return faker.finance.creditCardNumber()
        default:
            return ''
    }
}

const generatePrimitiveData = (type, format, index) => {
    switch (type.toLowerCase()) {
        case 'index':
            const startIndex = format ? parseInt(format) || 0 : 0
            return index + startIndex
        case 'number':
            if (format) {
                const [min, max] = format.split(',').map(Number)
                return faker.number.int({ min, max })
            }
            return faker.number.int({ min: 0, max: 100 })
        case 'string':
            return faker.string.alphanumeric(parseInt(format) || 5)
        case 'bool':
        case 'boolean':
            return faker.datatype.boolean(parseFloat(format) || .5)
        default:
            return ''
    }
}

const generateDateData = (format) => {
    let date
    const formatDate = (date, format) => {
        if (!format) return date.toISOString()
        
        try {
            const months = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ]
            const monthsAbbr = months.map(m => m.substring(0, 3))
            
            const days = [
                'Sunday', 'Monday', 'Tuesday', 'Wednesday',
                'Thursday', 'Friday', 'Saturday'
            ]
            const daysAbbr = days.map(d => d.substring(0, 3))
            
            // Create a map of replacements with word boundaries
            const replacements = [
                ['\\bMonth\\b', months[date.getMonth()]],
                ['\\bMon\\b', monthsAbbr[date.getMonth()]],
                ['\\bDOW\\b', days[date.getDay()]],
                ['\\bdow\\b', daysAbbr[date.getDay()]],
                ['yyyy', date.getFullYear()],
                ['MM', String(date.getMonth() + 1).padStart(2, '0')],
                ['\\bM\\b', String(date.getMonth() + 1)],
                ['dd', String(date.getDate()).padStart(2, '0')],
                ['\\bd\\b', String(date.getDate())],
                ['HH', String(date.getHours()).padStart(2, '0')],
                ['\\bH\\b', String(date.getHours())],
                ['mm', String(date.getMinutes()).padStart(2, '0')],
                ['\\bm\\b', String(date.getMinutes())],
                ['ss', String(date.getSeconds()).padStart(2, '0')],
                ['\\bs\\b', String(date.getSeconds())]
            ]
            
            // Apply replacements in order
            let result = format
            for (const [pattern, replacement] of replacements) {
                result = result.replace(new RegExp(pattern, 'gi'), replacement)
            }
            
            return result
        } catch (err) {
            console.error('Date formatting error:', err)
            return date.toISOString()
        }
    }

    try {
        if (format && format.includes(',')) {
            // Handle date range
            const [rangeStr, ...formatParts] = format.split('|')
            const [min, max] = rangeStr.split(',')
            
            const parseDate = (dateStr) => {
                if (!dateStr) return undefined
                const [dd, mm, yyyy] = dateStr.split('-').map(Number)
                return new Date(yyyy, mm - 1, dd)
            }

            const minDate = parseDate(min)
            const maxDate = parseDate(max)
            
            date = faker.date.between({ 
                from: minDate || new Date('1950-01-01'),
                to: maxDate || new Date()
            })

            return formatDate(date, formatParts.join('|'))
        } else {
            date = faker.date.recent()
            return formatDate(date, format)
        }
    } catch (err) {
        console.error('Date generation error:', err)
        return new Date().toISOString()
    }
}

const generateLoremData = (format) => {
    if (format && format.includes(',')) {
        const [min, max] = format.split(',').map(Number)
        const wordCount = faker.number.int({ min, max })
        return faker.lorem.words(wordCount)
    } else {
        const wordCount = parseInt(format) || 7
        return faker.lorem.words(wordCount)
    }
}

const parseType = (value) => {
    // Handle format parameters like {phone|format} or {numberRange|1,100}
    const matches = value.match(/\{(\w+)(?:\|([^}]*))?\}/)
    if (!matches) return { type: value }
    
    return {
        type: matches[1],
        format: matches[2]
    }
}