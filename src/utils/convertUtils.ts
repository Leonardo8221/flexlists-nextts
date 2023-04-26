export function convertToString(value: string | string[] | undefined, separator: string = ","): string {
    if (typeof value === "string") {
      return value;
    } else if (Array.isArray(value)) {
      return value.join(separator);
    } else {
      return "";
    }
}
export function convertToBoolean(value: string | string[] | undefined): boolean {
    if (typeof value === "string") {
      return Boolean(value);
    } else if (Array.isArray(value)) {
      return Boolean(value.length);
    } else {
      return false;
    }
}
export function convertToInteger(value: string | string[] | undefined): number {
    if (typeof value === "string") {
      return parseInt(value);
    } else if (Array.isArray(value)) {
      return parseInt(value.join(""));
    } else {
      return 0;
    }
}
export function convertToNumber(value: string | string[] | undefined): number {
    if (typeof value === "string") {
      return parseFloat(value);
    } else if (Array.isArray(value)) {
      return parseFloat(value.join(""));
    } else {
      return 0.0;
    }
  }
export function convertToDatetime(value: string | string[] | undefined): Date | null {
    if (typeof value === "string") {
      const timestamp = Date.parse(value);
      if (!isNaN(timestamp)) {
        return new Date(timestamp);
      }
    } else if (Array.isArray(value)) {
      const timestamp = Date.parse(value.join(""));
      if (!isNaN(timestamp)) {
        return new Date(timestamp);
      }
    }
    return null;
  }
export function convertToArray(value: string | string[] | undefined): string[] {
    if (typeof value === "string") {
      return [value];
    } else if (Array.isArray(value)) {
      return Array.from(value);
    } else {
      return [];
    }
  }
export function convertToObject(value: string | string[] | undefined): object | null {
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch (error) {
        console.error(error);
        return null;
      }
    } else if (Array.isArray(value)) {
      try {
        return JSON.parse(value.join(""));
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    return null;
}