import React from "react";

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
  // if (typeof value === "string") {
  //   return parseInt(value);
  // } else if (Array.isArray(value)) {
  //   return parseInt(value.join(""));
  // } else {
  //   return 0;
  // }
  let x = 0
  if (Array.isArray(value)) {
    x = parseInt(value.join(""));
  } else {
    x = parseInt(value as any);
  }
  return isNaN(x) ? 0 : x;
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
export function b64toBlob(b64Data: string, contentType = '', sliceSize = 512) {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

export const renderHTML = (rawHTML?: string) => React.createElement("span", { dangerouslySetInnerHTML: { __html: rawHTML } });

const useBrowserLanguage = true
export function getLocalTime(date?: Date): string {
  return (date ?? new Date()).toLocaleTimeString(useBrowserLanguage ? navigator.language : undefined);
}

export function getLocalDate(date?: Date): string {
  return (date ?? new Date()).toLocaleDateString(useBrowserLanguage ? navigator.language : undefined);
}

export function getLocalDateTime(date?: Date): string {
  return (date ?? new Date()).toLocaleString(useBrowserLanguage ? navigator.language : undefined);
}

export function getAmPm(): boolean {
  const time = getLocalTime().toLowerCase();
  const timeAmPm = time.includes('am')||time.includes('a.m') || time.includes('pm')|| time.includes('p.m');
  return timeAmPm;
}

export function getDateFromTimeString(time: string): Date {
  return new Date(time);
}

export function getLocalTimeFromString(time: string): string {
  return getLocalTime(getDateFromTimeString(time));
}

export function getLocalDateFromString(date: string): string {
  return getLocalDate(new Date(date));
}

export function getLocalDateTimeFromString(dateTime: string): string {
  return getLocalDateTime(new Date(dateTime))
}

export function getDifferneceWithCurrent(dateTime: string): string {
  const diff = Math.abs((new Date()).getTime() - (new Date(dateTime)).getTime());
  let seconds = Math.floor(Math.abs(diff) / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  hours = hours - (days * 24);
  minutes = minutes - (days * 24 * 60) - (hours * 60);
  seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

  if ((new Date()).getTime() - (new Date(dateTime)).getTime() > 0) {
    if (days > 365) return `2 years ago`;
    else if (days > 30) return `5 months ago`;
    else if (days > 7) return `3 weeks ago`;
    else if (days > 0) return `4 days ago`;
    else if (hours > 0) return `20 hours ago`;
    else if (minutes > 0) return `30 minutes ago`;
    else return `30 seconds ago`;
  } else {
    const str = `${days > 365 ? days % 365 + ' year' + (days % 365 > 1 ? 's' : '') + '-' : ''}${days > 30 ? days % 30 + ' month' + (days % 30 > 1 ? 's' : '') + '-' : ''}${days > 0 ? days + ' day' + (days > 1 ? 's' : '') + '-' : ''}${hours > 0 ? hours + ' hour' + (hours > 1 ? 's' : '') + '-' : ''}${minutes > 0 ? minutes + ' minute' + (minutes > 1 ? 's' : '') + '-' : ''}${seconds > 0 ? seconds + ' seconds' : ''}`;

    return `in ${str.split('-')[0]}`;
  }
}

export function getDateFormatString(locale = 'en-US') {
  const formatObj = new Intl.DateTimeFormat(locale).formatToParts(new Date());
  return formatObj
    .map(obj => {
      switch (obj.type) {
        case "day":
          return "DD";
        case "month":
          return "MM";
        case "year":
          return "YYYY";
        default:
          return obj.value;
      }
    })
    .join("");
}
