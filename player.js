var socket = io();

var app = Vue.createApp({
    data: function () {
        return {
            gameStage: "",
            isClueGiver: false
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
})