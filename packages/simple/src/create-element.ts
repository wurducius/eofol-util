import { Attributes, Classname, EofolNode, Properties } from "./types";
import { generateId } from "@eofol-utils/crypto";
import { domAppendChildren } from "@eofol-utils/dom";

export const e = (
  tagName: string,
  className?: Classname,
  children?: EofolNode,
  attributes?: Attributes,
  properties?: Properties,
) => {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  const attributesImpl = attributes ?? {};
  if (!attributesImpl["id"]) {
    attributesImpl["id"] = generateId();
  }
  Object.keys(attributesImpl).forEach((attributeName) => {
    const attributeValue = attributesImpl[attributeName];
    if (attributeValue) {
      element.setAttribute(attributeName, attributeValue);
    }
  });
  if (properties) {
    Object.keys(properties).forEach((propertyName) => {
      const propertyValue = properties[propertyName];
      if (propertyValue) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        element[propertyName] = propertyValue;
      }
    });
  }
  const childrenImplRaw = Array.isArray(children) ? children : [children];
  const childrenImpl = childrenImplRaw.filter(Boolean);
  if (childrenImpl.length > 0) {
    domAppendChildren(childrenImpl, element);
  }
  return element;
};
