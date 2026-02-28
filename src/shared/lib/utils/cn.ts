type ClassDictionary = Record<string, boolean | null | undefined>;
type ClassArray = ClassValue[];
type ClassPrimitive = string | number | null | undefined | false;

export type ClassValue = ClassDictionary | ClassArray | ClassPrimitive;

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];
  const process = (input: ClassValue): void => {
    if (!input) return;
    if (typeof input === 'string' || typeof input === 'number') {
      classes.push(String(input));
      return;
    }

    if (Array.isArray(input)) {
      input.forEach(process);
      return;
    }

    for (const key in input) {
      if (input[key]) {
        classes.push(key);
      }
    }
  };

  inputs.forEach(process);

  return classes.join(' ');
}
