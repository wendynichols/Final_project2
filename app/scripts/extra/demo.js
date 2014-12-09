App.colorThief2 = function () {

  console.log('hey hey');

    var colorThief = new ColorThief();

    // Run Color Thief functions and display results below image.
    var showColorsForImage = function($image, $imageSection ) {
      var image                    = $image[0];
      var color                    = colorThief.getColor(image);
      var palette                  = colorThief.getPalette(image);

      var colorThiefOutput = {
        color: color,
        palette: palette,
      };
      var colorThiefOuputHTML = Mustache.to_html($('#colorPost').html(), colorThiefOutput);

      $imageSection.addClass('with-color-thief-output');

      setTimeout(function(){
        $imageSection.find('.color-thief-output').append(colorThiefOuputHTML).slideDown();
        var windowHeight          = $(window).height();
        var currentScrollPosition = $('body').scrollTop()
        var outputOffsetTop       = $imageSection.find('.color-thief-output').offset().top
        if ((currentScrollPosition < outputOffsetTop) && (currentScrollPosition + windowHeight - 250 < outputOffsetTop)) {
          $('body').animate({scrollTop: outputOffsetTop - windowHeight + 200 + "px"});
        }
      }, 300);
    };


    // Setup the drag and drop behavior if supported
    if (Modernizr.draganddrop && !!window.FileReader && !isMobile()) {

      $('#drag-drop').show();
      var $dropZone = $('#drop-zone');
      var handleDragEnter = function(event){
        $dropZone.addClass('dragging');
        return false;
      };
      var handleDragLeave = function(event){
        $dropZone.removeClass('dragging');
        return false;
      };
      var handleDragOver = function(event){
        return false;
      };
      var handleDrop = function(event){
        $dropZone.removeClass('dragging');
        handleFiles(event.originalEvent.dataTransfer.files);
        return false;
      };
      $dropZone
      .on('dragenter', handleDragEnter)
      .on('dragleave', handleDragLeave)
      .on('dragover', handleDragOver)
      .on('drop', handleDrop);
    }

    function handleFiles(files) {
      var $draggedImages = $('#dragged-images');
      var imageType      = /image.*/;
      var fileCount      = files.length;

      for (var i = 0; i < fileCount; i++) {
        var file = files[i];

        if (file.type.match(imageType)) {
          var reader = new FileReader();
          reader.onload = function(event) {
            imageInfo = { images: [
              {'class': 'dropped-image', file: event.target.result}
              ]};

              var imageSectionHTML = Mustache.to_html($('#testing').html(), imageInfo);
              $draggedImages.prepend(imageSectionHTML);

              var $imageSection = $draggedImages.find('.image-section').first();
              var $image        = $('.dropped-image .target-image');

              // Must wait for image to load in DOM, not just load from FileReader
              $image.on('load', function() {
                showColorsForImage($image, $imageSection);
              });
            };
            reader.readAsDataURL(file);
          } else {
            alert('File must be a supported image type.');
          }
        }
      }

      function isMobile(){
        // if we want a more complete list use this: http://detectmobilebrowsers.com/
        // str.test() is more efficent than str.match()
        // remember str.test is case sensitive
        var isMobile = (/iphone|ipod|ipad|android|ie|blackberry|fennec/).test
        (navigator.userAgent.toLowerCase());
        return isMobile;
      }

    };
