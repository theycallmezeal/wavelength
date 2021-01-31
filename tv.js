var socket = io();
socket.emit('register as tv');

var app = Vue.createApp({
    data: function () {
        return {
            gameStage: ""
        }
    }
}).mount("#app");

socket.on('emit game', function(data) {
    app.gameStage = data['gameStage'];
})