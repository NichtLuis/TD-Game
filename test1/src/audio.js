export const audio = {
    cannonShoot: new Audio('./sounds/cannonShoot.mp3'),
    teslaShoot: new Audio('./sounds/teslaShoot.mp3'),
    enemyDeath: new Audio('./sounds/enemyDead.mp3'),
    towerLevelUp: new Audio('./sounds/towerLevelUpSound.mp3'),
    towerSell: new Audio('./sounds/towerSellSound.mp3'),
    towerBuy: new Audio('./sounds/towerBuySound.mp3'),
    click : new Audio('./sounds/clickSound.mp3'),
    levelWin: new Audio('./sounds/levelWin.mp3'),
};

export const music = {
    mainMenu_1 : new Audio("./sounds/music/startMenuMusic_1.wav"),
    mainMenu_2 : new Audio("./sounds/music/startMenuMusic_2.wav"),
    bgm_1 : new Audio("./sounds/music/bgm_1.wav"),
    bgm_2 : new Audio("./sounds/music/bgm_2.wav"),
    bgm_3 : new Audio("./sounds/music/bgm_3.wav"),
    bossMusic: new Audio("./sounds/music/bossMusic.wav"),
    gameOver: new Audio("./sounds/music/gameOver.wav"),
    win : new Audio("./sounds/music/winnerMusic.wav"),
};

const pools = {};
const POOL_SIZE = 5;

export function playSound(src) {
    if (!pools[src]) {
        pools[src] = [];
        for (let i = 0; i < POOL_SIZE; i++) {
            const audio = new Audio(src);
            audio.volume = 0.5;
            pools[src].push(audio);
        }
        pools[src]._idx = 0;
    }
    const pool = pools[src];
    const audio = pool[pool._idx];
    audio.currentTime = 0;
    audio.play();
    pool._idx = (pool._idx + 1) % POOL_SIZE;
}

// Stop all sound effects and music
export function stopAllAudio() {
    // Stop all sound effects
    for (let key in audio) {
        if (audio[key] && typeof audio[key].pause === 'function') {
            audio[key].pause();
            audio[key].currentTime = 0;
        }
    }
    // Stop all music tracks
    for (let key in music) {
        if (music[key] && typeof music[key].pause === 'function') {
            music[key].pause();
            music[key].currentTime = 0;
        }
    }
    // Stop all pooled sound effects
    for (let src in pools) {
        const pool = pools[src];
        if (Array.isArray(pool)) {
            for (let audioObj of pool) {
                if (audioObj && typeof audioObj.pause === 'function') {
                    audioObj.pause();
                    audioObj.currentTime = 0;
                }
            }
        }
    }
}