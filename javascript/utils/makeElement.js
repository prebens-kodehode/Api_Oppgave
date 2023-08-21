export function makeElement(type = "div", props = {}) {
    const element = document.createElement(type)
    Object.entries(props).forEach(([key, value]) => element[key] = value) // Convert props object into an array, then destructure the array into key value pairs, and assign these properties to the elements
  
    return element 
  }