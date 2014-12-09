(function () {

  App.Models.Picture = Parse.Object.extend({

    className: 'Picture',

    idAttribute: 'objectId',

    defaults: {
      commentText: '',
      user: '',
      author: ''
    }

  });


}());
