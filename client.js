var socket = io();

var app = Vue.createApp({
    data: function () {
        return {
            numClients: 0,
            isTV: false,
            assignedNumber: 0
        }
    }
}).mount("#app");

socket.on('emitGame', function(data) {
    app.numClients = data['numClients'];
    app.isTV = app.isTV || data['numClients'] == 1;
    app.assignedNumber = data['assignedNumber'];
})