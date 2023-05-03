import { deleteFromStorage, saveStorage } from "./forStorage.js";
import { libraryIn } from '../Index.js';

// styles class list
const BOOK = 'book';
const BOOK_REMOVE = 'book_remove';
const BOOK_NAME = 'book__name';
const BOOK_AUTHOR = 'book__author';
const BOOK_PAGES = 'book__pages';
const BUTTON_REMOVE = 'button_remove';
const TITLE_3 = 'title_3';
const INPUTSECT = 'inputSection';
const OPTIONSECT = 'optionSection';
const CHECKREAD = 'checkRead';


export class Book {
  constructor(book) {
    this.bookEl = null;
    this.listBook = {};
    this.bookData = book;
    this.key = `-book:${book.author.value}-${book.name.value}`;
    this.creatHTML(book);
    this.addHeandlers();
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

      const optionsWrapper = document.createElement('div');
      optionsWrapper.classList.add(OPTIONSECT);
      const removeButton = document.createElement('button');
      removeButton.classList.add(BUTTON_REMOVE);
      removeButton.innerText = 'remove';
      const checkBoxRead = document.createElement('input');
      checkBoxRead.type = 'checkbox';
      checkBoxRead.classList.add(CHECKREAD);
      checkBoxRead.id = 'read';
      checkBoxRead.name = 'read';
      const checkBoxReadLabel = document.createElement('label');
      checkBoxReadLabel.innerText = 'read: ';
      checkBoxReadLabel.append(checkBoxRead);

      optionsWrapper.append(removeButton, checkBoxReadLabel);

      wrapper.append(wrapperInput, optionsWrapper);

      this.bookEl = wrapper;
      Object.assign(this.listBook, { wrapper, removeButton, checkBoxRead });
      this.checkRead.bind(this)();
    }
    addHeandlers() {
      this.listBook.removeButton.addEventListener('click',this.remove.bind(this));
      this.listBook.checkBoxRead.addEventListener('click',this.checkRead.bind(this));
    }
    remove(ev) {
      this.bookEl.classList.add(BOOK_REMOVE);
      deleteFromStorage(this.key);
      setTimeout(()=> {
        this.bookEl.classList.remove(BOOK_REMOVE);
        this.bookEl.remove();  
        libraryIn.updateState(null, false)
      }, 200) 
    }
    checkRead(ev) {
      const check = ev ? this.listBook.checkBoxRead.checked : this.bookData.checkRead.value;
      if(check) {
        this.listBook.checkBoxRead.checked = true;
        this.bookData.checkRead.value = true;
        this.listBook.wrapper.classList.add('book_on');
      } else {
        this.bookData.checkRead.value = false;
        this.listBook.wrapper.classList.remove('book_on');
      }
      saveStorage(this.bookData, this.key);
    }
}