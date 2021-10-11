import wall from './hitWall.wav'

const hitWall = () => {
  const audio = new Audio(wall)
  audio.play()
}

export default hitWall