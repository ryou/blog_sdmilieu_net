/*
 * AudioController
 *
----------------------------------------------------------*/
var AudioController = (function() {
  // constructor
  var AudioController = function() {
    this._context = new AudioContext();
    this._analyzer = this._context.createAnalyser();
    this._gainNode = this._context.createGain();
    this._startTime = null;
    this._source = null;

    this._analyzer.connect(this._gainNode);
    this._gainNode.connect(this._context.destination);
  };

  // methods
  var proto = AudioController.prototype;

  proto.load = function(buffer, callback) {
    var self = this;
    self._context.decodeAudioData(buffer, function(decodedBuffer) {
      if(self._source) {
        self._source.stop();
      }
　
      self._source = self._context.createBufferSource();

      self._source.buffer = decodedBuffer;
      self._source.connect(self._analyzer);

      callback();
    });
  };

  proto.play = function(time) {
    if (this._source) {
      if (typeof time === 'undefined') {
        time = 0;
      }

      this._startTime = Date.now()/1000 - time;
      this._source.start(0, time);
    }
  };

  proto.pause = function() {

  };

  proto.stop = function() {
    if (this.source) {
      this.source.stop();
    }
  };

  proto.seek = function() {

  };

  proto.volume = function(volume) {
    if (typeof volume === 'undefined') {
      return this._gainNode.gain.value;
    }

    this._gainNode.gain.value = volume;
  };

  proto.audio = function() {
    var self = this;

    if (self._source === null) {
      return null;
    }

    var audio = {
      currentTime: (function() {
        if (self._startTime === null) {
          return null;
        }

        return Date.now()/1000 - self._startTime;
      })(),
      totalTime: self._source.buffer.duration,
      status: null
    };

    return audio;
  };

  proto.getSpectrums = function() {
    var spectrums = new Uint8Array(this._analyzer.frequencyBinCount);
    this._analyzer.getByteFrequencyData(spectrums);

    return spectrums;
  };

  return AudioController;
})();
