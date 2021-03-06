(function () {
  App.Views.CreatePost = Parse.View.extend({

    tagName: 'form',
    className: 'createForm',

    events: {
      'click #publish': 'createPost',
      'click #draft' : 'draftPost'
    },


    template: $('#createPost').html(),
    template2: _.template($('#colorPost').html()),


    initialize: function () {

      this.render();
      $(".container").html(this.$el);

    },

    render: function () {
      var self = this;

      $(".container").empty();

      this.$el.html(this.template);

      setTimeout( function () { App.colorThief2(); });

    },

    createPost: function(e){
      e.preventDefault();

      if($('#title').val() === ""){
        alert('Please create a title for your board');
      }
    
      else{

        var p = new App.Models.Post({
          title: $('#title').val(),
          published: true,
          user: App.user,
          name: App.user.attributes.name
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
        alert('Please create a title for your board');
      }
      // else if($('#copy').val() === ""){
      //   alert("Don't create an empty board");
      // }

      else{

        var p = new App.Models.Post({
          title: $('#title').val(),
          // copy: $('#copy').val(),
          published: false,
          user: App.user,
          name: App.user.attributes.name
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
