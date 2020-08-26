var socket = io.connect('http://localhost:8080', { 'forceNew': true });
var autor = null;
socket.on('messages', function(data) {
  console.log(data);
  render(data);
})

function render (data) {
  var html = data.map(function(elem, index) {
    var clase = elem.author != autor ? "recieved" : "send";
    return(`<div class="${clase}">
              ${elem.text}
            </div>`);
  }).join(" ");

  document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
  if(autor === null){
    autor = document.getElementById('username').value;
  }
  var message = {
    author: autor,
    text: document.getElementById('texto').value
  };

  socket.emit('new-message', message);
  return false;
}