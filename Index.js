import { Library } from "./scriptes/Library.js";

const parent = document.querySelector('body');
const loader = '<div class="loader">load...</div>'

parent.innerHTML = loader;

window.onload = () => {
  document.querySelector('.loader').remove();
  libraryIn.start('start');
}
const libraryIn = new Library(parent);

export { libraryIn }


