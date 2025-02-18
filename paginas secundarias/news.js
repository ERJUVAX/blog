const apiKey = 'efd2156a99624722804a45b8266aa500'; // Reemplaza con tu API Key de NewsAPI
const noticiasContainer = document.getElementById('noticias-container');

async function obtenerNoticias() {
    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=videojuegos&language=es&apiKey=${apiKey}`);
        const data = await response.json();

        // Verificamos si la respuesta es válida y tiene artículos
        if (data && data.articles && data.articles.length > 0) {
            noticiasContainer.innerHTML = ''; // Limpiar antes de agregar nuevas noticias

            data.articles.slice(0, 5).forEach(noticia => { // Muestra solo 5 noticias
                const noticiaElement = document.createElement('div');
                noticiaElement.classList.add('noticia');

                noticiaElement.innerHTML = `
                    <h3>${noticia.title}</h3>
                    <p>${noticia.description || 'Sin descripción disponible.'}</p>
                    <a href="${noticia.url}" target="_blank">Leer más</a>
                `;

                noticiasContainer.appendChild(noticiaElement);
            });
        } else {
            noticiasContainer.innerHTML = '<p>No se encontraron noticias.</p>';
        }
    } catch (error) {
        console.error('Error obteniendo noticias:', error);
        noticiasContainer.innerHTML = '<p>Hubo un problema al cargar las noticias.</p>';
    }
}

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', obtenerNoticias);
