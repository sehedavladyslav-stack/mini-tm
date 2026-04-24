import type { FormattedDateString, ISODateString } from '@/shared/types';

export function createISODateString(value: string | number | Date): ISODateString {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid ISO date string');
  }

  return date.toISOString() as ISODateString;
}

export function formatDate(value: ISODateString | number | string | Date): FormattedDateString {
  const date = value instanceof Date ? value : new Date(value);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours() > 9 ? date.getHours() : date.getHours().toString().padStart(2, '0');

  const minutes =
    date.getMinutes() > 9 ? date.getMinutes() : date.getMinutes().toString().padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}` as FormattedDateString;
}
