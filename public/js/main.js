const deleteBook = btn => {
const bookId = btn.parentNode.querySelector('[name=bookId]').value;

const bookElement = btn.closest('article');

fetch('/delete-wishlist/' + bookId, {
    method: 'DELETE',
    headers: {
    'csrf-token': csrf
    }
})
    .then(result => {
    return result.json();
    })
    .then(data => {
    console.log(data);
    bookElement.parentNode.removeChild(bookElement);
    })
    .catch(err => {
    console.log(err);
    });
};