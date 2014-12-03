Parse.initialize("itgnj31wh8MQhIxiy6OQwFWOlzeVWZt56SipOGe8", "eatOhuFjUvMG3BpmkKuUZyIFvNVJ9mgIbe3u0BVg");

(function () {

  App.posts = new App.Collections.Posts();
  App.comments = new App.Collections.Comments();

  App.user = Parse.User.current();

  new App.Views.Nav({user: App.user});
   App.posts.fetch().done(function () {
     App.comments.fetch().done(function(){
       App.router = new App.Routers.AppRouter();
       Parse.history.start();
     });
   });
}());
