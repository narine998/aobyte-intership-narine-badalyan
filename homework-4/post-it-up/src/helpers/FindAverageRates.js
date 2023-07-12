function findAverageRate(arr) {
  return arr.map((item) => {
    const rate =
      item.comments.reduce((acc, comment) => acc + comment.rating, 0) /
      item.comments.length;
    return {
      id: item.id,
      title: item.title,
      rate: Math.round(rate * 100) / 100,
      face: rate > 4 ? "\u{1F600}" : "\u{1F614}",
    };
  });
}

export default findAverageRate;
