document.addEventListener('DOMContentLoaded', () => {
    // --- CONSTANTES E VARIÁVEIS DE ESTADO ---
    const API_KEY = "1686c322155b4041a883521d2f071057";
    const RESULTADOS_POR_PAGINA = 12;

    // Elementos do DOM
    const searchPageContent = document.getElementById('search-page-content');
    const loadMoreContainer = document.getElementById('load-more-container');
    
    // Variáveis para gerenciar o estado da página
    let currentPage = 1;
    let currentQuery = '';
    let totalResults = 0;
    let isLoading = false; // Para evitar múltiplos cliques enquanto carrega
    let currentMinProtein = 20;

    // assim que muda pra search.html => carrega search-page.js => assim que que carrega search-page.js chama essa função initSearchPage()
    function initSearchPage() {
        const params = new URLSearchParams(window.location.search);
        const query = params.get('query');
        const type = params.get('type'); // 
        
        currentPage = parseInt(params.get('page')) || 1; 

        if (type === 'protein_veg') {
            currentQuery = 'protein_veg'; 
            currentMinProtein = 20;
            fetchFilteredSearch(true); 
        } 
        else if (query) {
            currentQuery = query; // Define o estado da busca atual
            fetchAndDisplayRecipes(currentQuery, currentPage, true);
        } 
        else {
            // Se não houver nenhum parâmetro conhecido
            displayFeedback("<h2>Search something</h2><p>Use the search bar to find new recipes.</p>");
        }
    }

    // sa poha toda SÓ pra parte fucking proteina vegetariana
    // Substitua sua função fetchFilteredSearch por esta versão completa

    async function fetchFilteredSearch(isInitialSearch = false) {
        if (isLoading) return;
        isLoading = true;

        if (isInitialSearch) {
            displayFeedback(`<div class="loader"></div><p>Finding high-protein vegetarian recipes with at least ${currentMinProtein}g of protein...</p>`);
        }

        try {
            // A URL agora usa a variável de estado 'currentMinProtein'
            const url = `https://api.spoonacular.com/recipes/complexSearch?diet=vegetarian&minProtein=${currentMinProtein}&sort=random&number=${RESULTADOS_POR_PAGINA}&apiKey=${API_KEY}`;
            
            const response = await fetch(url);
            if (!response.ok) throw new Error(`API error: ${response.status}`);
            
            const data = await response.json();
            
            if (isInitialSearch) {
                totalResults = data.totalResults;
                searchPageContent.innerHTML = '';
                
                const title = `High-Protein Vegetarian Recipes`;

                // O HTML do cabeçalho agora inclui o formulário de filtro
                const headerHTML = `
                    <div class="search-results-header">
                        <div id="header-left">
                            <h1>${title}</h1>
                            <p>${totalResults} recipes found.</p>
                        </div>
                        <div id="header-right">
                            <form id="protein-filter-form">
                                <label for="min-protein-input">Min. Protein:</label>
                                <input type="number" id="min-protein-input" value="${currentMinProtein}" min="1" title="Grams of protein">
                                <button type="submit" class="btn">Update</button>
                            </form>
                        </div>
                    </div>
                    <div id="results-container-grid"></div>
                `;
                searchPageContent.insertAdjacentHTML('beforeend', headerHTML);
                
                // =======================================================
                // ADICIONA O EVENTO AO FORMULÁRIO RECÉM-CRIADO
                // =======================================================
                const proteinForm = document.getElementById('protein-filter-form');
                if(proteinForm) {
                    proteinForm.addEventListener('submit', (event) => {
                        event.preventDefault(); // Previne o recarregamento da página
                        const newMinProtein = document.getElementById('min-protein-input').value;
                        
                        // Atualiza o estado e refaz a busca inicial
                        currentMinProtein = parseInt(newMinProtein) || 20; // Usa 20 como fallback
                        fetchFilteredSearch(true); // O 'true' limpa os resultados antigos
                    });
                }
            }
            
            appendRecipes(data.results, false);

        } catch (error) {
            handleFetchError(error);
        } finally {
            isLoading = false;
        }
    }

    /**
     * Função central para buscar e exibir receitas.
     * @param {string} query - O termo de busca.
     * @param {number} page - O número da página a ser buscada.
     * @param {boolean} isInitialSearch - Se é a primeira busca (para limpar a página).
     */
    async function fetchAndDisplayRecipes(query, page, isInitialSearch = false) {
        if (isLoading) return; // já estiver carregando, não faz nada
        isLoading = true;

        // loader apenas na busca inicial
        if (isInitialSearch) {
            displayFeedback('<div class="loader"></div><p>Searching for recipes...</p>');
        } else if (document.getElementById('load-more-btn')) {
            //botão para o estado de "carregando"
            document.getElementById('load-more-btn').textContent = 'Loading...';
            document.getElementById('load-more-btn').disabled = true;
        }

        try {
            const offset = (page - 1) * RESULTADOS_POR_PAGINA;
            
            let response;

            if(query !== "random" && query !== "randomVeg") {
                response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}&number=${RESULTADOS_POR_PAGINA}&offset=${offset}`);
            } else if(query === "random"){
                response = await fetch(`https://api.spoonacular.com/recipes/random?number=${RESULTADOS_POR_PAGINA}&apiKey=${API_KEY}`);
            } else if(query === "randomVeg") {
                response = await fetch(`https://api.spoonacular.com/recipes/random?number=${RESULTADOS_POR_PAGINA}&include-tags=vegetarian&apiKey=${API_KEY}`);
            }

            if (!response.ok) throw new Error(`API error: ${response.status}`);
            
            const data = await response.json();
            console.log(data);
            
            if(query !== "random" && query !== "randomVeg") {
                // if (busca inicial) => renderiza o cabeçalho e limpa a página (se for carregar mais não é pra limpar página, manter atual e anexar)
                if (isInitialSearch) {
                    totalResults = data.totalResults; // Armazena o total de resultados
                    searchPageContent.innerHTML = ''; // Limpa a área de conteúdo
                    
                    const headerHTML = `
                        <div class="search-results-header">
                            <div id="header-left">
                                <h1>Results for "${query}"</h1>
                                <p>${totalResults} recipes found.</p>
                            </div>
                        </div>
                        <div id="results-container-grid"></div>
                    `;
                    searchPageContent.insertAdjacentHTML('beforeend', headerHTML);
                }
                
                // Anexa os resultados (seja na busca inicial ou no "carregar mais")
                appendRecipes(data.results, false);

            } else{ // random (discover)
                searchPageContent.innerHTML = ''; 
                const headerHTML = `
                    <div class="search-results-header">
                        <div id="header-left">
                            <h1>Discover new recipes:</h1>
                        </div>
                    </div>
                    <div id="results-container-grid"></div>
                `;
                searchPageContent.insertAdjacentHTML('beforeend', headerHTML);
                appendRecipes(data.recipes, true);
                
            }

        } catch (error) {
            console.error("Failed to fetch recipes:", error);
            displayFeedback("<h2>Oops! Something went wrong.</h2><p>Unable to load results. Please, try again later.</p>", true);
        } finally {
            isLoading = false; // Libera o estado de "carregando"
        }
    }
    
    /**
     * Anexa os cartões de receita ao grid.
     */
    // Em search-page.js

    function appendRecipes(recipes, isRandom) {
        const resultsContainer = document.getElementById('results-container-grid');
        if (!resultsContainer) return;

        // ============== CORREÇÃO APLICADA AQUI ==============
        // Primeiro, checa se 'recipes' é nulo, indefinido ou se o array está vazio.
        // A verificação '!recipes' pega os casos de null e undefined de forma segura.
        if (!recipes || recipes.length === 0) {
            // Mostra a mensagem de "não encontrado" apenas se for a primeira página.
            if (currentPage === 1) {
                displayFeedback("<h2>Nothing was found</h2><p>Your API quota may have been reached or there are no results for this search.</p>", true);
            }
            // Também remove os botões se não houver mais receitas
            updateActionButtons(isRandom, true); // O 'true' indica que não há mais resultados
            return;
        }
        // ======================================================

        recipes.forEach(recipe => {
            const recipeCard = `
                <a href="#" class="recipe-card">
                    <div class="recipe-card-image-wrapper">
                        <img src="${recipe.image}" alt="${recipe.title}">
                    </div>
                    <div class="recipe-card-content">
                        <h3>${recipe.title}</h3>
                    </div>
                </a>
            `;
            resultsContainer.insertAdjacentHTML('beforeend', recipeCard);
        });

        updateActionButtons(isRandom);
    }

    // Também vamos fazer um pequeno ajuste em `updateActionButtons` para lidar com o fim dos resultados.
    // Substitua sua função `updateActionButtons` por esta:
    function updateActionButtons(isRandom, noMoreResults = false) {
        loadMoreContainer.innerHTML = '';

        const recipesLoaded = currentPage * RESULTADOS_POR_PAGINA;
        
        // Condição para mostrar o botão 'See More'
        const shouldShowSeeMore = isRandom || (recipesLoaded < totalResults);

        // Se noMoreResults for true, não mostra o botão 'See More'
        if (shouldShowSeeMore && !noMoreResults) {
            const seeMoreBtn = document.createElement('button');
            seeMoreBtn.id = 'load-more-btn';
            seeMoreBtn.className = 'btn';
            seeMoreBtn.textContent = isRandom ? 'Discover More' : 'See More';
            
            seeMoreBtn.addEventListener('click', () => {
                if (isRandom) {
                    // Para busca aleatória, a página não incrementa, apenas busca de novo
                    fetchAndDisplayRecipes(currentQuery, 1, true); // Recarrega a página com novas receitas
                } else {
                    currentPage++;
                    fetchAndDisplayRecipes(currentQuery, currentPage);
                }
            });
            loadMoreContainer.appendChild(seeMoreBtn);
        }

        // O botão "Voltar ao Topo" pode aparecer mesmo se não houver mais resultados
        if (currentPage > 1 || document.querySelector('.recipe-card')) {
            const backToTopBtn = document.createElement('button');
            backToTopBtn.id = 'back-to-top-btn';
            backToTopBtn.className = 'btn btn-secondary'; 
            backToTopBtn.textContent = 'Back to top';
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            loadMoreContainer.appendChild(backToTopBtn);
        }
    }

    function displayFeedback(htmlContent, clearContent = true) {
        if(clearContent) searchPageContent.innerHTML = '';
        searchPageContent.insertAdjacentHTML('beforeend', `<div class="feedback-container">${htmlContent}</div>`);
    }

    function handleFetchError(error) {
        console.error("Failed to fetch recipes:", error);
        displayFeedback("<h2>Oops! Something went wrong.</h2><p>Unable to load results. Please, try again later.</p>", true);
    }

    initSearchPage();
});