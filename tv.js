var socket = io();
socket.emit('register as tv');

var app = Vue.createApp({
    data: function () {
        return {
            
        }
    }
}).mount("#app");

socket.on('emitGame', function(data) {
})