var socket = io();

var app = Vue.createApp({
    data: function () {
        return {
            numClients: 0,
            isTV: false
        }
    }
}).mount("#app");

socket.on('emitGame', function(data) {
    app.numClients = data['numClients'];
    app.isTV = app.isTV || data['numClients'] == 1;
})