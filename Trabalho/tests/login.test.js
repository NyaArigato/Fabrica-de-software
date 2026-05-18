const fs = require("fs");
const path = require("path");

describe("Testes unitários da tela de login - Sprint Track", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <section class="internal-section form-section">
        <h1>Acessar Sprint Track</h1>
        <p>Entre com suas credenciais para acessar o painel da sua equipe.</p>

        <form class="custom-form">
          <label>E-mail Corporativo:</label>
          <input type="email" placeholder="email@empresa.com">

          <label>Senha:</label>
          <input type="password" placeholder="••••••••">

          <button type="button" class="btn btn-primary">Entrar no Sistema</button>
        </form>
      </section>
    `;

    global.alert = jest.fn();
    global.fetch = jest.fn();

    const scriptPath = path.resolve(__dirname, "../script.js");
    const scriptContent = fs.readFileSync(scriptPath, "utf8");
    eval(scriptContent);

    document.dispatchEvent(new Event("DOMContentLoaded"));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("deve exibir alerta quando e-mail e senha estiverem vazios", () => {
    const botao = document.querySelector(".form-section .btn-primary");

    botao.click();

    expect(global.alert).toHaveBeenCalledWith(
      "Por favor, preencha o e-mail e a senha."
    );

    expect(global.fetch).not.toHaveBeenCalled();
  });

  test("deve chamar a API de login quando os campos forem preenchidos", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ token: "fake-token" })
    });

    document.querySelector("input[type='email']").value = "teste@empresa.com";
    document.querySelector("input[type='password']").value = "123456";

    const botao = document.querySelector(".form-section .btn-primary");
    botao.click();

    await new Promise(process.nextTick);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/auth/login",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: "teste@empresa.com",
          senha: "123456"
        })
      })
    );
  });

  test("deve exibir mensagem de erro para credenciais inválidas", async () => {
    global.fetch.mockResolvedValue({
      ok: false
    });

    document.querySelector("input[type='email']").value = "erro@empresa.com";
    document.querySelector("input[type='password']").value = "senhaerrada";

    const botao = document.querySelector(".form-section .btn-primary");
    botao.click();

    await new Promise(process.nextTick);

    expect(global.alert).toHaveBeenCalledWith(
      "Credenciais inválidas. Tente novamente."
    );
  });

  test("deve exibir mensagem de sucesso quando o login for válido", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ token: "abc123" })
    });

    document.querySelector("input[type='email']").value = "usuario@empresa.com";
    document.querySelector("input[type='password']").value = "123456";

    const botao = document.querySelector(".form-section .btn-primary");
    botao.click();

    await new Promise(process.nextTick);

    expect(global.alert).toHaveBeenCalledWith(
      "Login realizado com sucesso! Redirecionando para o Dashboard..."
    );
  });
});