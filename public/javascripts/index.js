$(document).ready(() => {

  let video = document.querySelector('video');
  let canvas = document.querySelector('canvas');
  let ctx = canvas.getContext('2d');
  let localMediaStream = null;
  let errorCallback = function(e) {
    console.log('Reeeejected!', e);
  };

  function snapshot() {
    if (localMediaStream) {
      ctx.drawImage(video, 0, 0, 720, 720);
      // "image/webp" works in Chrome.
      // Other browsers will fall back to image/png.
      var b64image = canvas.toDataURL('image/png');
      document.querySelector('#destinationImage').src = b64image;
      var base64Image = b64image.replace(/^data:image\/png;base64,/, "");
      // console.log(base64Image);

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

          // make ajax POST
          // $.put("/api/users/watson", {'b64image': b64image}, function(data){
          //   console.log("SUCCESS 200 FROM EXPRESS");
          // });

          $.ajax({
            url: '/watson',
            type: 'PATCH',
            data: {
              'imgur_url': res.data.link
            },
            success: function(result) {
              console.log("Watson: ", result);
              // console.log("YAY: ", typeof result);

              result = JSON.parse(result)

              let artistResult = {
                artist: result.images[0].classifiers[0].classes[0].class,
                score: result.images[0].classifiers[0].classes[0].score
              }
              // JSON.stringify()

              // console.log(artistResult.artist);
              // console.log(artistResult.score);
              // console.log(result.images[0].classifiers[0].classes[1].class);
              // console.log(result.images[0].classifiers[0].classes[1].score);
              // console.log(result.images[0].classifiers[0].classes[2].class);
              // console.log(result.images[0].classifiers[0].classes[2].score);



              $('#artist').children().remove()
              $('#score').children().remove()



              if (artistResult.artist != undefined) {
                $('#artist').append('<h4>' + artistResult.artist + '</h4>')
                $('#score').append('<h4>' + artistResult.score + '</h4>')
              } else {
                $('#artist').append('<h4>' + 'Please try again' + '</h4>')
              }




              ///////SAVE BUTTON ////////
              $('#saveButton').click((event) => {
                event.preventDefault();

                console.log("Saving here");
                console.log(res.data.link);
                console.log(artistResult.artist);
                console.log(artistResult.score);

                $.ajax({
                  url: '/save',
                  type: 'POST',
                  data: {
                    'imgur_url': res.data.link,
                    'artist': artistResult.artist,
                    'score': artistResult.score
                  },
                  success: function(result) {
                    // console.log('save sending');
                  }

                })
              });

              ////////////DELETE BUTTON////////////
              $('#deleteButton').click((event) => {
                event.preventDefault();

                console.log('Deleting here');
              })


            }

          });
        }
      });
    }
  }









  video.addEventListener('click', snapshot, false);

  // Not showing vendor prefixes or code that works cross-browser.
  navigator.getUserMedia({
    video: {
      width: 720,
      height: 720
    }
  }, function(stream) {
    video.src = window.URL.createObjectURL(stream);
    localMediaStream = stream;
  }, errorCallback);

  // document.body.appendChild(video);
  $('#camFeed').children(video)
})
