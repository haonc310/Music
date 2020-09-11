const play        = document.getElementById('play');
const pause       = document.getElementById('pause');
const prev        = document.getElementById('prev');
const next        = document.getElementById('next');
const startTime   = document.getElementById('startTime');
const totalTimeEL = document.getElementById('totalTime')

const nameSong = document.getElementById('nameSong');
const singer   = document.getElementById('singer');
const img      = document.getElementById('img');

const progress    = document.getElementById('progress');
const progressBar = document.getElementById('progressBar');

const button     = document.getElementById('button');
const navbar     = document.getElementById('navbar');
const navbarList = document.getElementById('navbarList');
const close      = document.getElementById('close');

const songs = [
    {
        src:'./assest/audio/Hoa Nở Không Màu - Hoài Lâm - Acoustic Version.mp3',
        title:'Hoa Nở Không Màu',
        singer : 'Hoài Lâm',
        img  : './assest/img/hoanokhongmau.jpg'
    },
    {
        src:'./assest/audio/Bỏ lỡ một người.mp3',
        title:'Bỏ lỡ một người',
        singer : 'Cover',
        img  : './assest/img/bolomotnguoi.jpg'
    },
    {
        src:'./assest/audio/Bông hoa đẹp nhất.mp3',
        title:'Bông hoa đẹp nhất',
        singer : 'Cover',
        img  : './assest/img/bonghoadepnhat.jpg'
    },
    {
        src:'./assest/audio/Buồn thì cứ khóc.mp3',
        title:'Buồn thì cứ khóc',
        singer : 'Cover',
        img  : './assest/img/buonthicukhoc.jpg'
    },
    {
        src:'./assest/audio/Con xin mẹ tha lỗi.mp3',
        title:'Con xin mẹ tha lỗi',
        singer : 'Cover',
        img  : './assest/img/hoanokhongmau.jpg'
    },
    {
        src:'./assest/audio/Đêm trăng tình yêu.mp3',
        title:'Đêm trăng tình yêu',
        singer : 'Cover',
        img  : './assest/img/demtrangtinhyeu.jpg'
    },
    {
        src:'./assest/audio/Gánh mẹ.mp3',
        title:'Gánh mẹ',
        singer : 'Cover',
        img  : './assest/img/ganhme.jpg'
    }
    ,
    {
        src:'./assest/audio/Giật mình trong đêm.mp3',
        title:'Giật mình trong đêm',
        singer : 'Cover',
        img  : './assest/img/giatminhtrongdem.png'
    },
    {
        src:'./assest/audio/Mộng thủy tinh.mp3',
        title:'Mộng thủy tinh',
        singer : 'Cover',
        img  : './assest/img/mongthuytinh.png'
    },
    {
        src:'./assest/audio/Mùa đông không lạnh.mp3',
        title:'Mùa đông không lạnh',
        singer : 'Cover',
        img  : './assest/img/muadongkhonglanh.jpg'
    },
    {
        src:'./assest/audio/Người tình mùa đông.mp3',
        title:'Người tình mùa đông',
        singer : 'Cover',
        img  : './assest/img/nguoitinhmuadong.jpg'
    }
]
let isPlaying = false;
let currentIndex =0;
const player = new Audio();
player.src= songs[currentIndex].src

const app = {
    init : function() {
    },
    loadSongs : function(currentIndex) {
        player.src= songs[currentIndex].src
        nameSong.textContent = songs[currentIndex].title;
        singer.textContent = songs[currentIndex].singer;
        img.src = songs[currentIndex].img
    },
    play : function () {
        app.handleClass(NavbarItem);
        if(player.src === ''){
            app.loadSongs(currentIndex);
        }
        player.play();
        play.style.display ='none';
        pause.style.display ='flex';
        isPlaying = true
    },
    pause : function() {
        app.handleClass(NavbarItem);
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
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const { duration } = player;
        player.currentTime = (clickX / width) * duration;
    },
    handleClass : function(NavbarItem) {
        for(let i=0 ; i<NavbarItem.length; i++){
            NavbarItem[i].classList.remove('active');
            const button = NavbarItem[i].querySelector('.navar__item-button');
            if(currentIndex !== i && currentIndex !==0) {
                button.innerHTML = ` <i class="fas fa-play"></i>`
            }
        }
            NavbarItem[currentIndex].classList.add('active');
            const button = NavbarItem[currentIndex].querySelector('.navar__item-button');
            console.log(button.innerHTML);
            if(button.innerHTML === ' <i class="fas fa-play"></i>'){
                button.innerHTML = ` <i class="fas fa-pause"></i>`
            }
            else{
                button.innerHTML = ` <i class="fas fa-play"></i>`
            }
    },
    getTime : function() {
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
    },
    timeUpdate : function() {
        if(isPlaying){
            app.getTime();
        }
        if(Math.floor(player.currentTime) === Math.floor(player.duration)){
            app.next();
            app.handleClass(NavbarItem);
        }
        progress.style.width = (player.currentTime / player.duration)*100 + "%";
    }
}
window.addEventListener('load' , () =>{
    app.getTime();
    app.loadSongs(currentIndex);
})
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
button.addEventListener('click', () =>{
    navbar.classList.add('active');
})
close.addEventListener('click', () =>{
    navbar.classList.remove('active');
})
songs.forEach((song, index) =>{
    const li = document.createElement('li')
    const text = document.createElement('div')
    const button = document.createElement('div')
    const h4 = document.createElement('h4')
    const p = document.createElement('p')
    if(index === currentIndex) {
        li.classList.add('active')
    }
    h4.textContent = song.title;
    p.textContent = song.singer;
    li.classList.add('navbar__item');
    text.classList.add('navar__item-text');
    button.classList.add('navar__item-button');
    button.innerHTML = ` <i class="fas fa-play"></i>`
    h4.classList.add('text__name');
    p.classList.add('text__singer');
    text.appendChild(h4);
    text.appendChild(p);
    li.appendChild(text);
    li.appendChild(button)
    navbarList.appendChild(li);
})
const NavbarItem = document.querySelectorAll('.navbar__item');
NavbarItem.forEach((item,index) =>{
    item.addEventListener('click' , () =>{
        navbar.classList.remove('active');
        if(currentIndex === index && isPlaying) {
            app.pause();
        }
        else{
            if(currentIndex !== index){
                currentIndex = index;
                app.loadSongs(currentIndex);
            }
            app.play();
        }
        
    })
})
player.addEventListener('timeupdate' ,app.timeUpdate)