(function () {
  App.Models.Post = Parse.Object.extend({
    className: 'Post',

    idAttribute: 'objectId',

    defaults: {
      title: '',
      copy: '',
      user: '',
      author: '',
      published: false
    },

    initialize: function () {}

  })

}());
