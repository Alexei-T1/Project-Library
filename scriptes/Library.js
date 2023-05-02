import { Book } from './Book.js';
import { checkSaved, saveStorage } from './forStorage.js';

export { Book } from './Book.js'

// styles class list
const ROUTE = 'route';
const HIDDEN_ON = 'hidden_on';

const HEADER = 'header';
const CONTROLS = 'controls';

const MAIN = 'main';
const BOOKS = 'books';
const ADDBOOK = 'addBook';
const ADDBOOK_ON = 'addBook_on'

const BACK = 'back';
const BACK_ON = 'back_on';
const WRAPPERFORM = 'wrapperForm';
const CLOSEFORM = 'wrapperForm_close';
const WRAPPERFORM_JS = '.wrapperForm';
const WRAPPERFORM_ON = 'wrapperForm_on'
const FORM = 'form';

const TITLE = 'title';
const TITLE_1 = 'title_1';
const TITLE_2 = 'title_2';
const ADDBUTTONFORM = 'button_add';
const ADDBUTTONFORM_ON = 'button_add_on';


// class Libary

export class Library {
  constructor(parentEl) {
    this.parent = parentEl;
    this.source = null;
    this.state = checkSaved(window.localStorage);
    console.log(this.state, '   this.state');

    this.creatHTML();
    this.addHeandlers();
  }
  creatHTML() {
    // wrapper for library
    const routeEl = document.createElement('div');
    routeEl.classList.add(ROUTE);

    //  header block
    const header = document.createElement('header');
    header.classList.add(HEADER);
    const titleH1 = document.createElement('h2');
    titleH1.classList.add(TITLE, TITLE_1);
    titleH1.innerText = "Library";
    header.append(titleH1);

    //  main block
    const main = document.createElement('main');
    main.classList.add(MAIN);
    //  section controls
    const controls = document.createElement('section');
    controls.classList.add(CONTROLS);
    //  button to open adding book form
    const addBookButton = document.createElement('button');
    addBookButton.classList.add(ADDBOOK);
    addBookButton.innerText = 'add a new book';
    // library section for added books
    const libraryEl = document.createElement('section');
    libraryEl.classList.add(BOOKS);

    controls.append(addBookButton);

    // adding background element for form
    const back = document.createElement('div');
    back.classList.add(BACK);

            // adding book form wrapper
    const newBookForm = document.createElement('div');
    newBookForm.classList.add(WRAPPERFORM);
    controls.append(newBookForm)
    // close form element 
    const closeFormElement = document.createElement('div');
    closeFormElement.classList.add(CLOSEFORM);
    // form title
    const titleH3 = document.createElement('h3');
    titleH3.innerText = 'Add new book';
    titleH3.classList.add(TITLE, TITLE_2);
    // adding form 
    const form = document.createElement('form');
    form.classList.add(FORM);
    form.id = 'form';
    // label and input for name book 
    const labName = document.createElement('label');
    labName.for = 'name';
    labName.innerText = 'Name:';
    const fieldName = document.createElement('input');
    labName.append(fieldName);
    fieldName.type = 'text';
    fieldName.id = 'name';
    fieldName.name = 'name';
    fieldName.required = true;
    [ fieldName.minLength, fieldName.maxLength ] = [1 , 100];
    // label and input for author book 
    const labAuthor = document.createElement('label');
    labAuthor.for = 'author';
    labAuthor.innerText = 'Author:';
    const fieldAuthor = document.createElement('input');
    fieldAuthor.type = 'text';
    fieldAuthor.id = 'author';
    fieldAuthor.name = 'author';
    fieldAuthor.required = true;
    [ fieldAuthor.minLength, fieldAuthor.maxLength ] = [1 , 50];
    labAuthor.append(fieldAuthor);
    // label and input for amount pages of book
    const labPages = document.createElement('label');
    labPages.for = 'pages';
    labPages.innerText = 'Pages:';
    const fieldPages = document.createElement('input');
    fieldPages.type = 'number';
    fieldPages.id = 'pages';
    fieldPages.name = 'pages';
    fieldPages.required = true;
    [ fieldPages.min, fieldPages.max] = [10 , 2000];
    labPages.append(fieldPages);
   // button to send data for creating book
    const buttonAdd = document.createElement('button');
    buttonAdd.classList.add(ADDBUTTONFORM);
    buttonAdd.type = "submit";
    buttonAdd.innerText = 'add';
    // adding elemets to wrapper and form
    form.append(labName, labAuthor, labPages, buttonAdd);
    newBookForm.append(closeFormElement, titleH3, form);
    // adding elemets to main block
    main.append(controls, libraryEl)

    //  footer block
    const footer = document.createElement('footer');
    const links = document.createElement('ul');
    const link = document.createElement('li');
    link.innerText = 'a link';
    links.append(link);
    footer.append(links);

    // adding elemets to route wrapper element 
    routeEl.append(header, main, footer, back,);

    // touchig list of elemets
    this.listEl = { routeEl, addBookButton, libraryEl, back, newBookForm, closeFormElement, form, buttonAdd }

    this.addBooks()
  }
  addHeandlers() {
    this.listEl.addBookButton.addEventListener('click', (ev) => {
      ev.preventDefault()
      this.listEl.addBookButton.disabled = true;
      this.listEl.addBookButton.classList.add(ADDBOOK_ON);
      this.listEl.newBookForm.classList.add(WRAPPERFORM_ON);
      this.listEl.back.classList.add(BACK_ON);
      document.body.classList.add(HIDDEN_ON);
    });

    this.listEl.back.addEventListener('click', this.closeForm.bind(this));
    this.listEl.closeFormElement.addEventListener('click', this.closeForm.bind(this));

    this.listEl.form.addEventListener('submit', (ev) => {
      ev.preventDefault();
    
      const book = {
        name: { value: this.listEl.form.elements.name.value,
          required: this.listEl.form.elements.name.required },
        author: { value: this.listEl.form.elements.author.value,
          required: this.listEl.form.elements.author.required },
        pages: { value: this.listEl.form.elements.pages.value,
          required: this.listEl.form.elements.pages.required },
      };

      if(!this.isValidateInput(null, book)) {
      
        return;
      }
      const exist = document.querySelector('.exists');
      switch(this.isValidateInput(null, book)) {
        case 'exists':
          if(exist) return;
          const titleH3Exists = document.createElement('h3');
          titleH3Exists.innerText = 'This book already exists';
          titleH3Exists.classList.add(TITLE, TITLE_2, 'exists');
          this.listEl.newBookForm.append(titleH3Exists);
          return;
          default:
            if(exist) exist.remove();
      }

      this.addBook(book);
      console.log('addBook --------')
    });

  }
  start(sourceUrl) {
    this.source = sourceUrl;
    this.parent.append(this.listEl.routeEl)
    console.log(this.source)
  }
  addBooks() {
    const listKeys = Object.keys(this.state);
    if(listKeys.length != 0) {
      listKeys.forEach( ( key ) => {
        this.addBook(this.state[key], true);
      });
    }
  }
  async updateState(bookData, key, add = true) {
    if(add) { 
      this.state[key] = bookData; 
      return; 
    }
    this.state = checkSaved(window.localStorage);
  }

  async addBook (bookData, checkLoad = false){

    try {
        const send = (bookData) => {

        /* create and add a new book*/
        const book = new Book(bookData);
        const parentElBook = this.listEl.libraryEl; 
        parentElBook.append(book.bookEl);

        /* save to localStorage a new book. ignore then loading*/
        if(!checkLoad) {
          this.updateState(bookData, book.key);
          saveStorage(bookData, book.key);
        } 
       
      }

      setTimeout(send, 100, bookData);
      return true;
    } catch (error) {
      console.error(error);
      return error;
    }          
  }
  closeForm(ev) {
    this.listEl.addBookButton.disabled = false;
    this.listEl.addBookButton.classList.remove(ADDBOOK_ON);

    this.listEl.newBookForm.classList.remove(WRAPPERFORM_ON);
    this.listEl.back.classList.remove(BACK_ON);
    document.body.classList.remove(HIDDEN_ON);
  }

  isValidateInput(ev, book) {
    if(!ev) {
      if(this.state && this.state[`-book:${book.author.value}-${book.name.value}`]) {
        return 'exists'
      }
      return Object.values(book).filter((v) => v.value == '' && v.required ).length === 0;
    }
  }
}

