function renderTriangle(size) {
  const space = " ";
  const starSpace = " *";
  let triangleString = "";
  for (let i = 0; i < size; i++) {
    triangleString +=
      space.repeat(size - i - 1) + starSpace.repeat(i + 1) + "\n";
  }
  return triangleString;
}

function rotateTriangle(size) {
  const space = " ";
  const starSpace = " *";
  let reversedTriangleString = "";

  for (let i = size; i > 0; i--) {
    reversedTriangleString +=
      space.repeat(size - i) + starSpace.repeat(i) + "\n";
  }

  return reversedTriangleString;
}

const inputNode = document.getElementById("triangle-length-input");
const rotateButtonNode = document.getElementById("rotate-btn");

const preNode = document.getElementById("equal-triangle");
const reversedPreNode = document.getElementById("rotated-triangle");

inputNode.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    reversedPreNode.innerText = "";
    preNode.innerText = renderTriangle(inputNode.value);
    rotateButtonNode.style.visibility = "visible";
  }
});

rotateButtonNode.addEventListener("click", () => {
  reversedPreNode.innerText = rotateTriangle(inputNode.value);
});
