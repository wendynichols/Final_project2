(function () {
  App.Views.CreatePost = Parse.View.extend({

    tagName: 'form',
    className: 'createForm',

    events: {
      'click #publish': 'createPost',
      'click #draft' : 'draftPost'
    },

    template: _.template($('#createPost').html()),

    // template: _.template($('#image-section-template').html()),
    // template: _.template($('#color-thief-output-template').html()),

    // var imageSectionHTML = Mustache.to_html($('#createPost').html(), imageInfo);

    initialize: function () {

      this.render();
      $(".container").html(this.$el);

    },

    render: function () {
      var self = this;

      $(".container").empty();

      this.$el.html(this.template());

    },

    createPost: function(e){
      e.preventDefault();

      if($('#title').val() === ""){
        alert('Please create a title for your post.');
      }
      else if($('#copy').val() === ""){
        alert("Don't create a blank post.");
      }

      else{

        var p = new App.Models.Post({
          title: $('#title').val(),
          copy: $('#copy').val(),
          published: true,
          user: App.user,
          author: App.user.attributes.name
        });

        // Set Access Control List
        var postACL = new Parse.ACL(App.user);
        postACL.setPublicReadAccess(true);
        p.setACL(postACL);

        p.save(null, {
          success: function () {
            App.posts.add(p);
            App.router.navigate('', { trigger: true });
          }
        });

      }

    },

    draftPost: function(e){
      e.preventDefault();

      if($('#title').val() === ""){
        alert('Please create a title for your post.');
      }
      else if($('#copy').val() === ""){
        alert("Don't create a blank post.");
      }

      else{

        var p = new App.Models.Post({
          title: $('#title').val(),
          copy: $('#copy').val(),
          published: false,
          user: App.user,
          author: App.user.attributes.name
        });

        // Set Access Control List
        var postACL = new Parse.ACL(App.user);
        postACL.setPublicReadAccess(true);
        p.setACL(postACL);

        p.save(null, {
          success: function () {
            App.posts.add(p);
            App.router.navigate('', { trigger: true });
          }
        });

      }

    }


  });

}());
