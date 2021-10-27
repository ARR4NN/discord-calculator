module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log("READY!")
        client.user.setActivity("Whats 9+10", { type: "PLAYING" });
    }
}