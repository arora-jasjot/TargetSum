import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import Game from './Game'

export default function App() {
  const [gameID, setGameID] = useState(0);
  const reset = () => {
    setGameID(gameID => gameID + 1);
  }
  return (
    <Game key={gameID} randomNumberCount={6} initialTimer={10} reset={reset} />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1
  }
})