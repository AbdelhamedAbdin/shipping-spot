export function ResetValues(input_value: any): number {
  let value = parseInt(input_value);

  if (value < 0) {
    return 0;
  }
  return value;
}
