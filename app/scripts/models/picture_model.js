(function () {

  App.Models.Picture = Parse.Object.extend({

    className: 'Picture',

    idAttribute: 'objectId',

    defaults: {
      title: '',
      picture: '',
      user: '',
      author: '',
      published: false
    },

    initialize: function () {}

  })

}());
