import { deleteFromStorage } from "./forStorage.js";
import { libraryIn } from '../Index.js';

// styles class list
const BOOK = 'book';
const BOOK_REMOVE = 'book_remove';
const BOOK_NAME = 'book__name';
const BOOK_AUTHOR = 'book__author';
const BOOK_PAGES = 'book__pages';
const BUTTON_REMOVE = 'button_remove';
const TITLE_3 = 'title_3';
const INPUTSECT = 'inputSection'


export class Book {
  constructor(book) {
    this.bookEl = null;
    this.listBook = {};
    this.creatHTML(book);
    this.addHeandlers();
    this.bookData = book;
    this.key = `-book:${book.author.value}-${book.name.value}`;
  }

    creatHTML(book) {
       // wrapper for book
      const wrapper = document.createElement('div');
      wrapper.classList.add(BOOK);
      const wrapperInput = document.createElement('div');
      wrapperInput.classList.add(INPUTSECT);
      // Elements of book
      const name = document.createElement('h3');
      name.classList.add(BOOK_NAME, TITLE_3);
      const nameLabel= document.createElement('span');
      nameLabel.innerText = 'Book title:';
      const nameValue = document.createElement('span');
      nameValue.innerText = book.name.value;
      name.append(nameLabel, nameValue)

      const author = document.createElement('h3');
      author.classList.add(BOOK_AUTHOR, TITLE_3);
      const authorLabel = document.createElement('span');
      authorLabel.innerText = 'Author:';
      const authorValue = document.createElement('span');
      authorValue.innerText = book.author.value;
      author.append(authorLabel, authorValue)

      const pages = document.createElement('h3');
      pages.classList.add(BOOK_PAGES, TITLE_3);
      const pagesLabel = document.createElement('span');
      pagesLabel.innerText = 'number of pages:';
      const pagesValue = document.createElement('span');
      pagesValue.innerText = book.pages.value;
      pages.append(pagesLabel, pagesValue)

      wrapperInput.append(name, author, pages);

      const removeButton = document.createElement('button');
      removeButton.classList.add(BUTTON_REMOVE);
      removeButton.innerText = 'remove';

      wrapper.append(wrapperInput, removeButton);

      this.bookEl = wrapper;
      Object.assign(this.listBook, { removeButton });
    }
    addHeandlers() {
      this.listBook.removeButton.addEventListener('click',this.remove.bind(this));
    }
    remove(ev) {
      this.bookEl.classList.add(BOOK_REMOVE);
      deleteFromStorage(this.key );
      setTimeout(()=> {
        this.bookEl.classList.remove(BOOK_REMOVE);
        this.bookEl.remove();  
        libraryIn.updateState(null, false)
      }, 200) 
    }
}