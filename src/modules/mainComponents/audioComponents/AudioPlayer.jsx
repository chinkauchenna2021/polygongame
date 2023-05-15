import React from 'react'
import ReactAudioPlayer from 'react-audio-player';

function AudioPlayer() {
  return (
    <ReactAudioPlayer
          src={"../../sound.mp3"}
          autoPlay
        //   loop
      />
  )
}

export default AudioPlayer