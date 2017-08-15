$(function() {
  var animationId;
  var $svg = $('.m-svg01');
  var $line = $svg.find('.m-svg01__line');

  var audioController = new AudioController();

  var render = function() {
    var spectrums = audioController.getSpectrums();
    var waveWidth = 640 / spectrums.length;

    var pointStr = '0,0 ';
    for(var i=0, len=spectrums.length; i<len; i++){
      pointStr += i*waveWidth + ',' + spectrums[i] + ' ';
    }
    pointStr += '640,0';
    $line.attr('points', pointStr);

    animationId = requestAnimationFrame(render);
  };

  // ファイル選択処理
  (function() {
    var fileReader = new FileReader();
    var $modUpload = $('.m-file-upload01');
    var $main = $modUpload.find('.m-file-upload01__main');
    var $btn = $modUpload.find('.m-file-upload01__btn');
    var $fileName = $modUpload.find('.m-file-upload01__file-name');
    var $input = $modUpload.find('.m-file-upload01__input');


    fileReader.addEventListener('load', function(e) {
      audioController.load(fileReader.result, function() {
        audioController.play();

        animationId = requestAnimationFrame(render);
      });
    });

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
  })();
});
