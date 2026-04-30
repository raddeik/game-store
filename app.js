
let user = localStorage.getItem("user") || null;

let store = JSON.parse(localStorage.getItem("store") || "[]");
let library = JSON.parse(localStorage.getItem("library") || "[]");

/* 👤 LOGIN */
function login(){
    let name = prompt("Tu nombre de usuario:");
    if(!name) return;

    user = name;
    localStorage.setItem("user", user);

    alert("Bienvenido " + user);
}

/* 📤 PUBLICAR */
function publish(){
    if(!user) return alert("Haz login primero");

    let name = prompt("Nombre del juego:");
    let code = prompt("Pega HTML del juego:");

    store.push({
        id: Date.now(),
        name,
        code,
        author: user
    });

    save();
    render();
}

/* ▶ JUGAR */
function play(code){
    let w = window.open();
    w.document.write(code);
}

/* 💾 GUARDAR */
function save(){
    localStorage.setItem("store", JSON.stringify(store));
    localStorage.setItem("library", JSON.stringify(library));
}

/* 🔁 RENDER */
function render(){

    let g = document.getElementById("games");
    let l = document.getElementById("lib");

    g.innerHTML = "";
    l.innerHTML = "";

    store.forEach(game=>{
        g.innerHTML += `
        <div class="card">
            <b>${game.name}</b><br>
            👤 ${game.author}<br><br>
            <button onclick="play(\`${game.code}\`)">Jugar</button>
        </div>
        `;
    });

    library.forEach(game=>{
        l.innerHTML += `
        <div class="card">
            <b>${game.name}</b><br>
            <button onclick="play(\`${game.code}\`)">Abrir</button>
        </div>
        `;
    });
}

render();
