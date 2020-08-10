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
    return `${title} by ${author}, ${pages} pages, ${read}`;
}

//Push a book to the myLibrary array
function addBookToLibrary(book){
    myLibrary.push(book);
}

//Show a book on the page
//Rewrite render() to loop through array
function render(library){
    library.forEach((book) => {
        //Create new elements for each bit of book data
        const newBook = document.createElement('div');
        const title = document.createElement('h2');
        const author = document.createElement('p');
        const pages = document.createElement('p');
        const read = document.createElement('p');

        //Add text to the elements from input data
        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = `${book.pages} pages`;
        read.textContent = book.read;

        //Show on page
        newBook.appendChild(title);
        newBook.appendChild(author);
        newBook.appendChild(pages);
        newBook.appendChild(read);

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

    //Create a new book from user input, push to array, show on page
    const book = new Book(title, author, pages, read);
    addBookToLibrary(book);
    render(myLibrary.slice(length-1));

    bookForm.elements.namedItem('title').value = '';
    bookForm.elements.namedItem('author').value = '';
    bookForm.elements.namedItem('pages').value = '';
});