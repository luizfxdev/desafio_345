// Elementos do DOM
const targetInput = document.getElementById('target-input');
const encodeBtn = document.getElementById('encode-btn');
const resetBtn = document.getElementById('reset-btn');
const resultSection = document.getElementById('result-section');
const resultContent = document.getElementById('result-content');
const themeAudio = document.getElementById('theme-audio');
const playAudioBtn = document.getElementById('play-audio');
const pauseAudioBtn = document.getElementById('pause-audio');

// Controles de Áudio
playAudioBtn.addEventListener('click', () => {
  themeAudio.play();
});

pauseAudioBtn.addEventListener('click', () => {
  themeAudio.pause();
});

// Função principal de codificação
function codificarAlvo(nome) {
  const steps = [];

  // Passo 1: Codificação inicial (vogais e consoantes)
  let codificacaoInicial = '';
  const vogais = { a: 'e', e: 'i', i: 'o', o: 'u', u: 'a', A: 'E', E: 'I', I: 'O', O: 'U', U: 'A' };

  for (let char of nome) {
    if (vogais[char]) {
      codificacaoInicial += vogais[char];
    } else if (/[b-zB-Z]/.test(char)) {
      // Consoantes: próxima letra
      if (char === 'z') {
        codificacaoInicial += 'b';
      } else if (char === 'Z') {
        codificacaoInicial += 'B';
      } else {
        codificacaoInicial += String.fromCharCode(char.charCodeAt(0) + 1);
      }
    } else {
      // Números e símbolos permanecem
      codificacaoInicial += char;
    }
  }

  steps.push({
    title: 'Passo 1: Codificação Inicial',
    content: `Entrada: "${nome}"\nVogais trocadas (a→e, e→i, i→o, o→u, u→a)\nConsoantes avançadas (b→c, z→b)\nResultado: "${codificacaoInicial}"`
  });

  // Passo 2: Camuflagem na Força (posições pares)
  let camuflagem = '';
  let detalheCamuflagem = 'Aplicando letra espelhada em posições pares:\n';

  for (let i = 0; i < codificacaoInicial.length; i++) {
    let char = codificacaoInicial[i];

    if (i % 2 === 0 && /[a-zA-Z]/.test(char)) {
      // Posição par: letra espelhada
      if (char >= 'a' && char <= 'z') {
        const espelhada = String.fromCharCode('z'.charCodeAt(0) - (char.charCodeAt(0) - 'a'.charCodeAt(0)));
        detalheCamuflagem += `  Pos ${i}: '${char}' → '${espelhada}'\n`;
        camuflagem += espelhada;
      } else if (char >= 'A' && char <= 'Z') {
        const espelhada = String.fromCharCode('Z'.charCodeAt(0) - (char.charCodeAt(0) - 'A'.charCodeAt(0)));
        detalheCamuflagem += `  Pos ${i}: '${char}' → '${espelhada}'\n`;
        camuflagem += espelhada;
      }
    } else {
      camuflagem += char;
    }
  }

  steps.push({
    title: 'Passo 2: Camuflagem na Força',
    content: `${detalheCamuflagem}Resultado: "${camuflagem}"`
  });

  // Passo 3: Duplicar números
  let resultadoFinal = '';
  let detalheNumeros = 'Duplicando números encontrados:\n';
  let numerosEncontrados = false;

  for (let char of camuflagem) {
    if (/[0-9]/.test(char)) {
      resultadoFinal += char + char;
      detalheNumeros += `  '${char}' → '${char}${char}'\n`;
      numerosEncontrados = true;
    } else {
      resultadoFinal += char;
    }
  }

  if (numerosEncontrados) {
    steps.push({
      title: 'Passo 3: Duplicação de Números',
      content: `${detalheNumeros}Resultado: "${resultadoFinal}"`
    });
  } else {
    steps.push({
      title: 'Passo 3: Duplicação de Números',
      content: `Nenhum número encontrado.\nResultado: "${resultadoFinal}"`
    });
  }

  return { resultado: resultadoFinal, steps };
}

// Evento do botão DECIFRAR
encodeBtn.addEventListener('click', () => {
  const input = targetInput.value.trim();

  if (!input) {
    alert('Por favor, digite um nome para codificar!');
    return;
  }

  const { resultado, steps } = codificarAlvo(input);

  // Limpar resultado anterior
  resultContent.innerHTML = '';

  // Adicionar cada passo
  steps.forEach((step, index) => {
    setTimeout(() => {
      const stepDiv = document.createElement('div');
      stepDiv.className = 'step';
      stepDiv.innerHTML = `
                <div class="step-title">${step.title}</div>
                <div class="step-content">${step.content}</div>
            `;
      resultContent.appendChild(stepDiv);

      // Após o último passo, mostrar resultado final
      if (index === steps.length - 1) {
        setTimeout(() => {
          const finalDiv = document.createElement('div');
          finalDiv.className = 'final-result';
          finalDiv.innerHTML = `
                        <div class="final-result-label">ALVO CODIFICADO</div>
                        <div class="final-result-value">${resultado}</div>
                    `;
          resultContent.appendChild(finalDiv);
        }, 200);
      }
    }, index * 300);
  });

  // Mostrar seção de resultado
  resultSection.classList.add('show');

  // Scroll suave para o resultado
  setTimeout(() => {
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
});

// Evento do botão RETORNAR
resetBtn.addEventListener('click', () => {
  targetInput.value = '';
  resultContent.innerHTML = '';
  resultSection.classList.remove('show');
  targetInput.focus();
});

// Enter no input para acionar codificação
targetInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    encodeBtn.click();
  }
});
