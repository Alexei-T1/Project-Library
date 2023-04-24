
function checkSaved (storage, order = 0) {
  const re = new RegExp('book');
  if(storage.length == 0 || (storage.length == 1 && !re.test(storage.key(0)))) {
    return [[], order]
  }
  
  const tempArr = Object.entries(storage).filter((i) => {
    return re.test(i[0]);
  }).map((b) => {
    return JSON.parse(b[1]); 
  });


  order = tempArr.length;
  return [tempArr, order];
}

let [ listBooks, orderBook ]  = checkSaved(window.localStorage);



async function saveStorage(book) {
    orderBook++;
    listBooks.push(book);

    const key = `${orderBook}-book_${book.name.value}`;
    const stringBook = JSON.stringify(book);
    window.localStorage.setItem(key, stringBook);

}

export { listBooks, saveStorage};