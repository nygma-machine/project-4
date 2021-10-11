import move from './movement.wav'

const playerMove = () => {
  const audio = new Audio(move)
  audio.play()
}

export default playerMove