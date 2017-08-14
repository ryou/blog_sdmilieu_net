$(function() {
  var source, animationId;
  var audioContext = new AudioContext;
  var fileReader   = new FileReader;

  var $svg = $('.m-svg01');
  var $line = $svg.find('.m-svg01__line');

  var gainNode = audioContext.createGain();
  var analyser = audioContext.createAnalyser();
  analyser.fftSize = 512;
  gainNode.gain.value = 0.5;
  // analyser => gainNode => destinationとつなぐ
  gainNode.connect(audioContext.destination)
  analyser.connect(gainNode);

  // ファイル読み込み後処理
  fileReader.addEventListener('load', function(e) {
    audioContext.decodeAudioData(fileReader.result, function(buffer) {
      if(source) {
        source.stop();
        cancelAnimationFrame(animationId);
      }
　
      source = audioContext.createBufferSource();

      source.buffer = buffer;
      source.connect(analyser);
      source.start(0);
　
      animationId = requestAnimationFrame(render);
    });
  });
　
  // 描画更新処理
  var render = function() {
    var spectrums = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(spectrums);

    var points = [];
    var pointStr = '0,0 ';
    var tmp;
    for(var i=0, len=(spectrums.length*5)/6; i<len; i++){
      tmp = (spectrums[i]);
      tmp = (tmp < 0) ? 0 : tmp;
      pointStr += i*3 + ',' + tmp + ' ';
    }
    pointStr += '640,0';
    $line.attr('points', pointStr);
　
    animationId = requestAnimationFrame(render);
  };

  // ファイル選択処理
  (function() {
    var $components = $('.m-file-upload01');

    $components.each(function() {
      var $component = $(this);
      var $main = $component.find('.m-file-upload01__main');
      var $btn = $component.find('.m-file-upload01__btn');
      var $fileName = $component.find('.m-file-upload01__file-name');
      var $input = $component.find('.m-file-upload01__input');

      $main.add('.m-overlay01').on('click', function() {
        $input.trigger('click');

        return false;
      });

      $input.on('change', function(e) {
        var files = e.target.files;
        if (files.length > 0) {
          $('.m-overlay01').addClass('is-hidden');
          var fileName = files[0].name;
          $fileName.text(fileName);

          fileReader.readAsArrayBuffer(e.target.files[0]);
        }
      });
    });
  })();
});
