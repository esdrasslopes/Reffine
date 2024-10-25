// Elementos
const whats = document.querySelector("#whats");
const budget = document.querySelector(".nav-bar a");

// Funções
const CheckVisibility = () => {
  if (window.scrollY >= 240 && window.scrollY <= 3000) {
    whats.style.visibility = "visible";
    whats.style.opacity = 1;
  } else {
    whats.style.opacity = 0;
    setTimeout(() => {
      if (whats.style.opacity === "0") {
        whats.style.visibility = "hidden";
      }
    }, 600);
  }
};

const ResponseVibility = () => {
  if (window.innerWidth <= 700) {
    if (window.scrollY >= 240 && window.scrollY <= 3000) {
      whats.style.visibility = "visible";
      whats.style.opacity = 1;
    } else {
      whats.style.opacity = 0;
      setTimeout(() => {
        if (whats.style.opacity === "0") {
          whats.style.visibility = "hidden";
        }
      }, 600);
    }
  }
};

window.addEventListener("scroll", () => {
  CheckVisibility();
});

window.addEventListener("scroll", () => {
  ResponseVibility();
});

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

function API(value) {
  const API = document.createElement("a");
  API.setAttribute(
    "href",
    `https://api.whatsapp.com/send?phone=5561993393314&text=Olá, meu pedido é ${value}`
  );
  API.setAttribute("target", "_blank");
  document.body.appendChild(API);
  API.click();
  document.body.removeChild(API);
}

function templateWhats() {
  const templateWhats = `<div class="conteiner-whats">
    <span class="close-popup"> <i class="fa-regular fa-x"></i> </span>
    <div class ="whats-box">
     <input type="text" >
       <label>Qual o seu pedido?</label>
    <button class ="enviar">Enviar</button>
    </div>
    </div>
  </div>`;

  const parser = new DOMParser();

  const WhatsTemplate = parser.parseFromString(templateWhats, "text/html");

  const conteinerWhats = WhatsTemplate.querySelector(".conteiner-whats");

  document.body.appendChild(conteinerWhats);

  const fechar = conteinerWhats.querySelector(".conteiner-whats span");

  fechar.addEventListener("click", () => {
    conteinerWhats.remove();
  });

  const send = conteinerWhats.querySelector(".enviar");
  const request = conteinerWhats.querySelector(".conteiner-whats input");

  send.addEventListener("click", () => {
    if (!request.value) return;
    const mensage = request.value;
    API(mensage);
    request.value = "";
  });
}

whats.addEventListener("click", () => {
  templateWhats();
});

function createClass(name, pedido) {
  class order {
    constructor(name, request) {
      this.nome = name;
      this.pedido = request;
    }

    get ShowValues(){
      return `Olá meu nome é ${this.nome} e tenho um pedido: ${this.pedido}`
    }
  }

  const obj = new order(name, pedido);
  return obj;
}

function createBudgetContainer() {
  const budgetContainer = `<div class ="budget-container">
      <div class = "form-container">
        <span class= "close-budget"><i class="fa-regular fa-x"></i></span>
        <div class = "form-inputs">
          <label for="name">Nome:</label>
          <input type ="text" placeholder="Seu nome" id="name">
        </div>
         <div class = "form-inputs">
          <label for="order">Qual o seu pedido?</label>
          <input type="text" placeholder="Seu pedido" id="order">          
        </div>
        <button id="btn">Enviar</button>
      </div>
  </div>`;

  const parser = new DOMParser();
  const budgetTemplate = parser.parseFromString(budgetContainer, "text/html");
  const ContainerBudget = budgetTemplate.querySelector(".budget-container");
  document.body.appendChild(ContainerBudget);

  const closeBudget = ContainerBudget.querySelector(".close-budget");
  closeBudget.addEventListener("click", () => {
    ContainerBudget.remove();
  });

  function API(PersonInformation) {
    const API = document.createElement("a");
    API.setAttribute(
      "href",
      `https://api.whatsapp.com/send?phone=5561993393314&text=${PersonInformation.ShowValues}`
    );
    API.setAttribute("target", "_blank");
    document.body.appendChild(API);
    API.click();
    document.body.removeChild(API);
  }

  const btnBudget = ContainerBudget.querySelector("#btn").addEventListener( "click",
    () => {
        const InputName = ContainerBudget.querySelector("#name").value;
        const InputOrder = ContainerBudget.querySelector("#order").value;
        const PersonInformation = createClass(InputName,InputOrder);
        if(!InputName || !InputOrder){
          return;
        }
        API(PersonInformation);
    }
  );
}

budget.addEventListener("click", (e) => {
  e.preventDefault()
  createBudgetContainer();
});

function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

function applyBackgroundColor() {
  if (window.innerWidth < 600) { 
    [information, objective].forEach((item) => {
      item.style.backgroundColor = "black";
    });
  }
}


if (isSafari()) {
  applyBackgroundColor();
}


window.addEventListener("resize", applyBackgroundColor);
