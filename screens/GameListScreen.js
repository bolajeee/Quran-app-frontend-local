import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Image
} from "react-native";
import {
  StyledContainer,
  PageTitle,
} from "../components/styles";

// Import game components
import SlidingPuzzleGame from "../components/minigames/SlidingPuzzleGame";
import IslamicAlphabetGame from "../components/minigames/IslamicAlphabetGame";
import WordMatchModal from "../components/minigames/WordMatchGame";
import WordAnagramModal from "../components/minigames/WordAnagramsGame";

// Import game images
import SlidingPuzzleImage from "../assets/images/sliding-puzzle-thumbnail.avif";
import IslamicAlphabetImage from "../assets/images/islamic-alphabet-thumbnail.avif";
import WordMatchImage from "../assets/images/word-match-thumbnail.avif";
import WordAnagramImage from "../assets/images/word-anagrams-thumbnail.avif";

const GAMES = [
  {
    name: "Sliding Puzzle",
    component: SlidingPuzzleGame,
    image: SlidingPuzzleImage,
    description: "Test your problem-solving skills",
  },
  {
    name: "Islamic Alphabet",
    component: IslamicAlphabetGame,
    image: IslamicAlphabetImage,
    description: "Learn Arabic letters",
  },
  {
    name: "Word Match",
    component: WordMatchModal,
    image: WordMatchImage,
    description: "Match the words with their meanings",
  },
  {
    name: "Word Anagrams",
    component: WordAnagramModal,
    image: WordAnagramImage,
    description: "Complete the following words",
  },
  // Add more games here as needed
];

const GameListScreen = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  const closeGame = () => {
    setSelectedGame(null);
  };

  return (
    <StyledContainer>
      <PageTitle>Mini Games</PageTitle>
      <ScrollView
        contentContainerStyle={styles.gameGridContainer}
      >
        {GAMES.map((game, index) => (
          <TouchableOpacity
            key={index}
            style={styles.gameButton}
            onPress={() => handleGameSelect(game)}
          >
            <Image
              source={game.image}
              style={styles.gameImage}
              resizeMode="cover"
            />
            <View style={styles.gameInfoContainer}>
              <Text style={styles.gameTitle}>{game.name}</Text>
              <Text style={styles.gameDescription}>{game.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Render the selected game */}
      {selectedGame && (
        <selectedGame.component 
          visible={!!selectedGame} 
          onClose={closeGame} 
        />
      )}
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  gameGridContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  gameButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  gameImage: {
    width: '100%',
    height: 200,
  },
  gameInfoContainer: {
    padding: 15,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  gameDescription: {
    fontSize: 14,
    color: "#666",
  },
});

export default GameListScreen;