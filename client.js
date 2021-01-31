var socket = io();

var app = Vue.createApp({
    data: function () {
        return {
            foo: 5
        }
    }
});

app.mount("#app");