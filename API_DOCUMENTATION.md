## Query Parameters

### General Parameters

| Parameter |  optionsDescription | Default | Example |
|-----------|-------------|---------|---------|
| rows | Number of records to generate (1-1000) | 10 | `rows=10` |

### Data Types

#### Personal Information
| Type | Description | Example | Output |
|------|-------------|---------|---------|
| {firstName} | Random first name | `name={firstName}` | `"John"` |
| {middleName} | Random middle name | `middle={middleName}` | `"Robert"` |
| {middleName\|initial} | Middle initial | `middle={middleName\|initial}` | `"R."` |
| {lastName} | Random last name | `lname={lastName}` | `"Smith"` |
| {title} | Full title | `title={title}` | `"Professor"` |
| {title\|abbr} | Abbreviated title | `title={title\|abbr}` | `"Prof."` |
| {fullName} | Full name | `name={fullName}` | `"John Smith"` |
| {fullName\|title} | Full name with title | `name={fullName\|title}` | `"Mr. John Smith"` |
| {fullName\|middle} | Name with middle name | `name={fullName\|middle}` | `"John Robert Smith"` |
| {fullName\|title,middle} | Complete name | `name={fullName\|title,middle}` | `"Dr. John Robert Smith"` |
| {fullName\|title,middle,initial} | With middle initial | `name={fullName\|title,middle,initial}` | `"Dr. John R. Smith"` |
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
| {string\|n} | Random string of length n | `str={string\|10}` | `"aB3$kP9#mN"` |

##### Date Format Patterns
| Pattern | Description | Example Output |
|---------|-------------|----------------|
| yyyy | Four-digit year | "2024" |
| MM | Two-digit month | "03" |
| dd | Two-digit day | "21" |
| HH | Two-digit hour (24-hour) | "14" |
| mm | Two-digit minutes | "30" |
| ss | Two-digit seconds | "45" |

Common format examples:
- `date={date\|MM/dd/yyyy}` → "03/21/2024"
- `date={date\|yyyy-MM-dd}` → "2024-03-21"
- `date={date\|dd.MM.yyyy HH:mm}` → "21.03.2024 14:30"
- `date={date\|yyyy-MM-dd HH:mm:ss}` → "2024-03-21 14:30:45"

### Special Features

#### Array Selection
Use square brackets to randomly select from a list of options: 