document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DO HEADER (COMUM) ---
    const header = document.getElementById('main_header');
    if (header) { // Adicionamos uma verificação para segurança
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) { // Esconde apenas se rolar mais de 100px
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
            lastScrollY = currentScrollY;
        });
    }
    
    // --- LÓGICA DO MODAL DE BUSCA (COMUM) ---
    const searchBtnHeader = document.getElementById('search-btn');
    const modalOverlay = document.getElementById('search-modal-overlay');

    if (searchBtnHeader && modalOverlay) { 
        modalOverlay.innerHTML = `
            <div id="search-modal-content"> 
                <form id="search-form"> 
                    <input type="text" id="search-input" placeholder="What is in your mind?" autocomplete="off">
                    <button type="submit" class="btn" id="confirm-search-btn">Search</button>
                </form>
            </div>
        `;

        const searchForm = document.getElementById('search-form');
        const searchInput = document.getElementById('search-input');

        const openModal = () => {
            modalOverlay.classList.remove('hidden');
            searchInput.focus(); 
        };
        const closeModal = () => modalOverlay.classList.add('hidden');

        searchBtnHeader.addEventListener('click', openModal);
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) closeModal();
        });
        document.addEventListener('keydown', (event) => {
            if (!modalOverlay.classList.contains('hidden') && event.key === 'Escape') closeModal();
        });

        searchForm.addEventListener('submit', (event) => {
            event.preventDefault(); 
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `search.html?query=${encodeURIComponent(query)}&page=1`;
            } else {
                searchInput.focus();
            }
        });
    }

    // --- LÓGICA BOTÃO HOME (COMUM) ---
    const siteName = document.getElementById("site-name");
    if (siteName) {
        siteName.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    const discoverBtn = document.getElementById("landing-page-btn");
    if(discoverBtn) {
        discoverBtn.addEventListener('click', () =>{
            window.location.href = `search.html?query=random&page=1`;
        });
    }

    const seeMoreVegBtn = document.getElementById("veg-btn");
    if(seeMoreVegBtn) {
        seeMoreVegBtn.addEventListener("click", () => {
            window.location.href = `search.html?query=randomVeg&page=1`;
        });
    }

    const complementBtn = document.getElementById("complement-btn");
    if (complementBtn) {
        complementBtn.addEventListener("click", () => {
            window.location.href = `search.html?type=protein_veg`;
        });
    }
});