export const appendChild = (target, child) => {
  if (child) {
    if (typeof child === "string") {
      target.insertAdjacentHTML("beforeend", child);
    } else {
      target.appendChild(child);
    }
  }
};

export const domAppendChildren = (children, target) => {
  children.forEach((child) => {
    appendChild(target, child);
  });
};

export const domClearChildren = (domElement) => {
  const childrenToDelete = [];
  for (let i = 0; i < domElement.childNodes.length; i++) {
    childrenToDelete.push(domElement.childNodes.item(i));
  }
  childrenToDelete.forEach((childToDelete) => {
    if (childToDelete) {
      domElement.removeChild(childToDelete);
    }
  });
};

export const nodeMapToObject = (attributeNodeMap) => {
  return Array.from(attributeNodeMap)
    .map((a) => [a.name, a.value])
    .reduce((acc, attr) => {
      // @ts-ignore
      acc[attr[0]] = attr[1];
      return acc;
    }, {});
};

export const htmlElementIndexOf = (element) => {
  let index = -1;
  while (element) {
    element = element.previousSibling;
    if (element.nodeType === 1) {
      index++;
    }
  }
  return index;
};
