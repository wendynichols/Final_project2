(function () {

  App.Views.Login = Parse.View.extend({

    events: {
      'submit #signUp': 'newUser',
      'submit #logIn': 'logIn'
    },

    template: _.template($('#logInForm').html()),

    initialize: function () {
      this.render();
      $(".container").html(this.$el);
    },

    render: function () {

      this.$el.html(this.template);

    },

    newUser: function(e){

      e.preventDefault();

      var l = $('#newUsername').val();
      var p = $('#newPassword').val();

      var newUser = new Parse.User({
        username: l,
        password: p,
        name: $('#name').val(),
        email: $('#email').val()
      });

      newUser.signUp(null, {
        success: function(){
          Parse.User.logIn(l, p, {
            success: function (user) {
              App.user = user;
              App.router.navigate('#/', {trigger: true});
            },
            error: function (user) {
              alert("Sign in better.");
            }
          });
        }
      });

    },

    logIn: function(e){

      e.preventDefault();

      var l = $('#name').val();
      var p = $('#password').val();

      Parse.User.logIn(l, p, {
        success: function (user) {
          App.user = user;
          $('#navLogin').text('Logout');
          App.router.navigate('', {trigger: true});
        },
        error: function (user) {
          alert("Sign in better.");
        }
      });

    }

  });

}());
