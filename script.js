 const songName = document.getElementById('song-name');
 const bandName = document.getElementById('band-name');
 const song = document.getElementById('song');
 const cover = document.getElementById('cover');
 const play = document.getElementById('play');
 const next = document.getElementById('next');
 const previous = document.getElementById('previous');
 const likeButton = document.getElementById('like');
 const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const  repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');


const trueLove = {
   songName: 'true love',
   artist: 'Soja',
   file: 'true-love',
   liked: false,
};
const chapeuDePalha = {
   songName: 'chapeu de palha',
   artist: 'Chimarruts',
   file: 'chapeu-de-palha',
   liked: false,
};

const sejaPramim = {
   songName: 'seja pra mim',
   artist: 'Maneva',
   file: 'seja-pra-mim',
   liked: false,
};

 let isPlaying = false;
 let  isShuffled = false;
 let repeatOn = false;

 const originalPlaylist = JSON.parse(localStorage.getItem('playlist'))?? [trueLove, chapeuDePalha, sejaPramim];
 sortedPlaylist = [...originalPlaylist];
 let index = 0;


 function playSong() {
   play.querySelector('.bi').classList.remove('bi-play-circle-fill');
   play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    isPlaying = true;
    song.play();
 }
 function pauseSong() {
   play.querySelector('.bi').classList.add('bi-play-circle-fill');
   play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    isPlaying = false;
    song.pause();
 }

 function playPauseDecider(){
   if(isPlaying === true){
     pauseSong();
   }
   else {
     playSong();
   }

   }

   function updateTime(){
      songTime.innerText = song.currentTime;
   }

   function updateTotalTime(){
      totalTime.innerText = song.duration;
   }

   function initializeSong() {
      cover.src = `images/${sortedPlaylist[index].file}.jpg`;
      song .src = `songs/${sortedPlaylist[index].file}.mp3`;
      songName.innerText= sortedPlaylist[index].songName;
      bandName.innerText = sortedPlaylist[index].artist;
      likeButtonRender();
   }

function previousSong() {
   if(index === 0){
      index = sortedPlaylist.length - 1;
   }
   else {
      index -= 1;
   }
initializeSong();
playSong();
}

function nextSong() {
   if(index === sortedPlaylist.length - 1){
      index = 0;
   }
   else {
      index += 1;
}
initializeSong();
playSong();
}

function updateProgress(){
   
   const barWidth = (song.currentTime / song.duration) * 100;
   currentProgress.style.setProperty('--progress', `${barWidth}%`);
   songTime.innerText = toHHMMSS(song.currentTime);

}

function jumpTo(event){
  const width =    progressContainer.clientWidth;
  const clickPosition = event.offsetX;
  const jumpToTime = (clickPosition / width) * song.duration;
   song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray){
const size = preShuffleArray.length;
let currentIndex = size - 1;
while(currentIndex > 0){
let randomIndex =  Math.floor(Math.random()* size);
let aux = preShuffleArray[currentIndex];
preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
preShuffleArray[randomIndex] = aux;
currentIndex -= 1;
}
}

function shuffleButtonClicked(){
   if(isShuffled === false){
      isShuffled = true;
      shuffleArray(sortedPlaylist);
      shuffleButton.classList.add('button-active');
   }
  else{
       isShuffled = false;
       sortedPlaylist = [...originalPlaylist];
       shuffleButton.classList.remove('button-active');
  }

}

function repeatButtonClicked(){
 if(repeatOn === false){
    repeatOn = true;
    repeatButton.classList.add('button-active');
 }
else{
   repeatOn = false;
   repeatButton.classList.remove('button-active');
}
}
function nextOrReapeat(){
   if (repeatOn === false){
     nextSong(); 
   }
   else{
      playSong();
   }
}

function toHHMMSS(originalNumber){
      let hours = Math.floor(originalNumber / 3600);
      let min = Math.floor((originalNumber - hours * 3600) / 60);
      let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

      return`${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  
}


   


function updateTotalTime(){
   totalTime.innerText = toHHMMSS(song.duration);
}  

function likeButtonRender(){
if (sortedPlaylist[index].liked === true){
   likeButton.querySelector('.bi').classList.remove('bi-heart');
   likeButton.querySelector('.bi').classList.add('bi-heart-fill');
    likeButton.classList.add('button-active');
}
else{
   likeButton.querySelector('.bi').classList.add('bi-heart');
   likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
   likeButton.classList.remove('button-active');
   
}
}
function likeButtonClicked(){
if (sortedPlaylist[index].liked === false){
   sortedPlaylist[index].liked = true;
}
else{
   sortedPlaylist[index].liked = false;
}
likeButtonRender();
localStorage.setItem('playlist', JSON.stringify(originalPlaylist));
}

initializeSong();
play.addEventListener('click' ,playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate',updateProgress);
song.addEventListener('ended',nextOrReapeat );
song.addEventListener('loadedmetadata',updateTotalTime);
progressContainer.addEventListener('click',jumpTo);
shuffleButton.addEventListener('click',shuffleButtonClicked);
repeatButton.addEventListener('click',repeatButtonClicked);
likeButton,addEventListener('click',likeButtonClicked);


