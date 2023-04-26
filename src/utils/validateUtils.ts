export function isString(value: any): value is string  {
    return typeof value === 'string';
}
export function isBoolean(value: any): value is boolean {
    return typeof value === 'boolean';
}
export function isInteger(value: any): value is number {
    return Number.isInteger(value);
}
export function isFloat(value: any): value is number {
    return Number.isFinite(value) && !Number.isInteger(value);
}
export function isNumber(value: any): value is number {
    return typeof value === 'number' && !isNaN(value);
}
export function isDateTime(value: any): value is Date {
    return !isNaN(Date.parse(value));
}
export function isArray(value: any): value is any[] {
    return Array.isArray(value);
}
export function isObject(value: any): value is object {
    return typeof value === 'object' && value !== null;
}
  
  
  
  
  
  
  
