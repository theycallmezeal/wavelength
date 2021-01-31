var socket = io();

var app = Vue.createApp({
    data: function () {
        return {
            
        }
    }
}).mount("#app");

socket.on('emitGame', function(data) {
})