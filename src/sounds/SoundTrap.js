import trap from './hitTrap.wav'

const hitTrap = () => {
  const audio = new Audio(trap)
  audio.play()
}

export default hitTrap