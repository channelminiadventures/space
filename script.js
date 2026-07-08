// YouTube Video ID (Para ser trocado futuramente pelo ID do Lofi do canal)
// Utilizando um placeholder amigável temporário até que tenha a live oficial.
const YOUTUBE_VIDEO_ID = "jfKfPfyJRdk"; // Lofi Girl fallback ID

let player;

// Esta função é chamada automaticamente quando a API do YouTube carrega
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
            'autoplay': 0,
            'controls': 0, // hide controls
            'disablekb': 1,
            'fs': 0,
            'loop': 1,
            'modestbranding': 1,
            'rel': 0,
            'showinfo': 0,
            'playlist': YOUTUBE_VIDEO_ID // required for infinite loop
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    console.log("Radio pronta. Aguardando interação do usuário para bypass de autoplay.");
}

document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enter-btn');
    const overlay = document.getElementById('entrance-overlay');
    const mainContent = document.getElementById('main-content');

    enterBtn.addEventListener('click', () => {
        // Toca o som de fato (bypass da política do Google/Apple)
        if (player && typeof player.playVideo === 'function') {
            player.playVideo();
            player.setVolume(50); // Volume agradável inicial
        }

        // Fade out
        overlay.classList.add('fade-out');
        
        // Revela o Glass Card do Linktree
        mainContent.classList.remove('hidden');

        // Destrói o overlay da memória
        setTimeout(() => {
            overlay.remove();
        }, 800);
    });
});
