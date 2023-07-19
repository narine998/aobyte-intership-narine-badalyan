function sortObjectsByKey(arr, key, ascending = true) {
  const copyArr = [...arr];
  if (ascending) {
    return copyArr.sort((a, b) => a[key] - b[key]);
  }

  return copyArr.sort((a, b) => b[key] - a[key]);
}

export default sortObjectsByKey;
