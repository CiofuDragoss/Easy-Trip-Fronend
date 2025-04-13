import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text,View, StyleSheet, Dimensions } from 'react-native';

// Obține lățimea ecranului înainte de toate
const { width } = Dimensions.get('window');
const SLIDER_WIDTH = width/2; 
const HANDLE_SIZE = 33;

export default function Slider({labels,text}) {
  const translateX = useSharedValue(-HANDLE_SIZE/2);
  const startX= useSharedValue(0);
  const panGesture = Gesture.Pan().onStart(() => {
    
      startX.value = translateX.value-HANDLE_SIZE/2;
    })
    .onUpdate((event) => {
      
      translateX.value = Math.min(
        Math.max(startX.value+event.translationX, -HANDLE_SIZE/2),
        SLIDER_WIDTH - HANDLE_SIZE/2
      );
    })
    .onEnd(() => {
      
      translateX.value = withSpring(translateX.value);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  const colorStyle = useAnimatedStyle(() => ({
    width: translateX.value + HANDLE_SIZE/ 2 , 
  }));

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.track} >
        <Animated.View style={[styles.filledTrack, colorStyle]} />
        </View>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.handle, animatedStyle]} />
        </GestureDetector>
    
      
            
            </View>
            <View style={styles.labelsContainer}>
              {labels.map((label, index) => (
                <View key={index} style={styles.markers}>
                  <View style={styles.bar}/>
                  <Text style={styles.labelTxt}>{label}</Text>
                  
                </View>
              ))}
            </View>
      </View>
    
  );
}

const styles = StyleSheet.create({
    main:{
      
        alignItems:"center",
        
    },
    softText:{
      fontFamily:"Poppins-Bold",
      fontSize:11,
      color:"grey",
    },
    labelTxt: {
        fontFamily: 'Poppins-Bold',
        fontSize: 13,
        color: 'black',
        position:"absolute",
        top:12,
        textAlign:"center",
        width: 60,
        backgroundColor:"red",
      },
    markers:{
        height: 20,
        alignItems:"center",
        position:"relative",
        
    },
    labelsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: SLIDER_WIDTH-1,
        marginTop: 3,
      },
    bar:{
      borderRadius: 10,
        height:11,
        width:2,
        backgroundColor:"black",
    },
  container: {
    position: 'relative',
    justifyContent: 'center',
  },
  filledTrack: {
    height: '30%',
    backgroundColor: '#3498db',
  },
  track: {
    justifyContent: 'center',
    width: SLIDER_WIDTH,
    height: 5,
    backgroundColor: '#ddd',
    borderRadius: 2,
  },
  handle: {
    position: 'absolute',
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
    borderRadius: 20,
    backgroundColor: '#3498db',
    top: -(HANDLE_SIZE) 
  },
});

