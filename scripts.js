const songList = [
    {
        name: "Calm Forest",
        artist: "ddc.",
        src: "assets/songs/calm.mp3",
        cover: "assets/calm.webp"
    },

    {
        name: "Gostava Tanto De Você",
        artist: "Tim Maia",
        src: "assets/songs/voce.mp3",
        cover: "assets/voce.webp"
    },

    {
        name: "Refreshment",
        artist: "QUERKY",
        src: "assets/songs/refreshment.mp3",
        cover: "assets/refreshment.webp"
    },

    {
        name: "Boys Don't Cry",
        artist: "The Cure",
        src: "assets/songs/boys.mp3",
        cover: "assets/boys.webp"
    },

    {
        name: "Tornado Of Souls",
        artist: "Megadeth",
        src: "assets/songs/tornado.mp3",
        cover: "assets/tornado.webp"
    },

    {
        name: "Haunted Roads",
        artist: "Lil Revive",
        src: "assets/songs/haunted.mp3",
        cover: "assets/haunted.webp"
    },

    
    {
        name: "Closed on Sunday",
        artist: "Kanye West",
        src: "assets/songs/sunday.mp3",
        cover: "assets/sunday.webp"
    },

    {
        name: "Sleepwalker",
        artist: "akiaura",
        src: "assets/songs/sleepwalker.mp3",
        cover: "assets/sleepwalker.webp"
    },

    {
        name: "Providence",
        artist: "Poor Man's Poison",
        src: "assets/songs/providence.mp3",
        cover: "assets/providence.webp"
    },

    {
        name: "Painkiller",
        artist: "Judas Priest",
        src: "assets/songs/painkiller.mp3",
        cover: "assets/painkiller.webp"
    },


]

const artistName = document.querySelector('.artist-name')
const musicName = document.querySelector('.song-name')
const fillBar = document.querySelector('.fill-bar')
const time = document.querySelector('.time')
const cover = document.getElementById('cover')
const playBtn = document.getElementById('play')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const prog = document.querySelector('.progress-bar')

let song = new Audio()
let currentSong = 0
let playing = false

document.addEventListener('DOMContentLoaded', () => {

    loadSong(currentSong)
    song.addEventListener('timeupdate', updateProgress)
    song.addEventListener('ended', nextSong)
    prevBtn.addEventListener('click', prevSong)
    nextBtn.addEventListener('click', nextSong)
    playBtn.addEventListener('click', togglePlayPause)
    prog.addEventListener('click', seek)
})

function loadSong(index) {

    const { name, artist, src, cover: thumb } = songList[index]
    artistName.innerText = artist
    musicName.innerText = name
    song.src = src
    cover.style.backgroundImage = `url(${thumb})`

}

function updateProgress() {
    if (song.duration) {
        const pos = (song.currentTime / song.duration) * 100
        fillBar.style.width = `${pos}%`

        const duration = formatTime(song.duration)
        const currentTime = formatTime(song.currentTime)
        time.innerText = `${currentTime} - ${duration}`
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
}

function togglePlayPause() {

    if (playing) {
        song.pause()
        playBtn.classList.remove('pause');
       
    } else {
        song.play()
        playBtn.classList.add('pause');
    }

    playing = !playing
    playBtn.classList.toggle('fa-pause', playing)
    playBtn.classList.toggle('fa-play', !playing)
    cover.classList.toggle('active', playing)
}

function nextSong() {

    currentSong = (currentSong + 1) % songList.length
    playMusic()
}

function prevSong() {

    currentSong = (currentSong - 1 + songList.length) % songList.length
    playMusic()
}

function playMusic() {

   
    loadSong(currentSong)
    song.play()
    playing = true
    playBtn.classList.add('fa-pause')
    playBtn.classList.remove('fa-play')
    cover.classList.add('active')
   
}

function seek(e) {
    const pos = (e.offsetX / prog.clientWidth) * song.duration
    song.currentTime = pos
}

