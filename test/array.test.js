import { generateData } from '../services/dataGenerator.js'

describe('Array Value Generation Tests', () => {
    test('generates a value from a simple array', () => {
        const result = generateData({ department: '[HR,IT,Sales,Marketing]' });
        const validValues = ['HR', 'IT', 'Sales', 'Marketing'];
        expect(validValues).toContain(result[0].department);
    });

    test('generates a value from an array with spaces', () => {
        const result = generateData({ category: '[Tech, Home, Garden, Books]' });
        const validValues = ['Tech', 'Home', 'Garden', 'Books'];
        expect(validValues).toContain(result[0].category);
    });

    test('generates a value from an array with special characters', () => {
        const result = generateData({ item: '[item-1,item_2,item\'3,item"4]' });
        const validValues = ['item-1', 'item_2', 'item\'3', 'item"4'];
        expect(validValues).toContain(result[0].item);
    });

    test('generates different values from an array', () => {
        const result = generateData({
            rows: 10,
            department: '[HR,IT,Sales,Marketing]'
        });
        const uniqueDepartments = new Set(result.map(r => r.department));
        expect(uniqueDepartments.size).toBeGreaterThan(1);
    });

    //  test('handles empty array gracefully', () => {
    //     const result = generateData({ value: '[]' });
    //     expect(result[0].value).toBeUndefined();
    // });

    test('handles array with single value', () => {
        const result = generateData({ value: '[single]' });
        expect(result[0].value).toBe('single');
    });

    test('handles array with numbers', () => {
        const result = generateData({ number: '[1,2,3,4]' });
        const validValues = ['1', '2', '3', '4'];
        expect(validValues).toContain(result[0].number);
    });

    test('handles array with mixed types', () => {
        const result = generateData({ mixed: '[1,string,true,null]' });
         const validValues = ['1', 'string', 'true', 'null'];
        expect(validValues).toContain(result[0].mixed);
    });
}); 