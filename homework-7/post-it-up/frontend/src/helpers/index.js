export function findAverageRate(arr) {
  return arr.map((item) => {
    const rate =
      item.comments.reduce((acc, comment) => acc + comment.rating, 0) /
      item.comments.length;
    return {
      id: item.id,
      title: item.title,
      comments: item.comments,
      rate: Math.round(rate * 100) / 100,
      face: rate > 4 ? "\u{1F600}" : "\u{1F614}",
      disabled: false,
    };
  });
}

export function getElemAtRandomIndex(arr) {
  if (arr.length <= 0) {
    throw new Error("Array length must be greater than 0");
  }
  const index = Math.floor(Math.random() * arr.length);

  return arr[index];
}

export function sortObjectsByKey(arr, key, ascending = true) {
  const copyArr = [...arr];
  if (ascending) {
    return copyArr.sort((a, b) => a[key] - b[key]);
  }

  return copyArr.sort((a, b) => b[key] - a[key]);
}
