import React, { useState, useEffect } from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";

// Initial puzzle data (10 puzzles)
const initialPuzzles = [
    { incomplete: "Al_ah", answer: "L", complete: "Allah" },
    { incomplete: "Is_a_m", answer: "L", complete: "Islam" },
    { incomplete: "Sa_ _a", answer: "L", complete: "Sallah" },
    { incomplete: "Z_kat", answer: "A", complete: "Zakat" },
    { incomplete: "Hi_ab", answer: "J", complete: "Hijab" },
    { incomplete: "T_wheed", answer: "a", complete: "Tawheed" },
    { incomplete: "H_dith", answer: "a", complete: "Hadith" },
    { incomplete: "Sa_r", answer: "b", complete: "Sabr" },
    { incomplete: "H_kim", answer: "a", complete: "Hakim" },
    { incomplete: "No_r", answer: "u", complete: "Nour" },
];

// Function that returns an array of letter options for a given puzzle
const getLetterOptions = (puzzle) => {
    switch (puzzle.incomplete) {
        case "Al_ah":
            return ["L", "A", "E", "I", "R", "N", "M", "O"];
        case "Is_a_m":
            return ["L", "O", "I", "R", "D", "S", "T", "U"];
        case "Sa_ _a":
            return ["L", "M", "N", "O", "P", "Q", "R", "S"];
        case "Z_kat":
            return ["A", "E", "I", "O", "U", "Y", "L", "N"];
        case "Hi_ab":
            return ["J", "K", "L", "M", "N", "O", "P", "Q"];
        case "T_wheed":
            return ["a", "e", "i", "o", "u", "l", "m", "n"];
        case "H_dith":
            return ["a", "e", "i", "o", "u", "r", "d", "h"];
        case "Sa_r":
            return ["b", "c", "d", "f", "g", "h", "i", "j"];
        case "H_kim":
            return ["a", "o", "e", "i", "u", "l", "n", "r"];
        case "No_r":
            return ["u", "a", "e", "i", "o", "n", "r", "l"];
        default:
            return [puzzle.answer, "X", "Y", "Z", "W", "V", "U", "T"];
    }
};

// Helper function to shuffle an array
const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
};

const IslamicWordAnagramGameModal = ({ visible, onClose }) => {
    // Pool of all puzzles available for the game (starts with initialPuzzles)
    const [puzzlePool, setPuzzlePool] = useState(initialPuzzles);
    // The current round consists of 5 puzzles
    const [roundPuzzles, setRoundPuzzles] = useState([]);
    // Index of the current puzzle in the round
    const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
    // The user's score in the current round
    const [score, setScore] = useState(0);

    // When the modal becomes visible, start a new round.
    useEffect(() => {
        if (visible) {
            startNewRound();
        }
    }, [visible]);

    const startNewRound = () => {
        // Randomly pick 5 puzzles from the puzzle pool
        const newRound = shuffleArray(puzzlePool).slice(0, 5);
        setRoundPuzzles(newRound);
        setCurrentPuzzleIndex(0);
        setScore(0);
    };

    const currentPuzzle = roundPuzzles[currentPuzzleIndex];

    const handleLetterPress = (letter) => {
        if (!currentPuzzle) return;
        if (letter === currentPuzzle.answer) {
            setScore((prev) => prev + 1);
            // If this was the last puzzle in the round, show congratulations and start a new round
            if (currentPuzzleIndex === roundPuzzles.length - 1) {
                Alert.alert("Congratulations!", "You've completed this round!", [
                    {
                        text: "Next Round",
                        onPress: () => {
                            // For testing: increase the pool by duplicating the current pool
                            setPuzzlePool((prevPool) => [...prevPool, ...prevPool]);
                            startNewRound();
                        },
                    },
                ]);
            } else {
                setCurrentPuzzleIndex((prev) => prev + 1);
            }
        } else {
            Alert.alert("Incorrect", "Try again!");
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    {/* Close Button */}
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>×</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Islamic Word Anagram Game</Text>
                    {currentPuzzle && (
                        <>
                            <Text style={styles.subtitle}>Complete the word:</Text>
                            <Text style={styles.puzzleText}>{currentPuzzle.incomplete}</Text>
                            <View style={styles.optionsContainer}>
                                {shuffleArray(getLetterOptions(currentPuzzle)).map(
                                    (letter) => (
                                        <TouchableOpacity
                                            key={letter}
                                            style={styles.letterButton}
                                            onPress={() => handleLetterPress(letter)}
                                        >
                                            <Text style={styles.letterText}>{letter}</Text>
                                        </TouchableOpacity>
                                    )
                                )}
                            </View>
                            <Text style={styles.scoreText}>Score: {score}</Text>
                        </>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "90%",
        backgroundColor: "#FFF",
        borderRadius: 15,
        padding: 25,
        alignItems: "center",
    },
    closeButton: {
        alignSelf: "flex-end",
    },
    closeButtonText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#EF4444",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#10B981",
        marginVertical: 10,
    },
    subtitle: {
        fontSize: 18,
        color: "#1F2937",
        marginBottom: 10,
    },
    puzzleText: {
        fontSize: 34,
        fontWeight: "bold",
        color: "#1F2937",
        marginVertical: 20,
    },
    optionsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginVertical: 20,
    },
    letterButton: {
        backgroundColor: "#E5E7EB",
        padding: 15,
        margin: 10,
        borderRadius: 8,
        minWidth: 50,
        alignItems: "center",
    },
    letterText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1F2937",
    },
    scoreText: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
        color: "#10B981",
    },
});

export default IslamicWordAnagramGameModal;
