import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
} from "react-native";

import image1 from "./puzzleGameAssets/image1.avif";
import image2 from "./puzzleGameAssets/image2.avif";
import image3 from "./puzzleGameAssets/image3.avif";

const GRID_SIZE = 3;
const IMAGE_SIZE = 300;

const shuffleArray = (array) => {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const isSolvable = (tiles) => {
  const flatTiles = tiles.filter((t) => t !== null);
  let inversions = 0;
  for (let i = 0; i < flatTiles.length - 1; i++) {
    for (let j = i + 1; j < flatTiles.length; j++) {
      if (flatTiles[i] > flatTiles[j]) inversions++;
    }
  }
  return inversions % 2 === 0;
};

const SlidingPuzzleGame = ({ visible, onClose, imagePaths = [] }) => {
  const defaultImages = [image1, image2, image3];

  const [selectedImage, setSelectedImage] = useState(
    imagePaths[0] || defaultImages[0]
  );

  const initialTiles = [...Array(GRID_SIZE * GRID_SIZE - 1).keys()]
    .map((i) => i + 1)
    .concat(null);

  const [tiles, setTiles] = useState(() => shuffleValidTiles(initialTiles));

  function shuffleValidTiles(initialTiles) {
    let shuffled = shuffleArray(initialTiles);
    while (!isSolvable(shuffled)) {
      shuffled = shuffleArray(initialTiles);
    }
    return shuffled;
  }

  const resetGame = () => {
    setTiles(shuffleValidTiles(initialTiles));
  };

  const getPosition = (index) => ({
    row: Math.floor(index / GRID_SIZE),
    col: index % GRID_SIZE,
  });

  const swapTiles = (index1, index2) => {
    const newTiles = [...tiles];
    [newTiles[index1], newTiles[index2]] = [newTiles[index2], newTiles[index1]];
    setTiles(newTiles);
  };

  const handleTilePress = (index) => {
    const emptyIndex = tiles.indexOf(null);
    const { row: r1, col: c1 } = getPosition(index);
    const { row: r2, col: c2 } = getPosition(emptyIndex);

    if (
      (Math.abs(r1 - r2) === 1 && c1 === c2) ||
      (Math.abs(c1 - c2) === 1 && r1 === r2)
    ) {
      swapTiles(index, emptyIndex);
    }
  };

  const isSolved = () => {
    for (let i = 0; i < tiles.length - 1; i++) {
      if (tiles[i] !== i + 1) return false;
    }
    return true;
  };

  useEffect(() => {
    if (isSolved()) {
      setTimeout(() => {
        Alert.alert("Congratulations!", "Puzzle solved!", [
          { text: "OK", onPress: resetGame },
        ]);
      }, 300); // Short delay before resetting
    }
  }, [tiles]);

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        {/* Image Selector */}
        <View style={styles.imageSelectorContainer}>
          {[...defaultImages, ...imagePaths].map((img, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedImage(img)}
            >
              <Image
                source={typeof img === "string" ? { uri: img } : img}
                style={styles.imageThumbnail}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Puzzle Grid */}
        <View style={styles.puzzleContainer}>
          {tiles.map((tile, index) => {
            if (tile === null)
              return (
                <View key={index} style={[styles.tile, styles.emptyTile]} />
              );

            const { row, col } = getPosition(tile - 1);
            return (
              <TouchableOpacity
                key={index}
                style={styles.tile}
                onPress={() => handleTilePress(index)}
              >
                <ImageBackground
                  source={typeof selectedImage === "string" ? { uri: selectedImage } : selectedImage}
                  style={styles.tileImage}
                  imageStyle={{
                    width: IMAGE_SIZE,
                    height: IMAGE_SIZE,
                    top: -row * (IMAGE_SIZE / GRID_SIZE),
                    left: -col * (IMAGE_SIZE / GRID_SIZE),
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Image
            source={typeof selectedImage === "string" ? { uri: selectedImage } : selectedImage}
            style={styles.originalImage}
          />
        </TouchableOpacity>
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
  imageSelectorContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  imageThumbnail: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 5,
  },
  puzzleContainer: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    backgroundColor: "#fff",
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 10,
    overflow: "hidden",
  },
  tile: {
    width: IMAGE_SIZE / GRID_SIZE,
    height: IMAGE_SIZE / GRID_SIZE,
    borderWidth: 1,
    overflow: "hidden",
  },
  emptyTile: {
    backgroundColor: "#eee",
  },
  tileImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    resizeMode: "cover",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#6D28D9",
    borderRadius: 5,
  },
  originalImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

export default SlidingPuzzleGame;
