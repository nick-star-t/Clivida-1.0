document.addEventListener("deviceready", () => {

    // 🔥 pega token FCM
    FirebasePlugin.getToken(token => {
        console.log("TOKEN DO APP:", token);
        localStorage.setItem("deviceToken", token);
    }, err => console.error(err));

    // 🔔 quando receber notificação push
    FirebasePlugin.onMessageReceived(message => {
        saveNotification({
            title: message.title,
            body: message.body,
            date: new Date().toLocaleString()
        });
        alert(`🔔 ${message.body}`);
    });

    // 🔔 NOTIFICAÇÃO LOCAL – PERMISSÃO
    cordova.plugins.notification.local.requestPermission();

});

// ----------------------------------------------------------
// SALVAR NOTIFICAÇÃO NA LISTA (HOME + ALERTAS.HTML)
// ----------------------------------------------------------
function saveNotification(obj) {
    let list = JSON.parse(localStorage.getItem("notificacoes") || "[]");
    list.unshift(obj);
    localStorage.setItem("notificacoes", JSON.stringify(list));
}

// ----------------------------------------------------------
// AGENDAR CONSULTA (30 min antes)
// ----------------------------------------------------------
function agendarConsulta(data, descricao) {

    const consultaTime = new Date(data).getTime();
    const agora = Date.now();
    const diffMin = Math.floor((consultaTime - agora) / 60000);

    if (diffMin > 30) {

        cordova.plugins.notification.local.schedule({
            id: Date.now(),
            title: "Consulta marcada",
            text: `${descricao} às ${new Date(data).toLocaleTimeString()}`,
            trigger: { at: new Date(consultaTime - (30 * 60000)) }
        });

    }

    saveNotification({
        title: "Nova consulta",
        body: descricao,
        date: new Date(data).toLocaleString()
    });
}

// ----------------------------------------------------------
// AGENDAR MEDICAÇÃO (DIÁRIO)
// ----------------------------------------------------------
function agendarMedicamento(hora, descricao) {

    const [h, m] = hora.split(":").map(Number);
    const trigger = new Date();
    trigger.setHours(h, m, 0, 0);

    cordova.plugins.notification.local.schedule({
        id: Date.now(),
        title: "Hora do medicamento",
        text: descricao,
        trigger: {
            every: { hour: h, minute: m }
        }
    });

    saveNotification({
        title: "Novo medicamento",
        body: descricao,
        date: new Date().toLocaleString()
    });
}

