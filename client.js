var socket = io();

var app = Vue.createApp({
    data: function () {
        return {
            numClients: 5
        }
    }
}).mount("#app");

socket.on('emitGame', function(data) {
    app.numClients = data['numClients'];
})