// Elementos
const btn = document.querySelector(".btn");
const inputName = document.querySelector("#name");
const inputEmail = document.querySelector("#email");
const TextMessage = document.querySelector("#message");
const formConteiner = document.querySelector("#form-conteiner");
const formHeader = document.querySelector("#form-header");
const footer = document.querySelector("footer");
const formInputs = document.querySelector("#form-inputs");
const inputNameErro = document.querySelector(".input-name");
const inputEmailErro = document.querySelector(".input-email");
const inputMessageErro = document.querySelector(".input-message");

// Classe
class Info {
  constructor(name, email, message) {
    this.nome = name;
    this.email = email;
    this.mensagem = message;
  }
}

// Inicialização do EmailJS
(function () {
  emailjs.init("ufXgs4AQ7UGRcXKHJ");
})();

// Funções

function Erro() {
  if (!inputName.value) {
    const Error = document.createElement("p");
    Error.innerHTML = "Este campo é obrigatório";
    Error.classList.add("erro");
    setTimeout(() => {
      Error.classList.add("show");
    });
    inputNameErro.appendChild(Error);
    setTimeout(() => {
      Error.classList.add("desappear-error");
    },4000);
  }

  if (!inputEmail.value) {
    const Error = document.createElement("p");
    Error.innerHTML = "Este campo é obrigatório";
    Error.classList.add("erro");
    setTimeout(() => {
      Error.classList.add("show");
    });
    inputEmailErro.appendChild(Error);
    setTimeout(() => {
      Error.classList.add("desappear-error");
    }, 4000);
  }

  if (!TextMessage.value) {
    const Error = document.createElement("p");
    Error.innerHTML = "Este campo é obrigatório";
    Error.classList.add("erro");
    setTimeout(() => {
      Error.classList.add("show");
    });
    inputMessageErro.appendChild(Error);
    setTimeout(() => {
      Error.classList.add("desappear-error");
    }, 4000);
  }


}

function Values(name, email, message) {
  const toName = "Nome do Destinatário";
  if (!name || !email || !message) {
    Erro();
    return;
  } else {
    const params = {
      to_name: email,
      from_name: name,
      message: message,
    };

    emailjs.send("service_dz9j6if", "template_hzfmts5", params);

    inputEmail.value = "";
    inputName.value = "";
    TextMessage.value = "";
    returnToUsuario();
  }
}

function returnToUsuario() {
  const div = document.createElement("div");
  const p = document.createElement("p");
  p.innerHTML = `"Obrigado por entrar em contato conosco, retornaremos em breve!"`;
  div.appendChild(p);
  div.classList.add("feedback");
  [formConteiner, formHeader, footer].forEach((item) => {
    item.classList.add("hide");
  });
  document.body.appendChild(div);
  setTimeout(() => {
    div.classList.add("show");
  }, 100);

  setTimeout(() => {
    div.classList.toggle("hide");
    [formConteiner, formHeader, footer].forEach((item) => {
      item.classList.toggle("hide");
    });
  }, 5000);
}

// Eventos
btn.addEventListener("click", (e) => {
  e.preventDefault();
  const name = inputName.value;
  const email = inputEmail.value;
  const message = TextMessage.value;
  Values(name, email, message);

});

// Observer para animações
const myObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("show");
      }, 700);
    }
  });
});

const elements = document.querySelectorAll(".hidden");
elements.forEach((element) => {
  myObserver.observe(element);
});
