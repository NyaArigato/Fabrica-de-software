// Aguarda o documento HTML carregar completamente
document.addEventListener("DOMContentLoaded", () => {
    
    // Seleciona o botão da página de login (comecar.html)
    const btnLogin = document.querySelector(".form-section .btn-primary");

    if (btnLogin) {
        btnLogin.addEventListener("click", async (event) => {
            event.preventDefault(); // Evita o recarregamento da página

            // Captura os valores digitados nos inputs
            const email = document.querySelector("input[type='email']").value;
            const password = document.querySelector("input[type='password']").value;

            // Validação básica
            if (!email || !password) {
                alert("Por favor, preencha o e-mail e a senha.");
                return;
            }

            // Altera o texto do botão para indicar carregamento
            btnLogin.innerText = "Autenticando...";
            btnLogin.disabled = true;

            try {
                // Aqui o Front-end faz a chamada para a sua API REST no Back-end
                const response = await fetch("http://localhost:8080/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email: email, senha: password })
                });

                if (response.ok) {
                    const data = await response.json();
                    alert("Login realizado com sucesso! Redirecionando para o Dashboard...");
                    // window.location.href = "dashboard.html"; // Redirecionaria o usuário
                } else {
                    alert("Credenciais inválidas. Tente novamente.");
                }
            } catch (error) {
                console.error("Erro na requisição:", error);
                alert("Erro ao conectar com o servidor. Verifique se a API está rodando.");
            } finally {
                // Restaura o botão
                btnLogin.innerText = "Entrar no Sistema";
                btnLogin.disabled = false;
            }
        });
    }
});