import {Text, View, StyleSheet} from 'react-native';
import {useContext} from 'react';

export default function BaseQuestions() {
  return (
    <View style={styles.main}>
      <Text style={styles.text}>Care este bugetul tau?</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  main: {
    width: '100%',
    padding:"10%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    backgroundColor:"red",
    fontFamily:"Poppins-Bold",
    fontSize: 20,

  }
});