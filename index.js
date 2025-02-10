// Objeto de recursos da aplicação
var app = new Object();

// Versão aplicação
app.version = "1.0.1";

app.launcher = function() {
    // Inicializa os componentes globais da aplicação
    document.getElementById("Close").addEventListener("click", function() { window.close(); });
    document.getElementById("Print").addEventListener("click", function() { window.print(); });
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
            let apps = data.apps;
            let user = data.user;
            let store = data.store;
            let token = data.token;
            // Presiste as credenciais do usuário
            localStorage.setItem('apps', JSON.stringify(apps));
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('store', JSON.stringify(store));
            localStorage.setItem('token', token);
            // Preenche a identificação do usuário e ponto de venda
            document.getElementById("User").innerHTML = user.name;
            document.getElementById("Store").innerHTML = store.name;
            // Renderiza o QR Code
            let box = document.getElementById("QRCode");
            new QRCode(box,
                {
                    text:"https://cadastrofacil.lubraxmaissystem.com/index.html?hash=" + user.id,
                    width: 200,
                    height: 200
                }
            );
            // Finaliza a renderização dos elementos
            document.getElementById("Badge").classList.remove("hidden");
            document.getElementById("Title").innerHTML = "Seu crachá personalizado"
            return;
        } else {
            if (response.status === 401) {
                loader.chat("Token inválido, redirecionando para a página de login!");
                window.location.href = "https://auth.lubraxmaissystem.com/";
                return;
            };
            if (response.status > 401 && response.status <= 499) {
                document.getElementById("Badge").classList.add("hidden");
                document.getElementById("Title").innerHTML = "Não foi possível gerar seu QR Code.<br><br>Por favor, entre em contato com o Suporte Técnico."
                return;
            }
        };
        return response.json();
    })
    .catch(error => { snackbar.show(error.message.text); })
    .finally(() => { loader.hide(); });
    // Finaliza a inicialização da aplicação
    console.log("Lubrax Mais Web - QR Code" + "\n" + "Versão: " + app.version + " (Release) " + "\n\n");
}