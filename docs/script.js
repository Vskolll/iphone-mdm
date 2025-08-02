async function loadData() {
    try {
        let res = await fetch("https://iphone-mdm.onrender.com/data");
        if (!res.ok) {
            throw new Error(`Ошибка загрузки: ${res.status}`);
        }
        let apps = await res.json();

        let tbody = document.getElementById("app-list");
        tbody.innerHTML = "";

        if (apps.length === 0) {
            tbody.innerHTML = "<tr><td colspan='4'>Нет данных. Установите профиль на iPhone.</td></tr>";
            return;
        }

        apps.forEach(app => {
            let row = `<tr>
                <td>${app.name || "—"}</td>
                <td>${app.bundle || "—"}</td>
                <td>${app.version || "—"}</td>
                <td>${app.source || "—"}</td>
            </tr>`;
            tbody.innerHTML += row;
        });
    } catch (err) {
        console.error(err);
        document.getElementById("app-list").innerHTML =
            "<tr><td colspan='4'>Ошибка подключения к серверу</td></tr>";
    }
}

// Загружаем сразу и обновляем каждые 60 секунд
loadData();
setInterval(loadData, 60000);