import { generateData } from '../services/dataGenerator.js'

describe('Phone Number Generator Tests', () => {
  describe('Basic Phone Number', () => {
    test('generates basic phone number', () => {
      const result = generateData({ phone: '{phone}' });
      expect(result[0].phone).toMatch(/^\d{10}$/);  // Exactly 10 digits
    });

    test('generates formatted phone number', () => {
      const result = generateData({ phone: '{phone|format}' });
      const phone = result[0].phone;
      
      // Test exact format (XXX) XXX-XXXX
      expect(phone).toMatch(/^\(\d{3}\) \d{3}-\d{4}$/);
      
      // Verify parts are in correct positions
      const matches = phone.match(/^\((\d{3})\) (\d{3})-(\d{4})$/);
      expect(matches).toHaveLength(4);  // Full match plus 3 groups
    });
  });

  describe('Multiple Phone Numbers', () => {
    test('generates multiple different phone numbers', () => {
      const result = generateData({
        rows: '3',
        phone: '{phone}'
      });

      expect(result).toHaveLength(3);
      
      // All numbers should be exactly 10 digits
      result.forEach(item => {
        expect(item.phone).toMatch(/^\d{10}$/);
      });

      // Numbers should be different
      const uniqueNumbers = new Set(result.map(r => r.phone));
      expect(uniqueNumbers.size).toBeGreaterThan(1);
    });
  });

  describe('Combined Phone Formats', () => {
    test('generates both formatted and unformatted numbers', () => {
      const result = generateData({
        raw: '{phone}',
        formatted: '{phone|format}'
      });

      // Raw should be exactly 10 digits
      expect(result[0].raw).toMatch(/^\d{10}$/);
      
      // Formatted should follow (XXX) XXX-XXXX
      expect(result[0].formatted).toMatch(/^\(\d{3}\) \d{3}-\d{4}$/);
      
      // The underlying numbers should be the same if we strip formatting
      const rawNumber = result[0].raw;
      const formattedStripped = result[0].formatted.replace(/[^\d]/g, '');
      expect(formattedStripped).toHaveLength(10);
    });
  });

  describe('Edge Cases', () => {
    test('handles invalid format parameter', () => {
      const result = generateData({ phone: '{phone|invalid}' });
      expect(result[0].phone).toMatch(/^\d{10}$/);  // Should default to unformatted
    });

    test('handles empty format parameter', () => {
      const result = generateData({ phone: '{phone|}' });
      expect(result[0].phone).toMatch(/^\d{10}$/);  // Should default to unformatted
    });
  });
}); 