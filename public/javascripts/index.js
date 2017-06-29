$(document).ready(function () {

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
    document.querySelector('img').src = b64image;
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
      success: function(res){
        console.log("HOOOORAAAAY:", res.data.link);

        // make ajax POST
        // $.put("/api/users/watson", {'b64image': b64image}, function(data){
        //   console.log("SUCCESS 200 FROM EXPRESS");
        // });

        $.ajax({
            url: '/api/users/watson',
            type: 'PATCH',
            data: {'imgur_url': res.data.link},
            success: function(result) {
                console.log("YAY: ", result);
            }
        });
      }
    });
  }
}

video.addEventListener('click', snapshot, false);

// Not showing vendor prefixes or code that works cross-browser.
navigator.getUserMedia({
  video: { width: 720, height: 720 }
}, function(stream) {
  video.src = window.URL.createObjectURL(stream);
  localMediaStream = stream;
}, errorCallback);

document.body.appendChild(video);


})
