 ## Query Parameters

### General Parameters

| Parameter | Description | Default | Example |
|-----------|-------------|---------|---------|
| rows | Number of records to generate (1-1000) | 10 | `rows=10` |

### Data Types

#### Personal Information
| Type | Description | Example | Output |
|------|-------------|---------|---------|
| {firstName} | Random first name | `name={firstName}` | `"John"` |
| {lastName} | Random last name | `lname={lastName}` | `"Smith"` |
| {email} | Random email address | `email={email}` | `"john.doe@example.com"` |
| {username} | Random username | `username={username}` | `"johnsmith123"` |
| {password} | Random password | `password={password}` | `"aX9#mK2$p"` |

#### Contact Information
| Type | Description | Example | Output |
|------|-------------|---------|---------|
| {phone} | 10-digit phone number | `phone={phone}` | `"5551234567"` |
| {phone\|format} | Formatted phone number | `phone={phone\|format}` | `"(555) 123-4567"` |

#### Location
| Type | Description | Example | Output |
|------|-------------|---------|---------|
| {streetAddress} | Street address | `address={streetAddress}` | `"123 Main St"` |
| {city} | City name | `city={city}` | `"Chicago"` |
| {zip} | ZIP code | `zip={zip}` | `"60601"` |
| {usState} | Full state name | `state={usState}` | `"Illinois"` |
| {usState\|abbr} | State abbreviation | `state={usState\|abbr}` | `"IL"` |
| {country} | Country name | `country={country}` | `"United States"` |
| {country\|abbr2} | 2-letter country code | `country={country\|abbr2}` | `"US"` |
| {addressObject} | Complete address object | `address={addressObject}` | `{"streetAddress": "123 Main St", "city": "Chicago", "state": "IL", "zip": "60601"}` |

#### Business
| Type | Description | Example | Output |
|------|-------------|---------|---------|
| {business} | Company name | `company={business}` | `"Acme Corporation"` |

#### Payment Information
| Type | Description | Example | Output |
|------|-------------|---------|---------|
| {ccType} | Credit card provider | `cardType={ccType}` | `"Visa"` |
| {ccType\|abbr} | Credit card provider abbreviation | `cardType={ccType\|abbr}` | `"VISA"` |
| {ccNumber} | Credit card number | `cardNumber={ccNumber}` | `"4532123456789012"` |

#### Numbers and IDs
| Type | Description | Example | Output |
|------|-------------|---------|---------|
| {index} | Sequential number (1-based) | `id={index}` | `1` |
| {numberRange\|min,max} | Random number in range | `amount={numberRange\|1,100}` | `42` |
| {numberLength\|n} | Random number with n digits | `code={numberLength\|6}` | `"123456"` |

#### Dates and Strings
| Type | Description | Example | Output |
|------|-------------|---------|---------|
| {date} | ISO formatted date | `date={date}` | `"2024-02-15T10:30:00.000Z"` |
| {date\|format} | Custom formatted date | `date={date\|MM/dd/yyyy}` | `"03/21/2024"` |
| {date\|min,max} | Date within range | `dob={date\|01-01-1980,31-12-1999}` | `"1992-06-15T..."` |
| {date\|min,max\|format} | Formatted date in range | `dob={date\|01-01-1980,31-12-1999\|MM/dd/yyyy}` | `"06/15/1992"` |
| {string\|n} | Random string of length n | `str={string\|10}` | `"aB3$kP9#mN"` |

##### Date Range Format
- Date range uses `dd-mm-yyyy` format for min and max dates
- Either min or max can be omitted: `date={date|,31-12-1999}` or `date={date|01-01-1980,}`
- Can be combined with date formatting: `date={date|01-01-1980,31-12-1999|yyyy-MM-dd}`

##### Date Format Patterns
| Pattern | Description | Example Output |
|---------|-------------|----------------|
| yyyy | Four-digit year | "2024" |
| MM | Two-digit month (01-12) | "03" |
| M | Single-digit month (1-12) | "3" |
| dd | Two-digit day (01-31) | "09" |
| d | Single-digit day (1-31) | "9" |
| HH | Two-digit hour (00-23) | "14" |
| H | Single-digit hour (0-23) | "14" |
| mm | Two-digit minutes (00-59) | "05" |
| m | Single-digit minutes (0-59) | "5" |
| ss | Two-digit seconds (00-59) | "09" |
| s | Single-digit seconds (0-59) | "9" |

Common format examples:
- `date={date\|M/d/yyyy}` → "3/9/2024"
- `date={date\|MM/dd/yyyy}` → "03/09/2024"
- `date={date\|d.M.yyyy H:m}` → "9.3.2024 14:5"
- `date={date\|yyyy-MM-dd HH:mm:ss}` → "2024-03-09 14:05:09"

### Special Features

#### Array Selection
Use square brackets to randomly select from a list of options: 