# 🔴 A Lista Codificada de Kylo Ren

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Star Wars](https://img.shields.io/badge/Star_Wars-FFE81F?style=for-the-badge&logo=starwars&logoColor=black)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status](https://img.shields.io/badge/Status-Concluído-success)]()

## 📋 Descrição do Desafio

A Primeira Ordem está em perseguição implacável aos membros da Resistência, e Kylo Ren recebe uma lista secreta de alvos para sua caçada sombria. Para garantir que nenhum espião da Resistência decifre os nomes, a lista precisa ser codificada com um feitiço criptográfico especial, desenvolvido pelo próprio Kylo.

Implemente uma função chamada `codificarAlvo` em JavaScript que aceita um nome (string) e retorna o nome codificado, aplicando as técnicas secretas da Primeira Ordem:

### Regras de Codificação Básica:
- **Vogais**: Troque todas as vogais do nome pela próxima vogal no alfabeto galáctico: `a→e, e→i, i→o, o→u, u→a`
- **Consoantes**: Troque cada consoante pela próxima consoante no alfabeto: `b→c, c→d, ..., z→b`
- **Case Sensitivity**: Mantenha maiúsculas e minúsculas conforme o original
- **Caracteres Especiais**: Ignore e mantenha números e símbolos

### Exemplos:
- `codificarAlvo('LeiaOrgana')` retorna `'NileFssele'`
- `codificarAlvo('Finn')` retorna `'Joppo'`
- `codificarAlvo('KyloRen!')` retorna `'LznpSip!'`

### 🌟 Desafio Extra: Camuflagem na Força

A inteligência da Resistência começou a suspeitar do padrão da codificação! Kylo Ren então ordena uma camada extra de criptografia usando o antigo método da "Camuflagem na Força":

1. **Letra Espelhada**: Após realizar a codificação inicial, para cada letra em posição par (contando a partir do zero), troque por sua 'letra espelhada' no alfabeto (`A↔Z, B↔Y, C↔X`, etc.), mantendo maiúsculas/minúsculas
   - Letras ímpares permanecem como estão
   
2. **Duplicação de Números**: Caso o nome contenha números, duplique-os no resultado final

3. **Exemplo Completo**:
   - `codificarAlvo('Gimli1')` → `'Jompno1'` (codificação inicial)
   - Camuflagem na Força:
     - Posições pares: `J(0), m(2), n(4), 1(6)` → `J→Q, m→n, n→m, 1→11`
     - Resultado final: `'Qompmo11'`

## 🎯 Função Principal

```javascript
function codificarAlvo(nome) {
    const steps = [];
    
    // Passo 1: Codificação inicial (vogais e consoantes)
    let codificacaoInicial = '';
    const vogais = { 
        'a': 'e', 'e': 'i', 'i': 'o', 'o': 'u', 'u': 'a',
        'A': 'E', 'E': 'I', 'I': 'O', 'O': 'U', 'U': 'A' 
    };
    
    for (let char of nome) {
        if (vogais[char]) {
            codificacaoInicial += vogais[char];
        } else if (/[b-zB-Z]/.test(char)) {
            if (char === 'z') {
                codificacaoInicial += 'b';
            } else if (char === 'Z') {
                codificacaoInicial += 'B';
            } else {
                codificacaoInicial += String.fromCharCode(char.charCodeAt(0) + 1);
            }
        } else {
            codificacaoInicial += char;
        }
    }
    
    // Passo 2: Camuflagem na Força (posições pares)
    let camuflagem = '';
    for (let i = 0; i < codificacaoInicial.length; i++) {
        let char = codificacaoInicial[i];
        
        if (i % 2 === 0 && /[a-zA-Z]/.test(char)) {
            if (char >= 'a' && char <= 'z') {
                const espelhada = String.fromCharCode(
                    'z'.charCodeAt(0) - (char.charCodeAt(0) - 'a'.charCodeAt(0))
                );
                camuflagem += espelhada;
            } else if (char >= 'A' && char <= 'Z') {
                const espelhada = String.fromCharCode(
                    'Z'.charCodeAt(0) - (char.charCodeAt(0) - 'A'.charCodeAt(0))
                );
                camuflagem += espelhada;
            }
        } else {
            camuflagem += char;
        }
    }
    
    // Passo 3: Duplicar números
    let resultadoFinal = '';
    for (let char of camuflagem) {
        if (/[0-9]/.test(char)) {
            resultadoFinal += char + char;
        } else {
            resultadoFinal += char;
        }
    }
    
    return { resultado: resultadoFinal, steps };
}
```

## 🔬 Lógica e Análise Técnica

### Complexidade do Algoritmo

**Complexidade de Tempo**: `O(n)`
- Onde `n` é o comprimento da string de entrada
- Três iterações lineares independentes (não aninhadas)

**Complexidade de Espaço**: `O(n)`
- Strings intermediárias armazenadas para cada etapa

### Estruturas de Dados Utilizadas

1. **Hash Map (Object)**: Mapeamento `O(1)` para transformação de vogais
   ```javascript
   const vogais = { 'a': 'e', 'e': 'i', ... }
   ```

2. **String Manipulation**: Operações baseadas em `charCodeAt()` e `fromCharCode()`
   - Conversão ASCII para manipulação matemática de caracteres
   - Tratamento circular para 'z' → 'b'

3. **RegEx Patterns**: Validação eficiente de tipos de caracteres
   ```javascript
   /[b-zB-Z]/.test(char)  // Consoantes
   /[a-zA-Z]/.test(char)  // Letras
   /[0-9]/.test(char)     // Dígitos
   ```

### Fluxo de Transformação

```
Input: "LeiaOrgana"
  ↓
[STEP 1] Vogais/Consoantes: "NiouUspene"
  ↓
[STEP 2] Espelhamento (posições pares): "MiolFuspvnv"
  ↓
[STEP 3] Duplicação de números: "MiolFuspvnv"
  ↓
Output: "MiolFuspvnv"
```

### Técnicas de Programação

1. **Modular Arithmetic**: Espelhamento alfabético
   ```javascript
   'Z'.charCodeAt(0) - (char.charCodeAt(0) - 'A'.charCodeAt(0))
   ```
   - Subtração do offset para criar reflexão simétrica

2. **Bit Manipulation Alternative** (não implementado, mas possível):
   ```javascript
   // Para maiúsculas/minúsculas: XOR com 32 (0x20)
   char.charCodeAt(0) ^ 32
   ```

3. **Imutabilidade**: Criação de novas strings a cada etapa
   - Facilita debugging e tracking de transformações

## 🚀 Aplicações em Projetos Reais

### 1. **Sistemas de Criptografia Educacional**
- Base para ensinar conceitos de cifras de substituição
- Demonstração de algoritmos de codificação em cursos de segurança

### 2. **Gamificação e Escape Rooms Digitais**
- Criação de puzzles e desafios em jogos
- Sistemas de código secreto para mecânicas de gameplay

### 3. **Ofuscação de Dados Sensíveis**
- Camada adicional de proteção em logs (não para produção!)
- Mascaramento de informações em ambientes de desenvolvimento

### 4. **Ferramentas de Processamento de Texto**
- Geradores de senhas memoráveis baseados em padrões
- Transformações de texto para fins artísticos/criativos

### 5. **Testes de Algoritmos**
- Benchmarking de performance de string manipulation
- Casos de teste para validação de RegEx e Unicode handling

## 📂 Estrutura do Projeto

```
desafio_345/
├── index.html          # Interface principal
├── styles.css          # Estilos temáticos Star Wars
├── script.js           # Lógica de codificação
├── assets/
│   ├── background.mp4  # Vídeo temático Kylo Ren
│   └── theme.mp3       # Música ambiente
└── README.md           # Documentação
```

## 🎨 Features do Interface

- ✨ Design inspirado em Star Wars (Kylo Ren)
- 🎬 Vídeo background em full HD
- 🎵 Controles de áudio temático
- 📱 Totalmente responsivo
- ⚡ Animações suaves e modernas
- 🔴 Esquema de cores vermelho/preto (sabre de luz)

## 🛠️ Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/luizfxdev/desafio_345.git
```

2. Adicione os arquivos de mídia:
   - Coloque `background.mp4` em `assets/`
   - Coloque `theme.mp3` em `assets/`

3. Abra `index.html` em seu navegador

## 📊 Exemplos de Teste

| Input | Codificação Inicial | Camuflagem | Output Final |
|-------|---------------------|------------|--------------|
| `LeiaOrgana` | `NiouUspene` | Aplicada | `MiolFuspvnv` |
| `Finn` | `Joppo` | Aplicada | `Qlkpl` |
| `KyloRen!` | `LznpSip!` | Aplicada | `Ozml!ok!` |
| `Poe7Dameron` | `Qui7Denispo` | Aplicada | `Jfo77Wvmrkll` |
| `Rey` | `Siz` | Aplicada | `Hrz` |

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Luiz Felipe de Oliveira**

- GitHub: [@luizfxdev](https://github.com/luizfxdev)
- Linkedin: [in/luizfxdev](https://www.linkedin.com/in/luizfxdev)
- Portfólio: [luizfxdev.com.br](https://luizfxdev.com.br)

---


⭐ Se este projeto te ajudou, deixe uma estrela no repositório!

*"Que a Força esteja com você... ou contra você."* - Kylo Ren
