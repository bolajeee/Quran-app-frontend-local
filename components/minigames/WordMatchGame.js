import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  ScrollView,
} from "react-native";

// Our word pairs (we have 6 pairs here but we'll select 5 per round)
const wordPairs = [
  { word: "QURAN", meaning: "The holy book of Islam" },
  { word: "SALAH", meaning: "Prayer performed five times a day" },
  { word: "ZAKAT", meaning: "Obligatory charity in Islam" },
  { word: "HIJAB", meaning: "Modest covering worn by Muslim women" },
  { word: "MECCA", meaning: "The holiest city in Islam" },
  { word: "FASTING", meaning: "Observed during Ramadan" },
];

// Function to shuffle array
const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const WordMatchModal = ({ visible, onClose }) => {
  const [words, setWords] = useState([]);
  const [meanings, setMeanings] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedMeaning, setSelectedMeaning] = useState(null);
  const [score, setScore] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState([]);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    // Shuffle the pairs and pick the first 5
    const shuffledPairs = shuffleArray(wordPairs).slice(0, 5);
    setWords(shuffledPairs.map((item) => item.word));
    // Shuffle the meanings separately so they appear in random order
    setMeanings(shuffleArray(shuffledPairs.map((item) => item.meaning)));
    setMatchedPairs([]);
    setScore(0);
    setSelectedWord(null);
    setSelectedMeaning(null);
  };

  const checkMatch = () => {
    if (!selectedWord || !selectedMeaning) return;

    const correctPair = wordPairs.find(
      (pair) => pair.word === selectedWord && pair.meaning === selectedMeaning
    );

    if (correctPair) {
      setMatchedPairs([...matchedPairs, selectedWord]);
      setScore(score + 1);
      Alert.alert("✅ Correct!", `${selectedWord} matches!`);
    } else {
      Alert.alert("❌ Wrong!", "Try again.");
    }
    setSelectedWord(null);
    setSelectedMeaning(null);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <ScrollView contentContainerStyle={modalStyles.modalContainer}>
        <View style={modalStyles.modalContent}>
          {/* Close Button */}
          <TouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
            <Text style={modalStyles.closeButtonText}>×</Text>
          </TouchableOpacity>
          <Text style={modalStyles.title}>🕌 Muslim Word Matching Game</Text>
          <Text style={modalStyles.subtitle}>
            Match the words with their correct meanings!
          </Text>

          <View style={styles.gameContainer}>
            <View style={styles.column}>
              <Text style={styles.columnTitle}>Words</Text>
              {words.map((word) => (
                <TouchableOpacity
                  key={word}
                  style={[
                    styles.card,
                    selectedWord === word && styles.selectedCard,
                    matchedPairs.includes(word) && styles.matchedCard,
                  ]}
                  onPress={() => setSelectedWord(word)}
                  disabled={matchedPairs.includes(word)}
                >
                  <Text style={styles.cardText}>{word}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.column}>
              <Text style={styles.columnTitle}>Meanings</Text>
              {meanings.map((meaning) => {
                const pair = wordPairs.find((pair) => pair.meaning === meaning);
                return (
                  <TouchableOpacity
                    key={meaning}
                    style={[
                      styles.card,
                      selectedMeaning === meaning && styles.selectedCard,
                      matchedPairs.includes(pair?.word) && styles.matchedCard,
                    ]}
                    onPress={() => setSelectedMeaning(meaning)}
                    disabled={matchedPairs.includes(pair?.word)}
                  >
                    <Text style={styles.cardText}>{meaning}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <TouchableOpacity onPress={checkMatch} style={styles.checkButton}>
            <Text style={styles.checkButtonText}>Check Match</Text>
          </TouchableOpacity>

          <Text style={styles.score}>Score: {score}</Text>

          <TouchableOpacity
            onPress={startNewGame}
            style={[styles.checkButton, styles.restartButton]}
          >
            <Text style={styles.checkButtonText}>Restart Game 🔄</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  gameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    maxWidth: 350,
    marginVertical: 20,
  },
  column: {
    width: "45%",
  },
  columnTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#1F2937",
  },
  card: {
    backgroundColor: "#FFF",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedCard: {
    backgroundColor: "#D1E7FF",
  },
  matchedCard: {
    backgroundColor: "#A7F3D0",
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1F2937",
  },
  checkButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  checkButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  score: {
    fontSize: 18,
    marginTop: 20,
    color: "#1F2937",
  },
});

const modalStyles = StyleSheet.create({
  modalContainer: {
    flexGrow: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  closeButtonText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#EF4444",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1F2937",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#4B5563",
  },
});

export default WordMatchModal;
