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

// CRAP; don't use this, ever
// export function convertToTimeAMPM(timeString: string): string {
//   let formattedTime: string = '';
//   try {
//     const [hours, minutes] = timeString.split(':').map(Number);
//     if (hours >= 12) {
//       formattedTime = `${hours === 12 ? 12 : hours - 12}:${minutes.toString().padStart(2, '0')} PM`;
//     } else {
//       formattedTime = `${hours === 0 ? 12 : hours}:${minutes.toString().padStart(2, '0')} AM`;
//     }
//   }
//   catch (err) {

//   }
//   return formattedTime;
// }

export function getLocal(date?: Date): string {
  return (date ?? new Date()).toLocaleString(navigator.language);
}

export function getLocalTime(date?: Date): string {
  return (date ?? new Date()).toLocaleTimeString(navigator.language);
}

export function getLocalDate(date?: Date): string {
  return (date ?? new Date()).toLocaleDateString(navigator.language);
}

export function getAmPm(): boolean {
  const timeAmPm = getLocalTime().toLowerCase().indexOf('am') !== -1 || getLocalTime().toLowerCase().indexOf('pm') !== -1;
  return timeAmPm;
}