class Piano {
  constructor (){
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    const host = '/tone';
    const toneMap = {
      1: `${host}/40.mp3`,
      2: `${host}/42.mp3`,
      3: `${host}/44.mp3`,
      4: `${host}/45.mp3`,
      5: `${host}/47.mp3`,
      6: `${host}/49.mp3`,
      7: `${host}/51.mp3`,
      8: `${host}/52.mp3`,
      9: `${host}/54.mp3`,
      10: `${host}/56.mp3`,
      11: `${host}/57.mp3`,
    };
    this.context = new window.AudioContext();
    this.bufferMap = {};

    for(let key in toneMap){
      this.loadTone(key, toneMap[key]);
    }
  }

  loadTone(key, url) {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = () => {
        // Asynchronously decode the audio file data in request.response
        this.context.decodeAudioData(
            request.response,
            (buffer) => {
                if (!buffer) {
                    alert('error decoding file data: ' + url);
                    return;
                }
                this.bufferMap[key] = buffer;
            },
            function (error) {
                console.error('decodeAudioData error', error);
            }
        );
    }

    request.onerror = function () {
        alert('BufferLoader: XHR error');
    }

    request.send();
  }

  play(key=1) {
    const source = this.context.createBufferSource();
    source.buffer = this.bufferMap[key];
    source.connect(this.context.destination);
    source.start(0);
  }
}

export default Piano;