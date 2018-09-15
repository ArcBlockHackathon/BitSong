class Piano {
  constructor (){
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    const host = 'http://10.113.8.125:8000';
    const toneMap = {
      1: `${host}/audio/piano/40.mp3`,
      2: `${host}/audio/piano/42.mp3`,
      3: `${host}/audio/piano/44.mp3`,
      4: `${host}/audio/piano/45.mp3`,
      5: `${host}/audio/piano/47.mp3`,
      6: `${host}/audio/piano/49.mp3`,
      7: `${host}/audio/piano/51.mp3`,
      8: `${host}/audio/piano/52.mp3`,
      9: `${host}/audio/piano/54.mp3`,
      10: `${host}/audio/piano/56.mp3`,
      11: `${host}/audio/piano/57.mp3`,
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