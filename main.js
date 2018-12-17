var arrayMolPostFormat4 = document.querySelectorAll('.mol-post_Format4'),
    titleModal          = document.getElementById("renameTitleProgram"),
    compModalAudioPlayer = document.getElementById('comp_modalAudioplayer');
    count               = 1;

	arrayMolPostFormat4.forEach(function(item) {
		item.querySelector('button').addEventListener('click', eventPodcast);
	})

  function convertTime(time) {
    var minute = Math.floor(time / 60 % 60).toString().padStart(2,"0");
    var second = Math.floor(time % 60).toString().padStart(2,"0");
    return minute + ":" + second; 
  }

function eventPodcast(e) {

  if(count === 1) {
    compModalAudioPlayer.classList.add('active-podcasts');
  }

  var   targetElement       = e.target,
        parentTargetElement = e.target.parentNode.parentNode
        audioplayer         = parentTargetElement.getAttribute('data-audioplayer'),
        audio               = document.getElementById('audio'),
        sourceAudio         = document.getElementById('sourceAudio'),
        endTime             = document.getElementById("end"),
        starTime            = document.getElementById("start");

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

  if(document.getElementById("audio")) {
    var length, interval, seekbarPercentage;

    if(audio.duration) {
          console.log("entro1");
          length = audio.duration;        
          endTime.innerHTML = convertTime(audio.duration);
      }else {
        console.log("entro2");
        audio.addEventListener('loadedmetadata', function(e){
          length = audio.duration;
          endTime.innerHTML = convertTime(audio.duration);      
        })
      }
  }
  
}