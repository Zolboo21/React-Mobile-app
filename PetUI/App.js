import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions, Button } from 'react-native';

export default function App() {
  const birdPosition = useRef(200); // Initial position
  const [displayPosition, setDisplayPosition] = useState(birdPosition.current);
  const [velocity, setVelocity] = useState(0); // Initial velocity
  const [gameOver, setGameOver] = useState(false); // New state variable
  const [gameStarted, setGameStarted] = useState(false); // New state variable
  const gravity = 0.5; // Adjust this to change the speed of falling
  const jumpPower = 15; // Adjust this to change the height of jumps
  const screenHeight = Dimensions.get('window').height; // Get the height of the screen

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameStarted) {
        setVelocity((prevVelocity) => {
          const newVelocity = prevVelocity + gravity;
          birdPosition.current += newVelocity;
          setDisplayPosition(birdPosition.current);

          // Check if the bird has hit the ground
          if (birdPosition.current >= screenHeight) {
            setGameOver(true); // End the game
            clearInterval(interval); // Clear the interval
          }

          return newVelocity;
        });
      }
    }, 20); // Adjust this to change the frequency of falling

    return () => clearInterval(interval); // Clear interval when component unmounts
  }, [gameStarted]); // Add gameStarted to the dependency array

  const handleFlap = () => {
    // When user taps, make the bird jump
    if (!gameOver) {
      setVelocity(-jumpPower);
      if (!gameStarted) {
        setGameStarted(true); // Start the game
      }
    }
  };

  const handleReplay = () => {
    // Reset the game state
    birdPosition.current = 200;
    setDisplayPosition(birdPosition.current);
    setVelocity(0);
    setGameOver(false);
    setGameStarted(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/flappy.png')}
        style={[styles.bird, { top: displayPosition }]}
      />
      {/* Other game elements */}
      <TouchableOpacity onPress={handleFlap}>
        <Text>Tap to flap</Text>
      </TouchableOpacity>
      {gameOver ? (
        <View>
          <Text>You Lose</Text>
          <Button title="Replay" onPress={handleReplay} />
        </View>
      ) : null}
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bird: {
    width: 50,
    height: 50,
    position: 'absolute',
  },
};