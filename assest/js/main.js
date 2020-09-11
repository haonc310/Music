const play = document.getElementById('play');
const pause = document.getElementById('pause');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const startTime = document.getElementById('startTime');
const totalTimeEL = document.getElementById('totalTime')

const nameSong = document.getElementById('nameSong');
const singer = document.getElementById('singer');

const progress = document.getElementById('progress');
const progressBar = document.getElementById('progressBar');
const songs = [
    {
        src:'./assest/audio/Hoa Nở Không Màu - Hoài Lâm - Acoustic Version.mp3',
        title:'Hoa Nở Không Màu',
        singer : 'Hoài Lâm'
    },
    {
        src:'./assest/audio/20 BẢN ACOUSTIC COVER BẤT HỦ HAY NHẤT DÀNH CHO 8X 9X.mp3',
        title:'Những Bản Hit Cover Acoustic Thế Hệ 8x 9x Nhẹ Nhàng Sâu Lắng Hay Nhất 2019',
        singer : 'Cover'
    }
    {
        src:'./assest/audio/Những bản nhạc Chill Acoustic gây nghiện ♬ Những tình khúc cũ thời 8x 9x đời đầu hay nhất.mp3',
        title:'Những Bản Hit Cover Acoustic Thế Hệ 8x 9x Nhẹ Nhàng Sâu Lắng Hay Nhất 2019',
        singer : 'Cover'
    }
]
let isPlaying = false;
let currentIndex =0;
const player = new Audio();
play.src = songs[currentIndex];
nameSong.textContent = songs[currentIndex].title;
singer.textContent = songs[currentIndex].singer;
const app = {
    init : function() {
    },
    loadSongs : function(currentIndex) {
        player.src= songs[currentIndex].src
    },
    play : function () {
        if(player.src === ''){
            app.loadSongs(currentIndex);
        }
        player.play();
        play.style.display ='none';
        pause.style.display ='flex';
        nameSong.textContent = songs[currentIndex].title;
        singer.textContent = songs[currentIndex].singer;
        isPlaying = true
    },
    pause : function() {
        player.pause();
        play.style.display ='flex';
        pause.style.display ='none';
        isPlaying = false;
    },
    prev : function() {
        currentIndex--;
        
        if(currentIndex <0){
            currentIndex=songs.length-1
        }
        app.loadSongs(currentIndex);
        this.play();
    },
    next : function() {
        currentIndex++;
        
        if(currentIndex > songs.length-1){
            currentIndex=0;
        }
        app.loadSongs(currentIndex);
        this.play();
    },
    smartTime : function(time) {
        if(time < 10){
            time = "0" + time;
        }
        return time
    },
    setProgressBar : function(e) {
        if(isPlaying || player.currentTime){
            app.play();
            const width = this.clientWidth;
            const clickX = e.offsetX;
            const { duration } = player;
            player.currentTime = (clickX / width) * duration;
        }
        else{
            alert("Bạn vui lòng chạy nhạc");
        }
    },
    timeUpdate : function() {
        if(isPlaying){
            let totalSeconds   = app.smartTime(Math.floor(player.duration % 60));
            let totalMinutes   = app.smartTime(Math.floor(player.duration / 60));
            let currentSeconds = app.smartTime(Math.floor((player.currentTime % 60)));
            let currentMinutes = app.smartTime(Math.floor((player.currentTime / 60)));
            let totalTime=0;
            let time = currentMinutes + ':' + currentSeconds;
            if(currentMinutes >=60){
                time =app.smartTime(Math.floor(currentMinutes/60)) + ':' + app.smartTime(currentMinutes%60)  + ':' + currentSeconds;
            }
            if(totalMinutes > 60 ){
                totalTime = app.smartTime(Math.floor(totalMinutes/60)) + ':' + app.smartTime(totalMinutes%60) + ':' + totalSeconds;
            }
            else{
                totalTime = totalMinutes + ':' + totalSeconds;
            }
            if(totalSeconds){
                totalTimeEL.textContent = totalTime;
            }
            startTime.textContent = time;
            
        }
        if(Math.floor(player.currentTime) === Math.floor(player.duration)){
            app.next();
        }
        progress.style.width = (player.currentTime / player.duration)*100 + "%";
    }
}
player.addEventListener('timeupdate' ,app.timeUpdate)
progressBar.addEventListener('click',app.setProgressBar)
play.addEventListener('click' , () =>{
    app.play();
})
pause.addEventListener('click' , () =>{
    app.pause();
})
prev.addEventListener('click' , () =>{
    app.prev();
})
next.addEventListener('click' , () =>{
    app.next();
})