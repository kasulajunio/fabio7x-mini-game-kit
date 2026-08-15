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

Na prévia HTTP local, o **Neon Reflex** iniciou com alvo criado, contador ativo e pausa funcional, apresentando o overlay “PAUSADO” ao interromper a rodada. O **Pixel Dodge** iniciou com a nave renderizada e os controles táteis habilitados. A próxima validação cobre Memory Pulse e o viewport de celular antes da publicação no GitHub Pages.
