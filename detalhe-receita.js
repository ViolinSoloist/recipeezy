document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = "1686c322155b4041a883521d2f071057"; // Sua chave de API
    const recipeDetailContent = document.getElementById('recipe-detail-content');

    function getIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    async function fetchRecipeDetails(id) {
        
        // loader enquanto busca os dados
        recipeDetailContent.innerHTML = '<div class="feedback-container"><div class="loader"></div></div>';

        // /recipes/{id}/information
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

    // exibir detalhes da receita na página
    function displayRecipeDetails(recipe) {
        recipeDetailContent.innerHTML = ''; // Limpa o loader

        // .map => "iterador" 
        // array de objetos (ingredientes)
        // pra cada ingrediente, gera uma string de item de lista
        // no final, ingredientsHTML é um array de strings
        // .join('') junta as strings, agora todos os itens de pesquisa são uma única string
        const ingredientsHtml = recipe.extendedIngredients.map(ingredient => 
            `<li>${ingredient.original}</li>`
        ).join('');

        // mesma coisa, mas para instruções
        const instructionsHtml = recipe.analyzedInstructions[0]?.steps.map(step => 
            `<li>${step.step}</li>`
        ).join('') || '<li>No instructions available.</li>';

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

    // inicia o processo quando a página carrega
    const recipeId = getIdFromUrl();
    if (recipeId) {
        fetchRecipeDetails(recipeId);
    } else {
        recipeDetailContent.innerHTML = '<div class="feedback-container"><h2>No recipe ID found.</h2><p>Please select a recipe from the search page.</p></div>';
    }
});