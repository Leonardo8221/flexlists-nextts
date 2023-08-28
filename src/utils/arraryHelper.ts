export function getDistinctObjects<T, K extends keyof T>(objects: T[], property: K): T[] {
    const distinctValues = new Set(objects.map(object => object[property]));
    const distinctObjects = Array.from(distinctValues).map(value => {
      const matchingObject = objects.find(object => object[property] === value);
      return matchingObject as T;
    });
    return distinctObjects;
  }