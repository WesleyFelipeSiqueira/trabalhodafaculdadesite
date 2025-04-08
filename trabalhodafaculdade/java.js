// aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener('DOMContentLoaded', function () {

  // troca a imagem do médico ao passar o mouse (efeito interativo)
  const medico = document.getElementById('medico');
  if (medico) {
    medico.addEventListener('mouseover', function () {
      medico.src = "img/foto2.png"; // altera a imagem ao passar o mouse
    });
    medico.addEventListener('mouseout', function () {
      medico.src = "img/foto1.png"; // volta para a imagem original ao tirar o mouse
    });
    medico.addEventListener('dblclick', function () {
      medico.src = "img/foto3.png"; // troca a imagem ao dar duplo clique
    });
  }

  // evento para processar o quiz quando o botão "Ver Resultado" for clicado
  const enviarBtn = document.getElementById('enviar');
  if (enviarBtn) {
    enviarBtn.addEventListener('click', function () {
      // captura as respostas selecionadas
      const sono = document.querySelector('input[name="sono"]:checked');
      const atividade = document.querySelector('input[name="atividade"]:checked');
      const checkup = document.querySelector('input[name="checkup"]:checked');
      const alimentacao = document.querySelector('input[name="alimentacao"]:checked');
      const resultadoEl = document.getElementById('resultado');

      // verifica se todas as perguntas foram respondidas
      if (!sono || !atividade || !checkup || !alimentacao) {
        resultadoEl.textContent = "Por favor, responda todas as perguntas.";
        return;
      }

      // calcula a pontuação com base nas respostas
      let score = 0;
      if (sono.value === "sim") score++;
      if (atividade.value === "sim") score++;
      if (checkup.value === "sim") score++;
      if (alimentacao.value === "boa") score++;
      else if (alimentacao.value === "razoavel") score += 0.5;

      // gera o feedback de acordo com a pontuação
      let feedback = "";
      if (score >= 3.5) {
        feedback = "Parabéns! Sua saúde parece estar bem cuidada. Continue assim! ";
      } else if (score >= 2) {
        feedback = "Você está no caminho certo, mas pode melhorar alguns hábitos! ";
      } else {
        feedback = "É importante cuidar melhor da sua saúde. Considere marcar uma consulta. ";
      }

      // exibe o resultado na tela
      resultadoEl.textContent = feedback;
    });
  }
});

// preenchimento automático de endereço ao digitar o CEP
document.getElementById("cep").addEventListener("blur", function () {
  const cep = this.value.replace(/\D/g, ""); // remove caracteres não numéricos
  if (cep.length !== 8) return; // valida o comprimento do CEP

  // consulta a API ViaCEP
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((res) => res.json())
    .then((data) => {
      if (!data.erro) {
        // preenche os campos com os dados retornados
        document.getElementById("endereco").value = data.logradouro;
        document.getElementById("bairro").value = data.bairro;
        document.getElementById("cidade").value = data.localidade;
        document.getElementById("estado").value = data.uf;
      } else {
        alert("CEP não encontrado.");
      }
    })
    .catch((err) => {
      alert("Erro ao buscar CEP."); // tratamento de erro na requisição
    });
});
