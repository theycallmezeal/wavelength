var socket = io();

var app = Vue.createApp({
    data: function () {
        return {
            gameStage: "",
            isClueGiver: false,
            spectrum: []
        }
    },
    methods: {
        claimTurn: function () {
            socket.emit('claim turn');
            this.isClueGiver = true;
        }
    }
}).mount("#app");

socket.on('emit game', function(data) {
    app.gameStage = data['gameStage'];
    app.spectrum = data['spectrum'];
})