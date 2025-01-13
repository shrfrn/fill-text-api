# Mock Data Generation API Documentation (RIP FillText.com)

This API allows you to generate mock data based on various parameters.

## Query Parameters
All parameters are case insensitive.

### General Parameters

| Parameter | Description | Default | Example | Demo |
|-----------|-------------|---------|---------|------|
| rows | Number of records to generate (1-1000) | 10 | `rows=10` | [Try it!](/api?rows=10) |

### Data Types

#### Personal Information
| Type | Description | Example | Output | Demo |
|------|-------------|---------|---------|------|
| {firstName} | Random first name | `name={firstName}` | `"John"` | [Try it!](/api?name={firstName}) |
| {middleName} | Random middle name | `middle={middleName}` | `"Robert"` | [Try it!](/api?middle={middleName}) |
| {middleName\|initial} | Middle initial | `middle={middleName\|initial}` | `"R."` | [Try it!](/api?middle={middleName\|initial}) |
| {lastName} | Random last name | `lname={lastName}` | `"Smith"` | [Try it!](/api?lname={lastName}) |
| {title} | Full title | `title={title}` | `"Professor"` | [Try it!](/api?title={title}) |
| {title\|abbr} | Abbreviated title | `title={title\|abbr}` | `"Prof."` | [Try it!](/api?title={title\|abbr}) |
| {fullName} | Full name | `name={fullName}` | `"John Smith"` | [Try it!](/api?name={fullName}) |
| {fullName\|title} | Full name with title | `name={fullName\|title}` | `"Mr. John Smith"` | [Try it!](/api?name={fullName\|title}) |
| {fullName\|middle} | Name with middle name | `name={fullName\|middle}` | `"John Robert Smith"` | [Try it!](/api?name={fullName\|middle}) |
| {fullName\|title,middle} | Complete name | `name={fullName\|title,middle}` | `"Dr. John Robert Smith"` | [Try it!](/api?name={fullName\|title,middle}) |
| {fullName\|title,middle,initial} | With middle initial | `name={fullName\|title,middle,initial}` | `"Dr. John R. Smith"` | [Try it!](/api?name={fullName\|title,middle,initial}) |
| {email} | Random email address | `email={email}` | `"john.doe@example.com"` | [Try it!](/api?email={email}) |
| {username} | Random username | `username={username}` | `"johnsmith123"` | [Try it!](/api?username={username}) |
| {password} | Random password | `password={password}` | `"aX9#mK2$p"` | [Try it!](/api?password={password}) |

#### Contact Information
| Type | Description | Example | Output | Demo |
|------|-------------|---------|---------|------|
| {phone} | 10-digit phone number | `phone={phone}` | `"5551234567"` | [Try it!](/api?phone={phone}) |
| {phone\|area} | 2 or 3 digit area code | `phone={phone\|area}` | `"(555)-123-4567" or (55)-123-45678` | [Try it!](/api?phone={phone\|area}) |
| {phone\|area2} | 2 digit area code | `phone={phone\|area2}` | `"(55)-123-45678"` | [Try it!](/api?phone={phone\|area2}) |
| {phone\|area3} | 3 digit area code | `phone={phone\|area3}` | `"(555)-123-4567"` | [Try it!](/api?phone={phone\|area3}) |
| {phone\|country} | 1 - 3 digit country code | `phone={phone\|country}` | `"+91-(555)-123-4567"` | [Try it!](/api?phone={phone\|country}) |
| {phone\|country, area2} | country code & area code | `phone={phone\|country, area2}` | `"+91-(55)-123-4567"` | [Try it!](/api?phone={phone\|country,area2}) |
| {phone\|country, area2, n} | country & area codes. n digits total | `phone={phone\|country, area2, 12}` | `"+91-(55)-123-4567890"` | [Try it!](/api?phone={phone\|country,area2,12}) |

#### Location
| Type | Description | Example | Output | Demo |
|------|-------------|---------|---------|------|
| {streetAddress} | Street address | `address={streetAddress}` | `"123 Main St"` | [Try it!](/api?address={streetAddress}) |
| {city} | City name | `city={city}` | `"Chicago"` | [Try it!](/api?city={city}) |
| {zip} | ZIP code | `zip={zip}` | `"60601"` | [Try it!](/api?zip={zip}) |
| {usState} | Full state name | `state={usState}` | `"Illinois"` | [Try it!](/api?state={usState}) |
| {usState\|abbr} | State abbreviation | `state={usState\|abbr}` | `"IL"` | [Try it!](/api?state={usState\|abbr}) |
| {country} | Country name | `country={country}` | `"United States"` | [Try it!](/api?country={country}) |
| {country\|abbr2} | 2-letter country code | `country={country\|abbr2}` | `"US"` | [Try it!](/api?country={country\|abbr2}) |
| {addressObject} | Complete address object | `address={addressObject}` | `{"streetAddress": "123 Main St", "city": "Chicago", "state": "IL", "zip": "60601"}` | [Try it!](/api?address={addressObject}) |

