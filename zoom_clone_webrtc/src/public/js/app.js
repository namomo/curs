const socket = io();

const myFace = document.getElementById('myFace');
const muteBtn = document.getElementById('mute');
const cameraBtn = document.getElementById('camera');
const cameraSelect = document.getElementById('cameras');

const welcome = document.getElementById('welcome')
const call = document.getElementById('call')
call.hidden = true;

let myStream;
let muted = true;
let cameraOff = false;
let roomName;
let myPeerConnection;

async function getCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    // console.log(devices);
    const camera = devices.filter((device) => device.kind === 'videoinput');
    // console.log(camera);

    const currentCamera = myStream.getVideoTracks()[0];

    // 하나만 있을 경우 select 이벤트 감지 못하기에 비어있는값 추가
    const option = document.createElement('option');
    option.value = '';
    option.innerText = '기본값';
    cameraSelect.appendChild(option)

    camera.forEach(camera => {
      const option = document.createElement('option');
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (currentCamera.label === camera.label) {
        option.selected = true;
      }
      cameraSelect.appendChild(option)
    })

  } catch (e) {
    console.log(e);
  }
}

async function getMedia(deviceId) {
  const initialConstrains = {
    audio: true, video: { facingMode: 'user'}
  }
  const cameraConstraints= {
    audio: true,
    video: {deviceId: {exact: deviceId}}
  }

  try {
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstraints : initialConstrains
    );
    myFace.srcObject = myStream;

    if (muted) {
      // myStream.getAudioTracks()[0].muted = muted;
      myStream.getAudioTracks()[0].enabled = !muted;
    }

    if (!deviceId && deviceId !== '') {
      getCameras();
    }
  } catch (e) {
    console.log(e);
  }
}
// getMedia();

muteBtn.addEventListener('click', () => {
  myStream.getAudioTracks().forEach((track) => {
    track.enabled = !track.enabled;
  });

  if (!muted) {
    muteBtn.innerText = 'Unmute';
    muted = true;
  }
  else {
    muteBtn.innerText = 'Mute';
    muted = false;
  }
});
cameraBtn.addEventListener('click', () => {
  myStream.getVideoTracks().forEach((track) => {
    track.enabled = !track.enabled;
  });

  if (cameraOff) {
    cameraBtn.innerText = 'Turn Camera Off';
    cameraOff = false;
  }
  else {
    cameraBtn.innerText = 'Turn Camera On';
    cameraOff = true;
  }

});

cameraSelect.addEventListener('input', (e) => {
  console.log(cameraSelect.value);
  getMedia(cameraSelect.value);
})


const welcomeForm = welcome.querySelector('form');
welcomeForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const input = welcomeForm.querySelector('input');
  roomName = input.value;
  await initCall();
  socket.emit('join_room', input.value);

  input.value = '';
})

async function initCall() {
  welcome.hidden = true;
  call.hidden = false;
  await getMedia();
  makeConnection();
}


// 새로운 사용자가 방에 들어오면...
socket.on('welcome', async () => {
  // somebody join
  const offer = await myPeerConnection.createOffer();
  myPeerConnection.setLocalDescription(offer);
  console.log(offer);

  socket.emit('offer', offer, roomName);
})

// offer 를 전달 받으면...
socket.on('offer', async (offer) => {
  console.log('receive offer');

  myPeerConnection.setRemoteDescription(offer);
  const answer = await myPeerConnection.createAnswer();
  myPeerConnection.setLocalDescription(answer);
  socket.emit('answer', answer, roomName);
});

socket.on('answer', (answer) => {
  myPeerConnection.setRemoteDescription(answer);
})


function makeConnection() {
  myPeerConnection = new RTCPeerConnection();
  myStream.getTracks().forEach((track) => {
    myPeerConnection.addTrack(track, myStream);
  })
}