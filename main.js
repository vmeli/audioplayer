var arrayMolPostFormat4  = document.querySelectorAll('.mol-post_Format4'),
    titleModal           = document.getElementById("renameTitleProgram"),
    compModalAudioPlayer = document.getElementById('comp_modalAudioplayer'),
    btnPlay              = document.getElementById('play'),
    count                = 1;

arrayMolPostFormat4.forEach(function(item) {
	item.querySelector('button').addEventListener('click', eventPodcast);
})

btnPlay.addEventListener('click', modalPlaying);

function convertTime(time) {
  var minute = Math.floor(time / 60 % 60).toString().padStart(2,"0");
  var second = Math.floor(time % 60).toString().padStart(2,"0");
  return minute + ":" + second; 
}

function modalPlaying() {
  if(document.getElementById('audio').paused) {
    compModalAudioPlayer.classList.add('active-audio')
    document.getElementById('audio').play();
  }else {
    arrayMolPostFormat4.forEach(function(item) {
      item.classList.remove('active-audio');
    })
    compModalAudioPlayer.classList.remove('active-audio');
    document.getElementById('audio').pause();
  }
}

function playing(parentElement, audio) {
  if(parentElement.classList.value.includes("active-audio")) {
    audio.play();
  }else {
    audio.pause();
  }
}

function getDuration(src, destination) {
  let audio = new Audio();
   audio.addEventListener('loadedmetadata', function(){
        destination.innerHTML = convertTime(audio.duration);      
  });
  audio.setAttribute('src', src);
}

function eventPodcast(e) {

  if(count === 1) {
    compModalAudioPlayer.classList.add('active-podcasts');
    compModalAudioPlayer.classList.add('active-audio');
  }

  var   targetElement       = e.target,
        parentTargetElement = e.target.parentNode.parentNode
        audioplayer         = targetElement.getAttribute('data-audioplayer'),
        audio               = document.getElementById('audio'),
        sourceAudio         = document.getElementById('sourceAudio'),
        endTime             = document.getElementById("end"),
        starTime            = document.getElementById("start"),
        seekbarInner        = document.querySelector(".seekbarControl .inner"),
        seekbarOuter        = document.querySelector(".seekbarControl .outer");

  var length;

  arrayMolPostFormat4.forEach(function(item) {
    if(item == parentTargetElement) {
      parentTargetElement.classList.toggle('active-audio');
      console.log("igual");
    }else {
      item.classList.remove('active-audio');
      console.log("distinto");
    }
  })

  headline = parentTargetElement.querySelector('.Format4__headline').textContent.trim();
  titleModal.innerHTML = headline;

  sourceAudio.setAttribute('src', audioplayer);

  audio.load(audioplayer);

    if(audio.duration) {
        length = audio.duration;        
        endTime.innerHTML = convertTime(audio.duration);
    }else {
      audio.addEventListener('loadedmetadata', function(e){
        length = audio.duration;
        endTime.innerHTML = convertTime(audio.duration);      
      })
    }

  playing(parentTargetElement, audio);

  audio.addEventListener('timeupdate', updateSeekBar);

  function getPercentage(presentTime, totalLength) {
      var clacPercentage = (presentTime / totalLength)*100;
      return parseFloat(clacPercentage.toString());
    }
    
    function updateSeekBar(e) {
      starTime.innerHTML = convertTime(audio.currentTime);
      console.log(audio.currentTime, length, audio.duration);
      seekbarPercentage = getPercentage(audio.currentTime.toFixed(2), audio.duration.toFixed(2));
      seekbarInner.style.width = seekbarPercentage + '%';
    }
  

}