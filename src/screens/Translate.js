import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors } from "../themes/Colors";
import { units } from "../themes/Units";
import translateText from '../OpenAITranslator';

export default function Translate() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    const translation = await translateText(inputText);
    setTranslatedText(translation);
  };

  return (
    <View style={styles.container}>
        <View style={{
            backgroundColor:"#FFF",
            paddingVertical:8,
            paddingHorizontal:20,
            marginHorizontal:20,
            borderRadius:15,
            marginTop:25,
            flexDirection:"row",
            alignItems:"center"
        }}>
            <TextInput
                placeholder="Enter English text"
                placeholderTextColor={colors.GREEN}
                style={{
                    fontWeight:"bold",
                    fontSize:18,
                    width:260
                }}
                onChangeText={setInputText}
                value={inputText}
            />
            <Image
            source={require('../images/3.png')}
            style={{height:20,width:20}}
            />
        </View>
        <TouchableOpacity onPress={handleTranslate} style={styles.containerBtn}>
            <Text style={styles.title}>Translate to Ukrainian</Text>
        </TouchableOpacity>
      {/* <TextInput
        style={styles.input}
        onChangeText={setInputText}
        value={inputText}
        placeholder="Enter English text"
      />
      <Button
        title="Translate to Ukrainian"
        onPress={handleTranslate}
      />*/}
      {translatedText ? <Text style={styles.output}>{translatedText}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  output: {
    marginTop: 20,
    fontSize: 18,
  },
  containerBtn: {
    backgroundColor: colors.GREEN,
    borderRadius: 29,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    height: 50,
    width: 190
  },
  title: {
    color: colors.WHITE,
    fontWeight: "600",
    fontSize: 16,
  },
});
