(function () {
  App.Views.EditPost = Parse.View.extend({

    tagName: 'form',
    className: 'createForm',

    events: {
      'click #publish': 'editPost',
      'click #draft' : 'draftPost'
    },

    template: _.template($('#editPost').html()),
    template2: _.template($('#colorPost').html()),
    

    initialize: function (options) {

      this.options = options;

      this.render();
      $(".container").html(this.$el);

    },

    render: function () {
      var self = this;

      $(".container").empty();

      this.$el.html(this.template(this.options.post.toJSON()));

    },

    editPost: function(e){
      e.preventDefault();

      if($('#title').val() === ""){
        alert('Please create a title for your board');
      }
      else if($('#copy').val() === ""){
        alert("Don't create a blank board.");
      }

      else{

        this.options.post.set({
          title: $('#title').val(),
          copy: $('#copy').val(),
          published: true,
          user: App.user
        });


        this.options.post.save(null, {
          success: function () {
            App.router.navigate('', { trigger: true });
          }
        });
      }
    },


    draftPost: function(e){
      e.preventDefault();

      this.options.post.set({
        title: $('#title').val(),
        copy: $('#copy').val(),
        published: false,
        user: App.user
      });


      this.options.post.save(null, {
        success: function () {
          App.router.navigate('', { trigger: true });
        }
      });
    }


  });

}());
