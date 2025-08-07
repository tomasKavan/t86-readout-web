const mdmd = (value: string | Date): string => {
  if (!value) return '';
  const date = typeof value === 'string' ? new Date(value) : value;
  return new Intl.DateTimeFormat(navigator.language, {
    dateStyle: 'medium',
    timeStyle: 'medium',
  }).format(date);
}

const tels = (value: string | Date): string => {
  if (!value) return '';
  const date = typeof value === 'string' ? new Date(value) : value;
  return new Intl.DateTimeFormat(navigator.language, {
    dateStyle: undefined,
    timeStyle: 'medium',
  }).format(date);
}

export function useDTFormatter() {
  return {
    mdmd,
    tels
  }
}