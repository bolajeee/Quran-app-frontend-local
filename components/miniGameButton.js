import React, { useState } from "react";
import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import SlidingPuzzleGame from "./minigames/SlidingPuzzleGame";
import IslamicAlphabetGame from "./minigames/IslamicAlphabetGame";

const MiniGameButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [slidingGameVisible, setSlidingGameVisible] = useState(false);
  const [alphabetGameVisible, setAlphabetGameVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <FontAwesome name="gamepad" size={24} color="white" />
      </TouchableOpacity>

      {/* Game Selection Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Game</Text>

            <TouchableOpacity
              style={styles.gameButton}
              onPress={() => {
                setModalVisible(false);
                setSlidingGameVisible(true);
              }}
            >
              <Text style={styles.gameButtonText}>Sliding Puzzle</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.gameButton}
              onPress={() => {
                setModalVisible(false);
                setAlphabetGameVisible(true);
              }}
            >
              <Text style={styles.gameButtonText}>Islamic Alphabet</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Islamic Alphabet Game Modal */}
      <IslamicAlphabetGame visible={alphabetGameVisible} onClose={() => setAlphabetGameVisible(false)} />
      {/* Sliding Puzzle Game Modal */}
      <SlidingPuzzleGame visible={slidingGameVisible} onClose={() => setSlidingGameVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#6D28D9",
    padding: 10,
    borderRadius: "100%",
    alignItems: "center",
    position: "absolute",
    zIndex: 100,

  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  gameButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  gameButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#D32F2F",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default MiniGameButton;