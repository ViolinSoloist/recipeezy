document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = "1686c322155b4041a883521d2f071057"; // Sua chave de API
    const recipeDetailContent = document.getElementById('recipe-detail-content');

    /**
     * Pega o ID da receita da URL.
     */
    function getIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    /**
     * Busca os detalhes da receita na API.
     */
    async function fetchRecipeDetails(id) {
        // Mostra um loader enquanto busca os dados
        recipeDetailContent.innerHTML = '<div class="feedback-container"><div class="loader"></div></div>';

        // O endpoint para buscar por ID é /recipes/{id}/information
        const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`API Error: ${response.status}`);
            
            const recipeData = await response.json();
            displayRecipeDetails(recipeData);

        } catch (error) {
            console.error("Failed to fetch recipe details:", error);
            recipeDetailContent.innerHTML = '<div class="feedback-container"><h2>Oops! Could not load recipe.</h2><p>Please try again later.</p></div>';
        }
    }

    /**
     * Exibe os detalhes da receita na página.
     */
    function displayRecipeDetails(recipe) {
        recipeDetailContent.innerHTML = ''; // Limpa o loader

        // Gera o HTML para a lista de ingredientes
        const ingredientsHtml = recipe.extendedIngredients.map(ingredient => 
            `<li>${ingredient.original}</li>`
        ).join('');

        // Gera o HTML para o passo a passo das instruções
        const instructionsHtml = recipe.analyzedInstructions[0]?.steps.map(step => 
            `<li>${step.step}</li>`
        ).join('') || '<li>No instructions available.</li>';

        // Monta o HTML final da página de detalhes
        const detailHtml = `
            <div class="recipe-detail-header">
                <h1>${recipe.title}</h1>
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-detail-image">
            </div>

            <div class="quick-info-bar">
                <span>🕒 ${recipe.readyInMinutes} minutes</span>
                <span>🍽️ ${recipe.servings} servings</span>
            </div>

            <div class="recipe-summary">
                ${recipe.summary}
            </div>

            <div class="recipe-columns">
                <div class="recipe-ingredients">
                    <h2>Ingredients</h2>
                    <ul>${ingredientsHtml}</ul>
                </div>

                <div class="recipe-instructions">
                    <h2>Instructions</h2>
                    <ol>${instructionsHtml}</ol>
                </div>
            </div>
        `;

        recipeDetailContent.innerHTML = detailHtml;
    }

    // Inicia o processo quando a página carrega
    const recipeId = getIdFromUrl();
    if (recipeId) {
        fetchRecipeDetails(recipeId);
    } else {
        recipeDetailContent.innerHTML = '<div class="feedback-container"><h2>No recipe ID found.</h2><p>Please select a recipe from the search page.</p></div>';
    }
});