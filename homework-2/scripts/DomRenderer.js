/*
3. Implement DOM renderer:
    1. You must create el function, which has the following signature
    function el(type: string, attrs: object, children: DomElement | DomElement[])
    So basically it accepts the following:
    a. The type of the dom element to be created ('div', 'span', etc)
    b. An object with tag attributes (class, id, etc)
    c. Child elements. This one can be either DomElement (SpanElement for instance) or an array of DomElement.
    In case of an array, all elements in the array are siblings under same parent
    d. The el function should return a DomElement instance
    2. Create DomElement class, which must be a base class for all Elements
    3. Each class extending DomElement should implement draw method
    4. Each HTML tag must have a corresponding class extending DomElement. For instance a "div" tag should have
    DivElement class:
    class DivElement extends DomElement {
      draw(children) {
        // 1. Create div with
        // const div = document.createElement("DIV");
        // 2. Append children to div
        // 3. Return div
      }
    }
*/

class DomElement {
  constructor(attrs, children) {
    this.attributes = attrs;
    this.children = Array.isArray(children) ? children : [children];

    if (new.target === DomElement) {
      throw new Error("Can not instantiate base class.");
    }
  }

  draw(tagName) {
    const domElement = document.createElement(tagName);
    for (let attr in this.attributes) {
      domElement.setAttribute(attr, this.attributes[attr]);
    }

    this.children.forEach((child) => domElement.appendChild(child.draw()));

    return domElement;
  }
}

class DivElement extends DomElement {
  constructor(...args) {
    super(...args);
    this.tagName = "div";
  }

  draw() {
    return super.draw(this.tagName);
  }
}

class SpanElement extends DomElement {
  constructor(...args) {
    super(...args);
    this.tagName = "span";
  }

  draw() {
    return super.draw(this.tagName);
  }
}

class ParagraphElement extends DomElement {
  constructor(...args) {
    super(...args);
    this.tagName = "p";
  }

  draw() {
    return super.draw(this.tagName);
  }
}

class FormElement extends DomElement {
  constructor(...args) {
    super(...args);
    this.tagName = "form";
  }

  draw() {
    return super.draw(this.tagName);
  }
}

class InputElement extends DomElement {
  constructor(...args) {
    super(...args);
    this.tagName = "input";
  }

  draw() {
    return super.draw(this.tagName);
  }
}

class LabelElement extends DomElement {
  constructor(...args) {
    super(...args);
    this.tagName = "label";
  }

  draw() {
    return super.draw(this.tagName);
  }
}

class BrElement extends DomElement {
  constructor(...args) {
    super(...args);
    this.tagName = "br";
  }

  draw() {
    return super.draw(this.tagName);
  }
}

class ButtonElement extends DomElement {
  constructor(...args) {
    super(...args);
    this.tagName = "button";
  }

  draw() {
    return super.draw(this.tagName);
  }
}

class UlElement extends DomElement {
  constructor(...args) {
    super(...args);
    this.tagName = "ul";
  }

  draw() {
    return super.draw(this.tagName);
  }
}

class LiElement extends DomElement {
  constructor(...args) {
    super(...args);
    this.tagName = "li";
  }

  draw() {
    return super.draw(this.tagName);
  }
}

class AnchorElement extends DomElement {
  constructor(...args) {
    super(...args);
    this.tagName = "a";
  }

  draw() {
    return super.draw(this.tagName);
  }
}

class ImgElement extends DomElement {
  constructor(...args) {
    super(...args);
    this.tagName = "img";
  }

  draw() {
    return super.draw(this.tagName);
  }
}

class H1Element extends DomElement {
  constructor(...args) {
    super(...args);
    this.tagName = "h1";
  }

  draw() {
    return super.draw(this.tagName);
  }
}

class ChildElement extends DomElement {
  constructor(attrs, children) {
    super(attrs, children);
    this.text = children ?? "";
  }

  draw() {
    return document.createTextNode(this.text);
  }
}

const tagClasses = {
  div: DivElement,
  span: SpanElement,
  p: ParagraphElement,
  form: FormElement,
  input: InputElement,
  label: LabelElement,
  button: ButtonElement,
  br: BrElement,
  ul: UlElement,
  li: LiElement,
  a: AnchorElement,
  img: ImgElement,
  h1: H1Element,
};

function el(type, attrs, children) {
  if (tagClasses.hasOwnProperty(type)) {
    if (!(children instanceof DomElement) && !Array.isArray(children)) {
      children = new ChildElement(attrs, children);
    }
    return new tagClasses[type](attrs, children);
  } else {
    throw new Error(`Sorry. "${type}" tag not implemented`);
  }
}

// Test case 1.

let tree = el(
  "div",
  { class: "some_classname", id: "some_id" },
  el("span", {}, "hello")
);

document.getElementById("root").appendChild(tree.draw());

// //Renders:
/* <div id='root'>
    <div class="some_classname" id="some_id">
    <span>hello</span>
    </div>
</div> */

//Test case 2.
tree = el(
  "div",
  {},
  el("ul", {}, [
    el("li", {}, "Item 1"),
    el("li", {}, "Item 2"),
    el("li", {}, "Item 3"),
  ])
);
document.getElementById("root").appendChild(tree.draw());

// //Renders:
/* <div id='root'>
    <div>
    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
    </div>
</div> */

//Test case 3.
tree = el("form", { action: "/some_action" }, [
  el("label", { for: "name" }, "First name:"),
  el("br", {}, null),
  el(
    "input",
    { type: "text", id: "name", name: "name", value: "My name" },
    null
  ),
  el("br", {}, null),
  el("label", { for: "last_name" }, "Last name:"),
  el("br", {}, null),
  el(
    "input",
    {
      type: "text",
      id: "last_name",
      name: "last_name",
      value: "My second name",
    },
    null
  ),
  el("br", {}, null),
  el("input", { type: "submit", value: "Submit" }, null),
]);
document.getElementById("root").appendChild(tree.draw());
//Renders:
/* <div id='root'>
    <form action='/some_action'>
    <label for='name'>First name:</label><br>
    <input type="text" id="name" name="name" value="My name"><br>
    <label for='name'>Last name:</label><br>
    <input type="last_name" id="last_name" name="last_name" value="My second name"><br>
    <input type="submit" value="Submit">
    </div>
</div> */