#### Business
| Type | Description | Example | Output | Demo |
|------|-------------|---------|---------|------|
| {business} | Company name | `company={business}` | `"Acme Corporation"` | [Try it!](/api?company={business}) |

#### Payment Information
| Type | Description | Example | Output | Demo |
|------|-------------|---------|---------|------|
| {ccType} | Credit card provider | `cardType={ccType}` | `"Visa"` | [Try it!](/api?cardType={ccType}) |
| {ccType\|abbr} | Credit card provider abbreviation | `cardType={ccType\|abbr}` | `"VISA"` | [Try it!](/api?cardType={ccType\|abbr}) |
| {ccNumber} | Credit card number | `cardNumber={ccNumber}` | `"4532123456789012"` | [Try it!](/api?cardNumber={ccNumber}) |

#### Numbers and IDs
| Type | Description | Example | Output | Demo |
|------|-------------|---------|---------|------|
| {index} | Sequential number (0-based) | `id={index}` | `0` | [Try it!](/api?id={index}) |
| {index\|n} | Sequential number starting from n | `id={index\|1}` | `1` | [Try it!](/api?id={index\|1}) |
| {numberRange\|min,max} | Random number in range | `amount={numberRange\|1,100}` | `42` | [Try it!](/api?amount={numberRange\|1,100}) |
| {numberLength\|n} | Random number with n digits | `code={numberLength\|6}` | `"123456"` | [Try it!](/api?code={numberLength\|6}) |

#### Dates and Strings
| Type | Description | Example | Output | Demo |
|------|-------------|---------|---------|------|
| {date} | ISO formatted date | `date={date}` | `"2024-02-15T10:30:00.000Z"` | [Try it!](/api?date={date}) |
| {date\|format} | Custom formatted date | `date={date\|MM/dd/yyyy}` | `"03/21/2024"` | [Try it!](/api?date={date\|MM/dd/yyyy}) |
| {date\|min,max} | Date within range | `dob={date\|01-01-1980,31-12-1999}` | `"1992-06-15T..."` | [Try it!](/api?dob={date\|01-01-1980,31-12-1999}) |
| {date\|min,max\|format} | Formatted date in range | `dob={date\|01-01-1980,31-12-1999\|MM/dd/yyyy}` | `"06/15/1992"` | [Try it!](/api?dob={date\|01-01-1980,31-12-1999\|MM/dd/yyyy}) |

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
| Month | Full month name | "March" |
| Mon | Month abbreviation | "Mar" |
| dd | Two-digit day (01-31) | "09" |
| d | Single-digit day (1-31) | "9" |
| DOW | Full day of week | "Tuesday" |
| dow | Day of week abbreviation | "Tue" |
| HH | Two-digit hour (00-23) | "14" |
| H | Single-digit hour (0-23) | "14" |
| mm | Two-digit minutes (00-59) | "05" |
| m | Single-digit minutes (0-59) | "5" |
| ss | Two-digit seconds (00-59) | "09" |
| s | Single-digit seconds (0-59) | "9" |

Common format examples:
- `date={date\|M/d/yyyy}` → "3/9/2024"
- `date={date\|dow, Mon d, yyyy}` → "Tue, Mar 9, 2024"
- `date={date\|DOW, Month d, yyyy}` → "Tuesday, March 9, 2024"
- `date={date\|yyyy-MM-dd HH:mm:ss}` → "2024-03-09 14:05:09"

#### Text Generation
| Type | Description | Example | Output | Demo |
|------|-------------|---------|---------|------|
| {string\|n} | Random string of length n (default 5) | `str={string\|10}` | `"aB3$kP9#mN"` | [Try it!](/api?str={string\|10}) |
| {lorem} | Generate 3 random words | `text={lorem}` | `"lorem ipsum dolor"` | [Try it!](/api?text={lorem}) |
| {lorem\|n} | Generate n random words | `text={lorem\|5}` | `"lorem ipsum dolor sit amet"` | [Try it!](/api?text={lorem\|5}) |
| {lorem\|min,max} | Generate random number of words | `text={lorem\|3,6}` | `"lorem ipsum dolor sit"` | [Try it!](/api?text={lorem\|3,6}) |

### Special Features

|  Description | Example | Demo |
|-----------------------|---------|------|
|  Use [square brackets] to randomly select from a list of options: | `dept=[HR,IT,Sales]` | [Try it!](/api?dept=[HR,IT,Sales]) |
|  Use ~ to concatinate options: | `id={firstName}~{index}` | [Try it!](/api?id={firstName}~{index}) |
|  Use `this.` to refer to previous values: | `name={firstName}&id={this.firstName}~{index}` | [Try it!](/api?name={firstName}&id={this.name}~{index}) |


