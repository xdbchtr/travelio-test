const deleteBook = btn => {
    const bookId = btn.parentNode.querySelector('[name=bookId]').value;
    const productElement = btn.closest('article');
  
    fetch('/delete-wishlist/' + bookId, {
        method: 'DELETE'
    })
      .then(result => {
        return result.json();
      })
      .then(data => {
        console.log(data);
        productElement.parentNode.removeChild(productElement);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const backdrop = document.querySelector('.backdrop');
  const sideDrawer = document.querySelector('.mobile-nav');
  const menuToggle = document.querySelector('#side-menu-toggle');
  
  function backdropClickHandler() {
    backdrop.style.display = 'none';
    sideDrawer.classList.remove('open');
  }
  
  function menuToggleClickHandler() {
    backdrop.style.display = 'block';
    sideDrawer.classList.add('open');
  }
  
  backdrop.addEventListener('click', backdropClickHandler);
  menuToggle.addEventListener('click', menuToggleClickHandler);
  