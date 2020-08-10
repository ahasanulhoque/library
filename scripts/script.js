const bookshelf = document.querySelector('#bookshelf');
const newBookButton = document.querySelector('#new-book');
const bookForm = document.querySelector('#book-form');
const formSubmitButton = document.querySelector('#submit-book');

let myLibrary = [];

//Book constructor
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return `${title} by ${author}, ${pages} pages, ${read}`;
    }
}

//Push a book to the myLibrary array
function addBookToLibrary(book){
    myLibrary.push(book);
}

//render() loops through array to display array contents on page
//This means books must be removed from page before running render() again
function render(library){
    library.forEach((book) => {
        //Create new elements for each bit of book data
        const newBook = document.createElement('div');
        const title = document.createElement('h2');
        const author = document.createElement('p');
        const pages = document.createElement('p');
        const read = document.createElement('p');
        const removalButton = document.createElement('button');

        //Add data-attribute to remove button, use it to give book div an ID
        removalButton.dataset.index = library.indexOf(book).toString();
        newBook.setAttribute('id', 'book-' + removalButton.dataset.index);

        //Add text to the elements from input data
        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = `${book.pages} pages`;
        read.textContent = book.read;
        removalButton.textContent = 'Remove';

        //Show on page
        newBook.appendChild(title);
        newBook.appendChild(author);
        newBook.appendChild(pages);
        newBook.appendChild(read);
        newBook.appendChild(removalButton);

        bookshelf.appendChild(newBook);
    });
}

//Initial books to show on page load: create and add to array
const marsRoom = new Book('The Mars Room', 'Rachel Kushner', '338', 'Read');
addBookToLibrary(marsRoom);
const iliad = new Book('The Iliad', 'Homer', '683', 'Read');
addBookToLibrary(iliad);
const glassHotel = new Book('The Glass Hotel', 'Emily St John Mandel', '302', 'Not read');
addBookToLibrary(glassHotel);

//Show each book from the array on the page
render(myLibrary);

//Show the form on the page
newBookButton.addEventListener('click', () => {
    bookForm.style.display = 'block';
});

//Hide the form and take in the user input values
formSubmitButton.addEventListener('click', () => {
    bookForm.style.display = 'none';
    let title = bookForm.elements.namedItem('title').value;
    let author = bookForm.elements.namedItem('author').value;
    let pages = bookForm.elements.namedItem('pages').value;
    let read = bookForm.elements.namedItem('read').value;

    //Clear the page of current books
    deleteAllBooks();

    //Create a new book from user input, push to array, show all books on page
    const book = new Book(title, author, pages, read);
    addBookToLibrary(book);
    render(myLibrary);

    //Reset form
    bookForm.elements.namedItem('title').value = '';
    bookForm.elements.namedItem('author').value = '';
    bookForm.elements.namedItem('pages').value = '';
});

//Listen for clicks on the remove buttons
bookshelf.onclick = function(event){
    let removalButton = event.target;
    if (removalButton.tagName == 'BUTTON'){
        //Remove all books from page, delete removed book from array, and 
        //display contents of array on page again
        deleteAllBooks();
        myLibrary.splice(parseInt(removalButton.dataset.index),1);
        render(myLibrary);
    }
}

//This function is used to remove all books from the webpage/DOM tree whenvever
//an update is made to the myLibrary array (whether a book is added to or removed
//from the array). This is so that the contents of the array don't duplicate when
//the render function is run again, as render() iterates over the myLibrary array
function deleteAllBooks() {
    //Iterate over array
    //Select DOM element with data-attribute equal to current iteration
    //Remove DOM element
    
    for(let i=0; i < myLibrary.length; i++){
        let book = document.querySelector('#book-' + i.toString());
        bookshelf.removeChild(book);
    }
}