export function swap(i: number, j: number, array: number[]) {
  const tempHolder: number = array[j];
  array[j] = array[i];
  array[i] = tempHolder;
}