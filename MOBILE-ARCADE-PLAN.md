# Plano de evolução mobile — Fabio7X Mini Game Kit

## Objetivo

Elevar a demonstração para uma experiência mais confortável no celular, sem sacrificar a simplicidade de HTML, CSS e JavaScript puro.

| Risco | Melhoria aplicada | Verificação |
| --- | --- | --- |
| Alvos pequenos no toque | Núcleo do Neon Reflex ampliado para 70 px no celular. | Teste de toque em viewport móvel. |
| Desvio dependente de teclado | Botões de toque grandes e suporte a pressionar/segurar. | Pixel Dodge jogável sem teclado. |
| Pausas e estados confusos | Pausa no Reflex e Dodge, com overlay explícito. | Cronômetro e objetos congelam. |
| Movimento irregular | Pixel Dodge usa `requestAnimationFrame`. | Obstáculos fluem em taxa de tela variável. |
| Baixo retorno visual | Brilho, animações, vibração opcional e estados de pontuação. | Feedback visível após toque, colisão e vitória. |

## Validação inicial

Na prévia HTTP local, o **Neon Reflex** iniciou com alvo criado, contador ativo e pausa funcional, apresentando o overlay “PAUSADO” ao interromper a rodada. O **Pixel Dodge** iniciou com a nave renderizada e os controles táteis habilitados. O **Memory Pulse** carregou a grade com oito cartas e contagem de pares, mantendo pausa desabilitada por não usar cronômetro contínuo.

Em 15 de agosto de 2026, a versão pública publicada em https://kasulajunio.github.io/fabio7x-mini-game-kit/ foi verificada. O Neon Reflex criou o alvo e habilitou pausa; o Pixel Dodge exibiu os controles móveis e respondeu ao comando de movimento. A experiência foi projetada com regras responsivas para telas de até 610 px; a próxima revisão em aparelho físico pode complementar esta validação com feedback de uso real.

Após a correção do ciclo de vida dos listeners, o Pixel Dodge foi reiniciado e alternado entre jogos repetidamente. Em cada nova rodada, um toque no controle esquerdo deslocou a nave exatamente de 46% para 38%, sem acúmulo de movimentos. Isso confirma a remoção dos listeners de toque ao trocar ou reiniciar a partida.

Na versão pública final, os três jogos foram verificados: Neon Reflex iniciou com um alvo ativo e pausa habilitada; Pixel Dodge revelou controles de toque e movimento único por comando; Memory Pulse renderizou oito cartas e o contador inicial de pares. A demonstração pode ser aberta em https://kasulajunio.github.io/fabio7x-mini-game-kit/. A revisão em aparelho físico continua recomendada para colher sensação de toque e legibilidade em condições reais.
