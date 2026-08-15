# Fabio7X Mini Game Kit

> Um kit open source, em português, para transformar ideias de arcade em experiências web pequenas, rápidas e personalizáveis.

[![Abrir demo](https://img.shields.io/badge/ABRIR_DEMO-00d9ff?style=for-the-badge&logo=googlechrome&logoColor=07121b)](https://kasulajunio.github.io/fabio7x-mini-game-kit/)
[![Licença MIT](https://img.shields.io/badge/LICEN%C3%87A-MIT-9b5cff?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)
[![Mobile first](https://img.shields.io/badge/MOBILE-FIRST-ff3e67?style=for-the-badge&logo=android&logoColor=white)](https://kasulajunio.github.io/fabio7x-mini-game-kit/)

O projeto reúne três mecânicas independentes em **HTML, CSS e JavaScript puro**. A página `index.html` também funciona como uma demonstração jogável, sem etapa de build, contas de terceiros ou chaves de API.

## Demo online

Abra a [demo jogável do Mini Game Kit](https://kasulajunio.github.io/fabio7x-mini-game-kit/) para testar as três mecânicas diretamente no navegador. Ela funciona em celular e computador, com controles de toque, teclado e pausa onde aplicável.

| Módulo | O que demonstra | Controle |
| --- | --- | --- |
| **Neon Reflex** | Reação e pontuação sob tempo | Clique ou toque |
| **Pixel Dodge** | Movimento lateral e colisão | Setas ou A/D |
| **Memory Pulse** | Estado de cartas e pares | Clique ou toque |

## Jogar no celular

Os três exemplos agora priorizam alvos maiores, leitura clara de status e controles por toque. O **Neon Reflex** aceita toque direto no alvo. O **Pixel Dodge** ganhou botões grandes de esquerda e direita, além de teclado com setas ou A/D. O **Memory Pulse** foi ajustado para cartas confortáveis de tocar em telas menores.

Nos jogos contínuos, o botão **Pausar** interrompe a rodada e a tecla `P` também alterna pausa e retorno. O kit usa `requestAnimationFrame` para o movimento do Pixel Dodge, reduzindo a sensação de irregularidade em telas com taxas de atualização diferentes.

## Executar

Faça o clone do repositório e abra `index.html` no navegador. Para um servidor local simples, use qualquer extensão de servidor estático do seu editor. O projeto não contém segredo, rastreador ou dependência de produção.

## Reutilizar uma mecânica

As três implementações estão em [`src/demo.js`](src/demo.js), em funções isoladas que retornam uma função de limpeza. Para transformar uma delas em um jogo próprio, mantenha a estrutura do ciclo de vida: criar os elementos dentro da área do jogo, registrar eventos e remover intervalos/listeners ao encerrar a sessão.

```js
const cleanup = neonReflex();
// Ao trocar de tela ou reiniciar o jogo:
cleanup();
```

## Do kit para um jogo completo

O Mini Game Kit é uma base de estudo. Para ver como uma ideia pode virar uma experiência arcade maior, abra também o [NEXO Rift Runner](https://kasulajunio.github.io/nexo-rift-runner.html), jogo gratuito da Fabio7X com corrida, energia, impulso, recorde local e controles pensados para telas pequenas.

## Próximas evoluções

O kit foi pensado como base de estudo. Uma continuação pode incluir fases, melhor placar local, som, acessibilidade ampliada, placar remoto ou novos estilos visuais. Cada adição deve manter o foco em aprendizado, leveza e experiência respeitosa.

## Contribuir

As orientações estão em [CONTRIBUTING.md](CONTRIBUTING.md). Para uma primeira contribuição, a tarefa de adicionar pausa e controles acessíveis ao Neon Reflex está aberta em [#1](https://github.com/kasulajunio/fabio7x-mini-game-kit/issues/1).

## Licença

Distribuído sob a licença MIT. Veja [`LICENSE`](LICENSE).

Criado por [Fabio7X](https://github.com/kasulajunio).
