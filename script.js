const canvas = document.getElementById("chart");
const ctx = canvas.getContext("2d");

let route = [
    { x: 100, y: 400 },
    { x: 250, y: 300 },
    { x: 450, y: 250 },
    { x: 650, y: 150 }
];

let vessel = {
    x: route[0].x,
    y: route[0].y,
    speed: 2
};

let currentIndex = 1;
let running = false;

function distance(a, b) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function drawRoute() {
    // full route
    ctx.beginPath();
    ctx.moveTo(route[0].x, route[0].y);
    for (let p of route) ctx.lineTo(p.x, p.y);
    ctx.strokeStyle = "lightgray";
    ctx.stroke();

    // active leg
    if (currentIndex < route.length) {
        ctx.beginPath();
        ctx.moveTo(vessel.x, vessel.y);
        ctx.lineTo(route[currentIndex].x, route[currentIndex].y);
        ctx.strokeStyle = "green";
        ctx.stroke();
    }

    // waypoints
    for (let p of route) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "blue";
        ctx.fill();
    }
}

function drawVessel() {
    ctx.beginPath();
    ctx.arc(vessel.x, vessel.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
}

function updateInfo() {
    document.getElementById("position").innerText =
        `${vessel.x.toFixed(1)}, ${vessel.y.toFixed(1)}`;

    if (currentIndex < route.length) {
        let dist = distance(vessel, route[currentIndex]);
        document.getElementById("distance").innerText = dist.toFixed(1);
        document.getElementById("eta").innerText =
            (dist / vessel.speed).toFixed(1) + " sec";
    } else {
        document.getElementById("distance").innerText = "0";
        document.getElementById("eta").innerText = "Arrived";
    }
}

function updateSimulation() {
    if (!running || currentIndex >= route.length) return;

    let target = route[currentIndex];
    let dx = target.x - vessel.x;
    let dy = target.y - vessel.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 2) {
        currentIndex++;
        return;
    }

    vessel.x += (dx / dist) * vessel.speed;
    vessel.y += (dy / dist) * vessel.speed;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRoute();
    drawVessel();
    updateInfo();

    requestAnimationFrame(updateSimulation);
}

function startSimulation() {
    running = true;
    updateSimulation();
}

function pauseSimulation() {
    running = false;
}

drawRoute();
drawVessel();
updateInfo();
