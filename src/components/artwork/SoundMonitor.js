import React, { useEffect, useState } from "react";

export default function SoundMonitor() {
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then(soundAllowed)
      .catch(function (err) {
        console.log("Sound not allowed: ", err);
      });
  }, []);

  function soundAllowed(stream) {
    //source: https://stackoverflow.com/questions/33322681/checking-microphone-volume-in-javascript
    //updated deprecated value https://stackoverflow.com/questions/65447236/scriptnode-onaudioprocess-is-deprecated-any-alternative
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

    analyser.smoothingTimeConstant = 0.8;
    analyser.fftSize = 1024;

    microphone.connect(analyser);
    analyser.connect(javascriptNode);
    javascriptNode.connect(audioContext.destination);

    javascriptNode.addEventListener("audioprocess", function () {
      var array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);
      var values = 0;

      var length = array.length;
      for (var i = 0; i < length; i++) {
        values += array[i];
      }

      var average = values / length;

      setVolume(average);
      // colorPids(average);
    });
  }

  return (
    <div>
      <h1>SoundMonitor: {volume}</h1>
    </div>
  );
}
