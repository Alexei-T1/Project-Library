import { deleteFromStorage } from "./ListBooks.js";
import { libraryIn } from '../Index.js';

// styles class list
const BOOK = 'book';
const BOOK_REMOVE = 'book_remove';
const BOOK_NAME = 'book__name';
const BOOK_AUTHOR = 'book__author';
const BOOK_PAGES = 'book__pages';
const BUTTON_REMOVE = 'button_remove';


export class Book {
  constructor(book) {
    console.log(book);
    this.bookEl = null;
    this.listBook = {};
    this.creatHTML(book);
    this.addHeandlers();
    this.bookData = book;
    this.key = null;
  }

    creatHTML(book) {
       // wrapper for book
      const wrapper = document.createElement('div');
      wrapper.classList.add(BOOK);
      // Elements of book
      const name = document.createElement('p');
      name.classList.add(BOOK_NAME);
      name.innerText = book.name.value;

      const author = document.createElement('p');
      author.classList.add(BOOK_AUTHOR);
      author.innerText = book.author.value;

      const pages = document.createElement('p');
      pages.classList.add(BOOK_PAGES);
      pages.innerText = book.pages.value;

      const removeButton = document.createElement('button');
      removeButton.classList.add(BUTTON_REMOVE);
      removeButton.innerText = 'remove';

      wrapper.append(name, author, pages, removeButton);

      this.bookEl = wrapper;
      Object.assign(this.listBook, { removeButton });
    }
    addHeandlers() {
      this.listBook.removeButton.addEventListener('click',this.remove.bind(this));
    }
    remove(ev) {
      this.bookEl.classList.add(BOOK_REMOVE);
      console.log(this, '  this')
      deleteFromStorage(this);
      setTimeout(()=> {
        this.bookEl.classList.remove(BOOK_REMOVE);
        this.bookEl.remove();  
        libraryIn.updateState(null, false)
      }, 250) 
    }
}