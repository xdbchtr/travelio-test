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

  var myRater = rater({element: document.querySelector("#rater"), rateCallback: function rateCallback(rating, done) {
    //make async call to server however you want
    //in this example we have a 'service' that rate and returns the average rating
    myDataService.rate(rate).then(function(avgRating) {
        //update the avarage rating with the one we get from the server
        myRater.setRating(avgRating);
         //we could disable the rater to prevent another rating
         //if we dont want the user to be able to change their mind
        myRater.disable();
        //dont forget to call done
        done();
    }, function(error) {
            //handle the error
            //dont forget to call done
            done();
    });
}});
  