export function formatReference(sequence: number): string {
  if (!Number.isSafeInteger(sequence) || sequence < 1001) throw new RangeError("Invalid enquiry sequence");
  return `KX-${sequence}`;
}
