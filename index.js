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

    // Inicializa os componentes de primeiro plano
    loader.build();
    // Obtem as credenciais do usuário
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const token = params.get('token');
    const path = "https://api.lubraxmaissystem.com/Lubrax.Mais.Api/api/User/getUserToken?token=" + token;
    const make = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'data-culture': 'pt-BR',
            'Authorization': 'Bearer ' + token
        }
    };
    loader.show("Realizando autenticação no sistema");
    fetch(path, make)
    .then(async response => {
        if (response.ok == true) {
            const data = await response.json();
            localStorage.setItem('apps', JSON.stringify(data.apps));
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('store', JSON.stringify(data.store));
            localStorage.setItem('token', data.token);
            return;
        } else {
            if (response.status === 401) {
                loader.chat("Token inválido, redirecionando para a página de login!");
                window.location.href = "https://auth.lubraxmaissystem.com/";
                return;
            };
        };
        return response.json();
    })
    .catch(error => { snackbar.show(error.message.text); })
    .finally(() => { loader.hide(); });






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