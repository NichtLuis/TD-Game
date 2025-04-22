var lastUpdate = Date.now();
var myInterval = setInterval(tick, 1000);

function tick() {
    var now = Date.now();
    var dt = now - lastUpdate;
    lastUpdate = now;

    update(dt);
    render(dt);
}