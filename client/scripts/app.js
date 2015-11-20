// YOUR CODE HERE:
var app = {
  server: 'https://api.parse.com/1/classes/chatterbox',
  friendList: {},
  roomList: {},
  storage: [],

  init: function(){
    app.fetch();
    app.addFriend();
    app.handleSubmit();
    app.fetchRoom();
    app.fetchRoomChat();
   // app.filteredMessage();


  },

  send: function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      var newData = {
        username: message.username,
        text: message.text,
        roomname: message.room
      };

      app.fetch();

      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });


  },
  fetch: function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        app.clearMessages();
        $('.rooms').empty();
        app.storage = data['results'].slice();
        console.log(app.storage)

        for(var i = 0; i < data['results'].length; i++ ) {
          var eachOne = data['results'][i];
          app.addMessage(eachOne);
          var room = data['results'][i].roomname;
          // var roomList = $('.rooms').children();
          app.roomList[room] = room;

        }

        for(var room in app.roomList){
          if(app.roomList[room] !== null && app.roomList[room] !== undefined &&app.roomList[room] !== ''){
            $('.rooms').append('<option value="roomie">' + app.roomList[room] + '</option>')
          }
        }


        console.log('chatterbox: Messages Received');

      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
       console.error('chatterbox: Failed to receive message');
      }
  });

  },

  populateRooms: function() {

  },

  addMessage: function(message) {
    var text = "<span id='words'>" + _.escape(message.text) + "</span>"
    var user = "<span class=username><a>" + _.escape(message.username) + "</a></span>"
    var room = "<span class=room>" + _.escape(message.roomname) + "</div>"
    var sentence = "<div class='set'>" + user +": " + text + " <B>from room:</B> " + room + "</div>";
    $('#chats').append(sentence);
  },

  // filteredMessage: function(message){
  //   $('#main').on('click', 'li',function() {
  //     var room = $(this).text();
  //     app.clearMessages();
  //   })

  //   if(message.roomname === room){
  //     $('#chats').append(message)
  //   }
  // },


  clearMessages: function() {

    $('#chats').empty()
  },
  addRoom: function(roomName) {

    var rooms = "<div class ='room'>" + roomName + "</div>"
    $("#roomSelect").append(rooms);
  },

  addFriend: function(){
    $('#chats').on('click', '.username', function(event){
      var user = $(this).text();
      var friendsChat = [];
      app.friendList[user] = friendsChat.push()
    });
  },

  handleSubmit: function(){
    var inputBox = "<span><form>" + "<input id='inputBox' type=text placeholder='your message'/>"+ "<input type='submit'/>"+ "</form></span>";

    $('#main h1').after(inputBox);
    $('#chats').before('<form><select class="rooms"></select></form>');

    $('form').submit(function(event) {
        event.preventDefault();

        var room;
        var url = document.URL;
        var user = url.substr(url.indexOf("=") +1,url.length -1);
        var message = $('input').val();
        var data = {username: user, text: message, roomname: room};
        app.send(data);
        $('#inputBox').val('');
     });


  },

fetchRoom: function() {
      $('#main').on('click', 'li',function() {
      app.clearMessages();
      room = $(this).text();
      app.clearMessages();


      for(var i = 0; i < app.storage.length; i++) {
        if(app.storage[i].roomname === room) {
          app.addMessage(app.storage[i]);
        }
      }

    });
},

  fetchRoomChat: function(){
    var room;
    var text;
    var username;

    $('#main').on('click', 'li',function() {
      app.clearMessages();
      room = $(this).text();
    });

    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {

          var newData = {
            'username': username,
            'text': text,
            'roomname': room
          };

        for(var i = 0; i < data['results'].length; i++ ) {
          app.addMessage(newData);
        }

        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  }

}

app.init();
