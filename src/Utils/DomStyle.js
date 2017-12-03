export default class DomStyle {
  static getProperty(el, property) {
    return window.getComputedStyle(el, null).getPropertyValue(property);
  }
}