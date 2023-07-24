export function getElemAtRandomIndex(arr) {
  if (arr.length <= 0) {
    throw new Error("Array length must be greater than 0");
  }
  const index = Math.floor(Math.random() * arr.length);

  return arr[index];
}
