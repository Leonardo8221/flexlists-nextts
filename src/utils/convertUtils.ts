import React from "react";

export function convertToString(
  value: string | string[] | undefined,
  separator: string = ","
): string {
  if (typeof value === "string") {
    return value;
  } else if (Array.isArray(value)) {
    return value.join(separator);
  } else {
    return "";
  }
}
export function convertToBoolean(
  value: string | string[] | undefined
): boolean {
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
  let x = 0;
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
export function convertToDatetime(
  value: string | string[] | undefined
): Date | null {
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
export function convertToObject(
  value: string | string[] | undefined
): object | null {
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
export function b64toBlob(b64Data: string, contentType = "", sliceSize = 512) {
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

export const renderHTML = (rawHTML?: string) =>
  React.createElement("span", { dangerouslySetInnerHTML: { __html: rawHTML } });

const useBrowserLanguage = true;
export function getLocalTime(date?: Date): string {
  return (date ?? new Date()).toLocaleTimeString(
    useBrowserLanguage ? navigator.language : undefined
  );
}

export function getLocalDate(date?: Date): string {
  return (date ?? new Date()).toLocaleDateString(
    useBrowserLanguage ? navigator.language : undefined
  );
}

export function getLocalDateTime(date?: Date): string {
  return (date ?? new Date()).toLocaleString(
    useBrowserLanguage ? navigator.language : undefined
  );
}

export function getAmPm(): boolean {
  const time = getLocalTime().toLowerCase();
  const timeAmPm =
    time.includes("am") ||
    time.includes("a.m") ||
    time.includes("pm") ||
    time.includes("p.m");
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
  return getLocalDateTime(new Date(dateTime));
}

export function getDifferenceWithCurrent(dateTime: string): string {
  const diff = new Date().getTime() - new Date(dateTime).getTime();
  let seconds = Math.floor(Math.abs(diff) / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);

  if (days > 365) {
    const years = Math.floor(days / 365);
    return diff > 0 ? `${years} years ago` : `in ${years} years`;
  } else if (days > 30) {
    const months = Math.floor(days / 30);
    return diff > 0 ? `${months} months ago` : `in ${months} months`;
  } else if (days > 7) {
    const weeks = Math.floor(days / 7);
    return diff > 0 ? `${weeks} weeks ago` : `in ${weeks} weeks`;
  } else if (days > 0) {
    return diff > 0 ? `${days} days ago` : `in ${days} days`;
  } else if (hours > 0) {
    return diff > 0 ? `${hours} hours ago` : `in ${hours} hours`;
  } else if (minutes > 0) {
    return diff > 0 ? `${minutes} minutes ago` : `in ${minutes} minutes`;
  } else {
    return diff > 0 ? `${seconds} seconds ago` : `in ${seconds} seconds`;
  }
}

export function getDateFormatString(locale = "en-US") {
  const formatObj = new Intl.DateTimeFormat(locale).formatToParts(new Date());
  return formatObj
    .map((obj) => {
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
