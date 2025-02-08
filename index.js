// Objeto de recursos da aplicação
var app = new Object();

// Versão aplicação
app.version = "1.0.1";

app.launcher = function() {
    // Obtém as credenciais do usuário e ponto de venda
    var user = JSON.parse(localStorage.getItem("user"));
    var store = JSON.parse(localStorage.getItem("store"));
    // Inicializa os componentes globais da aplicação
    document.getElementById("Close").addEventListener("click", function() { window.close(); });
    document.getElementById("Print").addEventListener("click", function() { window.print(); });
    document.getElementById("User").innerHTML = user.name;
    document.getElementById("Store").innerHTML = store.name;
    // Renderiza o QR Code
    if (user != undefined && user != null && user != "" && user.id != undefined && user.id != null && user.id != "") {
        let box = document.getElementById("QRCode");
        new QRCode(box,
            {
                text:"https://cadastrofacil.lubraxmaissystem.com/index.html?hash=" + user.id,
                width: 200,
                height: 200
            }
        );
        document.getElementById("Badge").classList.remove("hidden");
        document.getElementById("Title").innerHTML = "Seu crachá personalizado"
    } else {
        document.getElementById("Badge").classList.add("hidden");
        document.getElementById("Title").innerHTML = "Não foi possível gerar seu QR Code.<br><br>Por favor, entre em contato com o Suporte Técnico."
    };
    // Finaliza a inicialização da aplicação
    console.log("Lubrax Mais Web - QR Code" + "\n" + "Versão: " + app.version + " (Release) " + "\n\n");
}

app.qrcode = {
    make: function() {
        let box = document.getElementById("QRCode");
        new QRCode(box,
            {
                text:"https://cadastrofacil.lubraxmaissystem.com/index.html?hash=64baf79651b61defccbbed20",
                width: 200,
                height: 200
            }
        );
    }
};