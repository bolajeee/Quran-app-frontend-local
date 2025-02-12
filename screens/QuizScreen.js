import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useTheme } from "../components/themeContext";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../components/styles";
// import './QuestionModal.css';

const QuizScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [randomizedQuestions, setRandomizedQuestions] = useState([]);

  const allQuestions = [
    {
      id: 1,
      question: "What is the first Surah of the Quran?",
      options: ["Al-Baqarah", "Al-Fatiha", "Al-Ikhlas", "An-Nas"],
      correct: "Al-Fatiha",
    },
    {
      id: 2,
      question: "How many Juz (parts) are there in the Quran?",
      options: ["20", "25", "30", "40"],
      correct: "30",
    },
    {
      id: 3,
      question: "Which Surah is known as the heart of the Quran?",
      options: ["Yasin", "Al-Fatiha", "Al-Ikhlas", "Al-Kahf"],
      correct: "Yasin",
    },
    {
      id: 4,
      question: "In which month was the Quran revealed?",
      options: ["Shaban", "Rajab", "Ramadan", "Muharram"],
      correct: "Ramadan",
    },
    {
      id: 5,
      question: "Which is the longest Surah in the Quran?",
      options: ["Al-Imran", "An-Nisa", "Al-Baqarah", "Al-Maidah"],
      correct: "Al-Baqarah",
    },
    {
      id: 6,
      question: "How many verses are there in Surah Al-Fatiha?",
      options: ["5", "6", "7", "8"],
      correct: "7",
    },
    {
      id: 7,
      question: "Which Surah is called the 'Mother of the Quran'?",
      options: ["Al-Baqarah", "Al-Fatiha", "Yasin", "Al-Ikhlas"],
      correct: "Al-Fatiha",
    },
    {
      id: 8,
      question: "How many Surahs are there in the Quran?",
      options: ["104", "114", "124", "134"],
      correct: "114",
    },
  ];

  //Navigation Handlers
  const handleHomeNavigation = () => {
    navigation.navigate("Home");
  };
  const handleProfileNavigation = () => {
    navigation.navigate("Profile");
  };

  // Shuffle array function
  const shuffleArray = (array) => {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  // Initialize random questions on component mount
  useEffect(() => {
    // Get 5 random questions
    const shuffledQuestions = shuffleArray([...allQuestions]).slice(0, 5);
    setRandomizedQuestions(shuffledQuestions);
  }, []);

  const calculateCoins = (score, totalQuestions) => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage === 100) return 50;
    if (percentage >= 80) return 30;
    if (percentage >= 60) return 20;
    if (percentage >= 40) return 10;
    return 5;
  };

  const handleQuizSubmit = (score) => {
    // Navigate to Profile screen with the new score
    navigation.navigate("Profile", {
      quizScore: score,
      earnedCoins: earnedCoins,
    });
  };

  const handleAnswer = (answer) => {
    const isCorrect = answer === randomizedQuestions[currentQuestion].correct;

    if (isCorrect) {
      setScore(score + 1);
      setEarnedCoins(earnedCoins + 2);
    }

    if (currentQuestion < randomizedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
      const finalScore = isCorrect ? score + 1 : score;
      const percentage = (finalScore / randomizedQuestions.length) * 100;
      const bonusCoins = calculateCoins(finalScore, randomizedQuestions.length);
      const totalEarnedCoins = earnedCoins + (isCorrect ? 2 : 0) + bonusCoins;

      Alert.alert(
        "Quiz Completed!",
        `Your score: ${finalScore}/${
          randomizedQuestions.length
        } (${percentage.toFixed(1)}%)\n\nCoins earned: ${totalEarnedCoins} 🪙`,
        [
          {
            text: "Collect Coins",
            onPress: () => {
              handleQuizSubmit(finalScore);
            },
          },
        ]
      );
    }
  };

  // Show loading state while questions are being randomized
  if (randomizedQuestions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading questions...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.textColor }]}>
          Quiz
        </Text>
      </View>

      {/* Quiz content */}
      <View
        style={[
          styles.quizContainer,
          { backgroundColor: theme.listBackground },
        ]}
      >
        <TouchableOpacity
          onPress={handleHomeNavigation}
          style={styles.closeButton}
        >
          <AntDesign name="arrowleft" size={24} color={theme.textColor} />
        </TouchableOpacity>

        <View style={styles.content}>
          <View
            style={[
              styles.coinIndicator,
              { backgroundColor: theme.cardBackground },
            ]}
          >
            <AntDesign name="star" size={24} color={Colors.brand} />
            <Text style={[styles.coinText, { color: Colors.brand }]}>
              {earnedCoins}
            </Text>
          </View>

          <View
            style={[
              styles.progressBar,
              { backgroundColor: theme.cardBackground },
            ]}
          >
            <View
              style={[
                styles.progress,
                {
                  width: `${
                    ((currentQuestion + 1) / randomizedQuestions.length) * 100
                  }%`,
                  backgroundColor: Colors.brand,
                },
              ]}
            />
          </View>

          <Text style={[styles.questionNumber, { color: theme.textColor }]}>
            Question {currentQuestion + 1} of {randomizedQuestions.length}
          </Text>

          <Text style={[styles.questionText, { color: theme.textColor }]}>
            {randomizedQuestions[currentQuestion].question}
          </Text>

          <View style={styles.optionsContainer}>
            {shuffleArray([
              ...randomizedQuestions[currentQuestion].options,
            ]).map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleAnswer(option)}
                style={[
                  styles.optionButton,
                  { backgroundColor: theme.listBackground },
                ]}
              >
                <Text style={[styles.optionText, { color: theme.textColor }]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.scoreText}>
            Score: {score}/{randomizedQuestions.length}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 0,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    left: 16,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 30,
    paddingHorizontal: 16,
  },
  progressBar: {
    width: "100%",
    height: 6,
    borderRadius: 3,
    margin: 20,
  },
  progress: {
    height: "100%",
    backgroundColor: Colors.brand,
    borderRadius: 3,
  },
  questionNumber: {
    fontSize: 16,
    margin: 10,
  },
  questionText: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  optionsContainer: {
    width: "100%",
    marginVertical: 20,
  },
  optionButton: {
    borderWidth: 1,
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  optionText: {
    fontSize: 18,
    textAlign: "center",
  },
  scoreText: {
    marginTop: 20,
    fontSize: 16,
    color: Colors.brand,
    fontWeight: "600",
  },
  coinIndicator: {
    position: "absolute",
    top: 20,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    marginTop: 40,
  },
  coinText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 5,
    color: Colors.brand,
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
  },
  header: {
    padding: 16,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  quizContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
  },
};

export default QuizScreen;
