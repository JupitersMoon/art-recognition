$(document).ready(() => {

  let video = document.querySelector('video');
  let canvas = document.querySelector('canvas');
  let ctx = canvas.getContext('2d');
  let localMediaStream = null;
  let errorCallback = function(e) {
    console.log('Reeeejected!', e);
  };

  var artistResult;

  function snapshot() {
    if (localMediaStream) {
      ctx.drawImage(video, 0, 0, 640, 480);
      // "image/webp" works in Chrome.
      // Other browsers will fall back to image/png.
      var b64image = canvas.toDataURL('image/png');
      // document.querySelector('#destinationImage').src = b64image;
      var base64Image = b64image.replace(/^data:image\/png;base64,/, "");
      // console.log(base64Image);
      $('body').addClass('wait');

      $.ajax('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          Authorization: 'Client-ID 60fab078fd718d5'
        },
        data: {
          type: "base64",
          image: base64Image
        },
        success: function(res) {
          console.log("Imgur:", res.data.link);

          $.ajax({
            url: '/watson',
            type: 'PATCH',
            data: {
              'imgur_url': res.data.link
            },
            success: function(result) {
              console.log("Watson: ", result);
              // console.log("YAY: ", typeof result);
              $('body').removeClass('wait')

              result = JSON.parse(result)

              artistResult = {
                artist: result.images[0].classifiers[0].classes[0].class,
                score: (Math.floor((result.images[0].classifiers[0].classes[0].score) * 100) + ' %'),
                url: res.data.link
              }

              function displayImage(artist, score, url) {
                var newCard =
                  `      <div class="row">
                        <div class="col s12 m7">
                          <div id="snapshotCard" class="card">
                            <div class="card-image">
                              <img src=" ` + artistResult.url + ` " class="snapshot" id="destinationImage">
                              <span class="card-title"><font size="5" color="black"><font size="5" color="#538794">Saved</font></font></span>
                            </div>
                            <div class="card-content">
                              <div class="row">
                                <div class="col s12 m12 l6">
                                  <h4><font color="#538794">Artist: </font></h4>
                                </div>
                                <div class="col s12 m12 l6">
                                  <h4 id="artist"><font color="#538794">` + artistResult.artist + `</font></h4>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col s12 m12 l6">
                                  <h4><font color="#538794">Score: </font></h4>
                                </div>
                                <div class="col s12 m12 l6">
                                  <h4 id="score"><font color="#538794">` + artistResult.score + `</font></h4>
                                </div>
                              </div>
                            </div>
                            <div class="card-action" id="deleteButton">
                              <a href="#">Delete</a>
                            </div>
                          </div>
                        </div>
                      </div>`
                $("#savedImage").prepend(newCard);
              }

              displayImage()

              //////////DELETE BUTTON////////////
              $('#deleteButton').click((event) => {
                event.preventDefault();

                console.log('Deleting here');
                // $("#savedImage").children().remove();

                $("#savedImage").children().remove();
              });
            }
          });
        }
      });
    }
  }

  // video.addEventListener('click', snapshot, false);
  captureButton.addEventListener('click', snapshot, false);

  // Not showing vendor prefixes or code that works cross-browser.
  navigator.getUserMedia({
    video: {
      width: 640,
      height: 480
    }
  }, function(stream) {
    video.src = window.URL.createObjectURL(stream);
    localMediaStream = stream;
  }, errorCallback);

  // document.body.appendChild(video);
  $('#camFeed').children(video)
})
