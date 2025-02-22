export function transformNumber(number: number, format: string = '1.0-0'): string {
  const [minInt, minFraction, maxFraction] = format.split('-').join('.').split('.');
  const options: Intl.NumberFormatOptions = {
      minimumIntegerDigits: parseInt(minInt),
      minimumFractionDigits: parseInt(minFraction),
      maximumFractionDigits: maxFraction !== undefined ? parseInt(maxFraction) : parseInt(minFraction),
  };

  const formatter = new Intl.NumberFormat('en-US', options);

  return formatter.format(number);
}