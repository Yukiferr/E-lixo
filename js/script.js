const mapDiv = document.getElementById("map");

if (mapDiv) {
  const maringaCoords = [-23.4200, -51.9300];
  const map = L.map("map").setView(maringaCoords, 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  }).addTo(map);

  const iconeLixoEletronico = L.icon({
    iconUrl: 'img/recycle-icon.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  const pontosColeta = [
    {
      nome: "Tiro de Guerra - Av. Mandacaru, 730",
      coords: [-23.408417, -51.955972],
    },
    {
      nome: "Faculdades Maringá - Av. Prudente de Morais, 815",
      coords: [-23.415756326264347, -51.94121893222591],
    },
    {
      nome: "Paço Municipal - Av. XV de Novembro, 701",
      coords: [-23.423959066493058, -51.93930584187471],
    },
    {
      nome: "Câmara Municipal - Av. Papa João XXIII, 239",
      coords: [-23.428081415818173, -51.93768324926525],
    },
    {
      nome: "4º BPM - Rua Mitsuzu Taguchi, 99",
      coords: [-23.424785709946846, -51.90734352694459],
    },
  ];

  const marcadores = [];

  pontosColeta.forEach((ponto, index) => {
    const marker = L.marker(ponto.coords, { icon: iconeLixoEletronico })
      .addTo(map)
      .bindPopup(`<b>${ponto.nome}</b>`);
    marcadores.push(marker);
  });

  // Clique nos itens do menu
  const lista = document.getElementById("listaPontos");
  if (lista) {
    const itens = lista.querySelectorAll("li");

    itens.forEach((item) => {
      item.addEventListener("click", () => {
        const id = item.getAttribute("data-id");
        const marcador = marcadores[id];

        map.flyTo(marcador.getLatLng(), 16, {
          animate: true,
          duration: 1.2
        });
        marcador.openPopup();

        // Remove classe ativa de todos e adiciona no clicado
        itens.forEach(el => el.classList.remove("ativo"));
        item.classList.add("ativo");

        // Fecha menu em telas pequenas
        if (window.innerWidth <= 768) {
          document.querySelector(".menu-lateral").classList.remove("ativo");
        }
      });
    });
  }

}



// === LOGIN ===
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("text").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (email === "admin" && senha === "admin123") {
      window.location.href = "painel.html";
    } else {
      document.getElementById("erroLogin").style.display = "block";
    }
  });
}

// === AGENDAMENTO ===
const formAgendamento = document.getElementById("formAgendamento");
if (formAgendamento) {
  formAgendamento.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const endereco = document.getElementById("endereco").value;
    const item = document.getElementById("item").value;
    const data = document.getElementById("data").value;

    const novoAgendamento = { nome, endereco, item, data };

    const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    agendamentos.push(novoAgendamento);
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));

    alert("✅ Coleta agendada com sucesso!\nObrigado por contribuir com o meio ambiente.");
    formAgendamento.reset();
  });

  // Definir limite de datas
  function definirLimiteData() {
    const inputData = document.getElementById("data");
    if (!inputData) return;

    const hoje = new Date();
    const dataMin = new Date();
    dataMin.setDate(hoje.getDate() + 3);

    const dataMax = new Date();
    dataMax.setDate(hoje.getDate() + 14);

    const formatar = (data) => data.toISOString().split("T")[0];

    inputData.min = formatar(dataMin);
    inputData.max = formatar(dataMax);
  }

  definirLimiteData();
}

// === PAINEL ADMINISTRATIVO ===
const tabela = document.getElementById("tabelaAgendamentos");
if (tabela) {
  const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

  function formatarDataBR(dataISO) {
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia} / ${mes} / ${ano}`;
  }

  if (agendamentos.length === 0) {
    tabela.innerHTML = '<tr><td colspan="4">Nenhum agendamento encontrado.</td></tr>';
  } else {
    agendamentos.forEach(item => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.endereco}</td>
        <td>${item.item}</td>
        <td>${formatarDataBR(item.data)}</td>
      `;
      tabela.appendChild(linha);
    });
  }
}




