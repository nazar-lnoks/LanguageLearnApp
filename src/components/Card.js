import { Text, View, StyleSheet, Button, Image, TouchableOpacity } from "react-native";
import FlipCard from "react-native-flip-card";
import CButton from "./CButton";
import * as React from "react";
import { db } from "../Firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { Root, Popup } from "popup-ui";
import { Shadow } from "react-native-shadow-2";
import { getAuth } from "firebase/auth";
import { data } from "../../assets/WordsData";

export default function Card() {
  const auth = getAuth();

  const wordsCollectionRef = collection(db, "words");

  const [ukrainianWord, setUkrainianWord] = React.useState("");
  const [englishWord, setEnglishWord] = React.useState("");

  const changeValues = () => {
    let num = Math.floor(Math.random() * data.length);
    setUkrainianWord(data[num].ukrainian);
    setEnglishWord(data[num].english);
  };
  

  const getWords = async () => {
    const data = await getDocs(wordsCollectionRef);

    setWords(
      data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((word) => word.uid == auth.currentUser.uid)
    );
  };

  const Create = async () => {
    const docData = {
      english: englishWord,
      ukrainian: ukrainianWord,
      uid: auth.currentUser.uid,
    };

    await addDoc(wordsCollectionRef, docData).then(() => {
      alert("Word added successfully");
    });
  };

  // SHADOW OLUNCA, WIDGHT VE LENGTHE BAKMIYOR WORDE GÖRE ALIYOR BOX-SIZE'I
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.imageContainer}>
        <Image source={require("../../assets/svgs/circle.png")} />
        <Image source={require("../../assets/svgs/orangeCircle.png")} />
      </View>
      <View style={styles.singleSlide}>
        <View style={styles.singleCardWrapper}>
          <FlipCard
            style={styles.singleCard}
            flipHorizontal={true}
            flipVertical={false}
          >
            <Shadow stretch={true}>
              <View style={styles.cardFrontAndBack}>
                <Text style={styles.slideText}>{ukrainianWord}</Text>
                {<View style={styles.cardMasteredIconContainer}></View>}
              </View>
            </Shadow>
            <Shadow stretch={true}>
              <View style={[styles.cardFrontAndBack, styles.cardBack]}>
                <Text style={styles.slideText}>{englishWord}</Text>
                {
                  <View
                    style={[
                      styles.cardMasteredIconContainer,
                      styles["cardMasteredIconContainer--Back"],
                    ]}
                  ></View>
                }
              </View>
            </Shadow>
          </FlipCard>
          <View style={styles.parent}>
            <CButton
              text={"🪄 Change"}
              onClick={() => {
                {
                  changeValues();
                }
              }}
            />

            <CButton
              text={"📝 Add to List"}
              onClick={() => {
                Create();
                console.log("-------------");
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  singleSlide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  singleCardWrapper: {
    height: 400,
    width: 320,
  },
  singleCardWrapper: {
    height: 400,
    width: 320,
  },
  singleCard: {},
  cardFrontAndBack: {
    backgroundColor: "#3BB894",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 10,
    padding: 20,
  },
  slideText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardMasteredIconContainer: {
    backgroundColor: "#3BB894",
    position: "absolute",

    bottom: 10,
    right: 10,
  },
  "cardMasteredIconContainer--Back": {
    backgroundColor: "#B83B5E",
  },
  cardFrontAndBack: {
    backgroundColor: "#3BB894",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 10,
    padding: 20,
  },
  cardBack: {
    backgroundColor: "#B83B5E",
  },
  parent: {
    // flex: 1,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
