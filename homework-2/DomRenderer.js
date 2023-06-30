/* 3. Implement DOM renderer:
    1. You must create el function, which has the following signature
    function el(type: string, attrs: object, children: DomElement | DomElement[])
    So basically it accepts the following:
    a. The type of the dom element to be created ('div', 'span', etc)
    b. An object with tag attributes (class, id, etc)
    c. Child elements. This one can be either DomElement (SpanElement for instance) or an array of DomElement.
    In case of an array, all elements in the array are siblings under same parent
*/
