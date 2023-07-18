function sortByRate(arr, ascending = true) {
  if (ascending) {
    return arr.sort((a, b) => a.rate - b.rate);
  }

  return arr.sort((a, b) => b.rate - a.rate);
}

export default sortByRate;
