import victory from './foundNygma.wav'

const playerWins = () => {
  const audio = new Audio(victory)
  audio.play()
}

export default playerWins