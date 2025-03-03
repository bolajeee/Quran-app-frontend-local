import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const arabicLetters = [
  { letter: "ا", name: "Alif" },
  { letter: "ب", name: "Ba" },
  { letter: "ت", name: "Ta" },
  { letter: "ث", name: "Tha" },
  { letter: "ج", name: "Jeem" },
  { letter: "ح", name: "Haa" },
  { letter: "خ", name: "Khaa" },
  { letter: "د", name: "Dal" },
  { letter: "ذ", name: "Dhal" },
  { letter: "ر", name: "Ra" },
  { letter: "ز", name: "Zay" },
  { letter: "س", name: "Seen" },
  { letter: "ش", name: "Sheen" },
  { letter: "ص", name: "Saad" },
  { letter: "ض", name: "Dhaad" },
  { letter: "ط", name: "Taa" },
  { letter: "ظ", name: "Zaa" },
  { letter: "ع", name: "Ayn" },
  { letter: "غ", name: "Ghayn" },
  { letter: "ف", name: "Fa" },
  { letter: "ق", name: "Qaf" },
  { letter: "ك", name: "Kaf" },
  { letter: "ل", name: "Lam" },
  { letter: "م", name: "Meem" },
  { letter: "ن", name: "Noon" },
  { letter: "ه", name: "Ha" },
  { letter: "و", name: "Waw" },
  { letter: "ي", name: "Ya" },
];

const IslamicAlphabetGame = ({ visible, onClose }) => {
  const [currentLetter, setCurrentLetter] = useState(
    arabicLetters[Math.floor(Math.random() * arabicLetters.length)]
  );
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [correctCount, setCorrectCount] = useState(0);

  const checkAnswer = () => {
    if (input.trim().toLowerCase() === currentLetter.name.toLowerCase()) {
      setMessage("Correct! 🎉");
      setCorrectCount(correctCount + 1);
      
      if (correctCount + 1 === 5) {
        Alert.alert("Congratulations!", "You have correctly answered 5 letters! 🎉", [
          { text: "OK", onPress: () => setCorrectCount(0) }
        ]);
      }

      setTimeout(() => {
        setCurrentLetter(
          arabicLetters[Math.floor(Math.random() * arabicLetters.length)]
        );
        setMessage("");
        setInput("");
      }, 1000);
    } else {
      setMessage("Try again! ❌");
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.gameContainer}>
          <Text style={styles.letter}>{currentLetter.letter}</Text>
          <Text style={styles.counter}>Correct: {correctCount}/5</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter letter name"
            value={input}
            onChangeText={setInput}
          />
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={checkAnswer}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  gameContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  letter: {
    fontSize: 80,
    fontWeight: "bold",
    marginBottom: 20,
  },
  counter: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    width: 200,
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "green",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#6D28D9",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default IslamicAlphabetGame;