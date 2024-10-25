        // Array de cançons i noms
        const songs = [
            { src: 'audio/DUKI - TROYA (Video Oficial).mp3', name: 'TROYA' },
            { src: 'audio/DUKI - Barro (Video Oficial).mp3', name: 'BARRO' },
            { src: 'audio/DUKI - CALL ME MAYBE (Video Oficial).mp3', name: 'CALL ME MAYBE' }
        ];
        let currentSongIndex = 0;
        const musicPlayer = document.getElementById('music-player');
        const currentSongElement = document.getElementById('current-song');

       // Configura la cançó inicial
        updateSong();

        function playMusic() {
            musicPlayer.play();
            updateProgress(); // Comença a actualitzar la barra de progrés
        }

        function pauseMusic() {
            musicPlayer.pause();
        }

        function nextSong() {
            currentSongIndex = (currentSongIndex + 1) % songs.length; // Passar a la següent cançó
            updateSong(); // Actualitzar la cançó
        }

        function prevSong() {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length; // Tornar a la cançó anterior
            updateSong(); // Actualitzar la cançó
        }

        function updateSong() {
            musicPlayer.src = songs[currentSongIndex].src; // Actualitzar l'src de l'àudio
            currentSongElement.textContent = `Cançó actual: ${songs[currentSongIndex].name}`; // Actualitzar el nom de la cançó
            musicPlayer.onloadedmetadata = () => {
                // Establir la durada de la cançó quan estigui carregada
                document.getElementById('duration').textContent = formatTime(musicPlayer.duration);
                document.getElementById('progress-bar').max = musicPlayer.duration; // Establir el màxim de la barra de progrés
            };
            playMusic(); // Reproduir la nova cançó
        }

        // Funció per formatar el temps
        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        }

        // Funció per actualitzar el temporitzador i la barra de progrés
        function updateProgress() {
            const currentTimeElement = document.getElementById('current-time');
            currentTimeElement.textContent = formatTime(musicPlayer.currentTime); // Actualitzar el temps actual
            document.getElementById('progress-bar').value = musicPlayer.currentTime; // Actualitzar el valor de la barra de progrés

            // Actualitzar cada segon
            if (!musicPlayer.paused) {
                requestAnimationFrame(updateProgress);
            }
        }

        // Event listener per quan la cançó acaba
        musicPlayer.addEventListener('ended', nextSong);

        // Event listener per la barra de progrés
        document.getElementById('progress-bar').addEventListener('input', (event) => {
            musicPlayer.currentTime = event.target.value; // Canviar el temps actual de la cançó
        });

        // Event listener per la barra de volum
        document.getElementById('volume-bar').addEventListener('input', (event) => {
            musicPlayer.volume = event.target.value / 100; // Canviar el volum de la música
        });