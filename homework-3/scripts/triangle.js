const DELIMITER = " ";
const SYMBOL = "*";

function renderTriangle(size, delimiter, symbol) {
  const sign = delimiter + symbol;
  let triangleString = "";
  for (let i = 0; i < size; i++) {
    triangleString +=
      delimiter.repeat(size - i - 1) + sign.repeat(i + 1) + "\n";
  }
  return triangleString;
}

function rotateTriangle(size, delimiter, symbol) {
  const sign = delimiter + symbol;
  let reversedTriangleString = "";

  for (let i = size; i > 0; i--) {
    reversedTriangleString +=
      delimiter.repeat(size - i) + sign.repeat(i) + "\n";
  }

  return reversedTriangleString;
}

const inputNode = document.getElementById("triangle-length-input");
const rotateButtonNode = document.getElementById("rotate-btn");

const validationNode = document.getElementById("validation");
const preNode = document.getElementById("equal-triangle");
const reversedPreNode = document.getElementById("rotated-triangle");

inputNode.addEventListener("keypress", (e) => {
  validationNode.innerText = "";
  if (e.key === "Enter") {
    e.preventDefault();
    reversedPreNode.innerText = "";
    const size = +e.target.value;
    if (size <= 0 || size !== Math.floor(size)) {
      rotateButtonNode.style.visibility = "hidden";
      preNode.innerText = "";
      validationNode.innerText = "Length can only be positive integer";
    } else {
      try {
        preNode.innerText = renderTriangle(size, DELIMITER, SYMBOL);
        rotateButtonNode.style.visibility = "visible";
      } catch (err) {
        validationNode.innerText = err.message;
      }
    }
  }
});

rotateButtonNode.addEventListener("click", () => {
  reversedPreNode.innerText = rotateTriangle(
    inputNode.value,
    DELIMITER,
    SYMBOL
  );
});
