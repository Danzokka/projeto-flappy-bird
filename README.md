# Projeto Flappy Bird

Para dar início ao projeto, utilizei o HTML para criar um canvas que simula uma tela de celular, e então iniciei o desenvolvimento do código em JavaScript. Ao longo do projeto, pude aprimorar minhas habilidades nessa linguagem de programação, aprendendo novas técnicas e conceitos.

Por exemplo, aprendi a criar animações utilizando sprites e a manipular a posição e rotação dos elementos na tela. Também aprendi a lidar com eventos de clique do mouse e a utilizar funções para criar e atualizar elementos do jogo, como o cenário, o pássaro e os canos.

Além disso, aprendi a utilizar técnicas de detecção de colisão para fazer o pássaro evitar os canos e a criar um sistema de pontuação baseado no número de canos que o jogador consegue passar.

#### Primeira Etapa: Criar o cenário

Para criar o cenário do jogo, utilizei sprites e cortei cada um deles utilizando as coordenadas X e Y. Em seguida, adicionei cada sprite ao cenário usando a função drawImage.

Comecei com o background, mas como o sprite não ocupava toda a tela, optei por desenhá-lo duas vezes para que preenchesse a tela inteira. Repeti o processo para o foreground.

Em seguida, comecei a criar o modelo do pássaro, mas como há 3 modelos diferentes para ele no sprite, precisei criar uma animação para ele. Para fazer isso, criei um array com cada posição e, a cada frame do jogo, o sprite era trocado.

Recortei a tela de Get Ready e a de Game Over do sprite e criei uma condição para que a tela de Game Over aparecesse apenas quando o jogador perdesse.

Para os canos, cortei e montei a função draw() para eles, mas eles só aparecem quando o jogo começa.

#### Segunda etapa: Montar Esqueleto do Jogo

Neste ponto, eu já tinha criado a interface inicial do jogo, incluindo o fundo, o pássaro e a tela de 'Get Ready'. Agora, para tornar o jogo funcional, criei quatro estados: 'initial', 'getReady', 'game' e 'gameOver'. Embora o estado 'initial' e o 'getReady' possam parecer similares, ter o estado 'initial' ajuda a colocar o jogo em um loop mais facilmente.

Com os estados definidos, comecei a implementar as ações de cada um deles. No estado 'getReady', por exemplo, ao clicar na tela, o jogo iniciaria. No estado 'game', ao clicar para pular, o pássaro batia as asas. Já no estado 'gameOver', a tela de 'game over' era exibida e, ao clicar no botão 'start', o jogador retornava ao estado 'initial' para recomeçar o jogo.

#### Terceira Etapa: Implementar Funcionalidades
Estamos na etapa de implementação das funcionalidades do jogo. Inicialmente, precisamos fazer o pássaro bater as asas. Para isso, desenvolvemos um código que aumenta a altura do pássaro ao bater as asas. No entanto, para representar a gravidade, fazemos com que o pássaro caia com uma rotação de 90º para baixo. Ao bater as asas, o ângulo aumenta para 25º, indicando que o pássaro está subindo.

Para dar a sensação de que o pássaro está avançando, fizemos com que o cenário e os canos se movessem em direção ao pássaro em uma velocidade de 2 pixels por frame. Agora temos um jogo funcional, mas ainda precisamos criar um sistema de pontuação.

Para isso, criamos o que chamamos de "Hit Box", ou caixa de colisão, para o pássaro e os canos. Verificamos se a caixa de colisão do pássaro se sobrepõe à caixa de colisão dos canos, a fim de detectar colisões. Com isso resolvido, implementamos um sistema de pontuação que incrementa a pontuação do jogador sempre que ele passa por um cano e armazena a melhor pontuação no cache do usuário para que ele possa ver seu melhor desempenho no jogo.

Com essas funcionalidades implementadas, o jogo está pronto e jogável

### Considerações finais

Foi um projeto muito interessante de trabalhar, pois sou apaixonado pelo mundo dos jogos. Foi fascinante passar por todo o processo de criação, descobrir erros e encontrar maneiras mais eficientes de executar as tarefas. Um dos maiores aprendizados desse projeto foi a importância da arquitetura do programa, pensando em todas as suas implementações e como fazer com que elas se comuniquem entre si. Além disso, aprofundei meus conhecimentos em JavaScript e pude ver todo o seu poder na Web.
