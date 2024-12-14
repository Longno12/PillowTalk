const audioContext = new (window.AudioContext || window.webkitAudioContext)();


const gainNode = audioContext.createGain();
gainNode.connect(audioContext.destination);


gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);


const bgMusic = new Audio('christmas-music.mp3');
bgMusic.loop = true;

const source = audioContext.createMediaElementSource(bgMusic);
source.connect(gainNode);


function toggleMusic() {
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  if (bgMusic.paused) {
    bgMusic.play();
    document.getElementById('toggleMusic').textContent = '🔇';
  } else {
    bgMusic.pause();
    document.getElementById('toggleMusic').textContent = '🔈';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  bgMusic.play().catch(error => {
    console.log("Auto-play was prevented. Please click the music button to start.");
  });
});

function saveMusicState() {
  sessionStorage.setItem('musicPlaying', !bgMusic.paused);
}

function loadMusicState() {
  const musicPlaying = sessionStorage.getItem('musicPlaying');
  if (musicPlaying === 'true' && bgMusic.paused) {
    toggleMusic();
  }
}

window.addEventListener('beforeunload', saveMusicState);

document.addEventListener('DOMContentLoaded', loadMusicState);
