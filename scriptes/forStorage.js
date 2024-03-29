
function checkSaved (storage) {
  const re = new RegExp('-book:');
  if(storage.length == 0 || (storage.length == 1 && !re.test(storage.key(0)))) {
    return {};
  }
  
  const dict = Object.entries(storage).filter((i) => {
    return re.test(i[0]);
  }).reduce((dict, bookData) => {
    const book = JSON.parse(bookData[1])
    const key = `-book:${book.author.value}-${book.name.value}`;
    dict[key] = book; 
    return dict; 
  }, {});

  return dict;
}

async function saveStorage(bookData, key) {
    const stringBook = JSON.stringify(bookData);
    window.localStorage.setItem(key, stringBook);
}

async function deleteFromStorage( key ) {
  window.localStorage.removeItem(key);
}

export { checkSaved, saveStorage, deleteFromStorage };