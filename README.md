# Recipeezy
Site de receitas, projeto para Codelabs Sanca usando Spoonacular API (plano gratuito, aproximadamente 100 fetchs diários).
(O site seria originalmente em português, porém a API é em inglês e extremamente completa, então quis usá-la e, portanto, fiz o site em inglês porque as receitas estavam em tal língua).  

Feito usando HTML, JavaScript e CSS puro, sem bibliotecas.

## PROCESSO DE CRIAÇÃO:

### Design e layout em geral
Usei o Figma para encontrar um bom design. Como não era próprio para um site se receitas, tive que adaptá-lo.

### Página inicial:

#### Header
Na página inicial, fiz um header simples de fundo branco, que continha o nome do site (o qual, quando clicado, levava à página inicial) e com um "botão" que dava scroll na página até aparecer a sessão de comidas vegetarianas. Além disso, tinha também um botão para realizar pesquisas, o mecanismo principal para fazer buscas. Ao clicá-lo, abre-se um modal que contém um forms e um botão de submit, que será explicado mais tarde.
Por último, o header continha uma lógica em JavaScript que fazia ele recolher (esconder) ou aparecer dependendo do sentido do scroll (caso o usuário fosse para baixo no site, o header (navbar) deslizaria e se esconderia, e o inverso aconteceria caso o scroll fosse para cima.

#### Conteúdo da página inicial
Logo após o header/navbar, começa um hero section, que introduz ao site e apresenta o botão "Discover", responsável por buscar receitas aleatórias. Todo o funcionamento de busca será abordado posteriormente. Depois, há uma imagem de função estética e, em baixo, uma sessão sobre comidas vegetarianas, contendo uma imagem e dois botões, sendo o primeiro um buscador de receitas vegetarianas aleatórias e o segundo um buscador de receitas proteicas vegetarianas aleatórias que possui a opção de selecionar a quantidade mínima de proteínas em gramas.

No PC, a sessão vegetariana é dividade em duas partes horizontais, tendo os textos e os botões do lado esquerdo e a imagem do lado direito. Já para versão mobile, a imagem é mostrada de forma individual após o título da sessão e os textos com botões são exibidos abaixo da imagem. 

#### Footer ou rodapé do site
A parte esquerda exibe hiperlinks relacionados a mim (mídias sociais, github, etc) e a parte direita apresenta links e direcionamentos para conteúdos referentes ao site de receitas ou à universidade, como o site da API, Codelab Sanca e o ICMC.
Tanto os hiperlinks quanto qualquer coisa clicável dessa página possuem interatividade com hover (CSS), mostrando, de forma intuitiva, que o botão/sessão é clicável.


### Página de pesquisa:
Exibida após realizar uma busca ou clicar em um botão que as faz automaticamente, a página HTML muda para uma responsável por exibir os resultados da busca.
O site se basea no uso de parâmetros dentro da URL do próprio site, para entender qual tipo de busca deve realizar (como o youtube faz). Para tanto, foram usadas funções e técnicas para ler e modificar URL. Isso permite que não só as informações/buscas não sejam perdidas ao recarregar o site, mas também que o resultado das buscas e as receitas em si sejam compartilháveis por links.
As formas possíveis são:
  1 - Botão de pesquisar no navbar do site:
  Pesquisa por receitas relacionadas ao termo pesquisado (nome e ingrediente).
  2 - Botão "Discover":
  Busca por receitas aleatórias, de modo a "descobrir" novos modos de preparar comidas dos mais distintos tipos.
  3 - Botão "See more":
  Busca por receitas vegetarianas aleatórias.
  4 - Botão "Complement my diet":
  Busca por receitas com tags: aleatório, vegetariano, minProtein (procura receitas vegetarianas aleatórias que tenham quantidade mínima de proteína em gramas (regulável)).

As receitas são exibidas em cards, os quais contêm a imagem e o título da receita. Os cards são exibidos em fila e possuem quebra de linha e larguras máxima e mínima, fazendo eles terem comportamento similar a como os vídeos no youtube são exibidos (as thumbnails dos vídeos vão ficando maiores ou menores proporcionalmente de acordo com a largura da tela, mas, caso ela passe dos limites, ocorre quebra de linha (cada linha passa a ter menos ou mais colunas, usando a propriedade flex-wrap, que permite ter controle sobre qual seria o tamanho adequado de cada card).
Esse aparato também funciona para mobile, exibindo apenas uma coluna e mantendo a legibilidade das informações dos cards. Juntou o útil ao agradável.

A parte mais satisfatória (e uma das mais demoradas de implementar) é a estilização dos cards dessa página.
Eles possuem borda arredondada, sombreamento e, ao dar hover, o card desliza levemente para cima e a imagem ganha um zoom leve também. Além disso, a sombra do card é minimamente aumentada para dar impressão de que o card "levitou" ou "levantou".

Ademais, a página trata diversos dos erros que podem acontecer, ao que se refere à busca API, etc.
(Tratamento se baseia puramente na percepção do problema em si e na exibição da provável causa para o usuário).

Ao clicar no card de uma receita, a URL muda para outra página HTML responsável por mostrar as informações da receita, contendo como parâmentro o ID da receita. De forma mais simples, ao mudar a página HTML para a que vai exibir as informações da receita, o arquivo .js respectivo daquela irá ler o parâmetro (ID) e realizará uma nova busca com todas as informações necessárias com base no ID (imagem, título, tempo de preparo, porções, sumário, receitas similares, ingredientes e modo de preparo).

### Página de detalhes da receita:
Como dito anteriormente, essa exibe as principais informações necessárias: Imagem, título, tempo de preparo, etc.

A página não tem muito segredo: apresenta o header e o footer como todas as outras páginas e, basicamente, só CSS pra deixar tudo bonitinho (um terço de espaço para os ingredientes e dois terços para o modo de preparo).

### Conclusão
Em suma, foi uma experiência de bastante aprendizado (e bastante corrida, pois tive que me esforçar bastante pra entregar dentro do prazo...)
Primeira vez trabalhando com APIs e algumas outras coisas. Também aprendi outros pequenos fatos interessantes.
É isso! Aproveitem para visitar: https://violinsoloist.github.io/recipeezy e boa cozinhada! :)
