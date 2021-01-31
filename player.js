var socket = io();

var app = Vue.createApp({
    data: function () {
        return {
            gameStage: "",
            isClueGiver: false,
            spectrum: [],
            clue: ""
        }
    },
    methods: {
        claimTurn: function () {
            socket.emit('claim turn');
            this.isClueGiver = true;
        },

        submitClue: function () {
            providedClue = document.getElementById("clue").value;
            if (providedClue) {
                socket.emit('give clue', providedClue);
            }
        }
    }
}).mount("#app");

socket.on('emit game', function(data) {
    app.gameStage = data['gameStage'];
    app.spectrum = data['spectrum'];
    app.clue = data['clue'];
})