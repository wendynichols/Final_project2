(function () {
  App.Views.PublicPosts = Parse.View.extend({

    tagName: 'ul',
    className: 'allPosts',

    events: {},

    template: _.template($('#postsList').html()),

    initialize: function (options) {
      this.options = options;

      this.render();
      console.log(this.$el);
      $(".container").html(this.$el);
    },

    render: function () {
      var self = this;


      var myPost_query = new Parse.Query(App.Models.Post);
      myPost_query.equalTo('published', true);
      // myPost_query.descending("updatedAt");
      myPost_query.find({
        success: function(posts){
          _.each(posts, function(p) {
            var rendered = self.template(p.toJSON());
            self.$el.append(rendered);
          });
        }
      });

    }

  });

}());
