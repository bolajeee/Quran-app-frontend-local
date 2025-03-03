import React, { useState } from "react";
import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import SlidingPuzzleGame from "./minigames/SlidingPuzzleGame";


const MiniGameButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [gameModalVisible, setGameModalVisible] = useState(false);

  const openGame = () => {
    setModalVisible(false);
    setGameModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Play Games</Text>
      </TouchableOpacity>

      {/* Game Selection Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Game</Text>
            <TouchableOpacity style={styles.gameButton} onPress={openGame}>
              <Text style={styles.gameButtonText}>Sliding Puzzle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Sliding Puzzle Game Modal */}
      <SlidingPuzzleGame
        visible={gameModalVisible}
        onClose={() => setGameModalVisible(false)}
      />
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
    backgroundColor: "#6D28D9",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
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
