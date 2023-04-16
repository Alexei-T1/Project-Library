
// styles class list
const BOOK = 'book';
const BOOK_NAME = 'book__name';
const BOOK_AUTHOR = 'book__author';
const BOOK_PAGES = 'book__pages';

export class Book {
  constructor(book) {
    // const {name, author, pages} = book;
    this.bookEl = null;

    this.creatHTML(book);
    this.addHeandlers();
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

      wrapper.append(name, author, pages);

      this.bookEl = wrapper;
    }
    addHeandlers() {

    }
}