import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  Pressable,
  FlatList,
} from "react-native";
import { BlurView } from "expo-blur";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Overlay } from "react-native-maps";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AnimatedLogo from "@/components/animatedSmallLogo";
import Gradient from "./Gradient";
import { Image } from "expo-image";
const { height, width } = Dimensions.get("window");
const MODAL_WIDTH = width * 0.9;
const MODAL_HEIGHT = height * 0.8;

export default function ModalReviews({ reviews, visible, onClose }) {
  return (
    <View>
      <Modal
        visible={visible}
        animationType="fade"
        transparent
        onRequestClose={onClose}
      >
        <BlurView intensity={115} tint={"dark"} style={styles.blur}>
          <View style={styles.wrap}>
            <View style={styles.modalContainer}>
              <View style={styles.row}>
                <AnimatedLogo
                  style={{ marginHorizontal: 2 }}
                  style2={{ fontSize: 30 }}
                  style3={{ right: -8, top: 9 }}
                  size={12}
                />

                <Text style={styles.text}>reviews</Text>
                <Pressable
                  onPress={onClose}
                  style={styles.cancelButton}
                  hitSlop={{ top: 22, bottom: 22, left: 22, right: 22 }}
                >
                  <AntDesign name="closecircleo" size={29} color="black" />
                </Pressable>
              </View>
              <Gradient style={styles.line} color={"#585d6b"} x={0.9} />
              <FlatList
                data={reviews}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                  <View style={{ marginTop: 5 }}>
                    <Text
                      style={[
                        styles.textFlatlist,
                        { color: "#007BFF", fontStyle: "italic" },
                      ]}
                    >
                      Reviews Google.com
                    </Text>
                  </View>
                )}
                renderItem={({ item }) => (
                  <View style={styles.MainVflatlist}>
                    <Gradient
                      style={styles.gradientView}
                      color={"white"}
                      x={0.6}
                    >
                      <View style={styles.rowFlatList}>
                        <Image
                          source={item.authorAttribution.photoUri}
                          style={{ width: 30, height: 30, marginRight: 7 }}
                        />
                        <View
                          style={{
                            flex: 1,
                            flexWrap: 1,
                            alignItems: "flex-start",
                          }}
                        >
                          <Text style={styles.textTitleFlatlist}>
                            {item.authorAttribution?.displayName}
                          </Text>
                        </View>
                      </View>
                      <View style={[styles.rowFlatList]}>
                        <Text
                          style={[
                            styles.textTitleFlatlist,
                            { fontSize: 15, marginRight: 5 },
                          ]}
                        >
                          Rating:
                        </Text>
                        {[...Array(5)].map((_, i) => (
                          <AntDesign
                            key={i}
                            name={item.rating <= i ? "staro" : "star"}
                            size={25}
                            color="#FFD700"
                            style={{
                              marginRight: 2,

                              includeFontPadding: false,
                              lineHeight: 23,
                              borderColor: "black",
                            }}
                          />
                        ))}
                      </View>
                    </Gradient>

                    <View style={{ alignItems: "center" }}>
                      <Gradient
                        style={[styles.line, { width: 50, margin: 6 }]}
                        color={"black"}
                        x={0.6}
                      />
                      <Text style={styles.textFlatlist}>
                        {item.originalText?.text}
                      </Text>
                    </View>
                  </View>
                )}
                contentContainerStyle={{ padding: 2 }}
              />
              <Gradient style={styles.line} color={"#585d6b"} x={0.9} />
            </View>
          </View>
        </BlurView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  gradientView: {
    marginVertical: 10,
    borderRadius: 20,
    padding: 6,
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  cancelButton: {
    position: "absolute",
    right: -80,
    top: 0,
  },
  MainVflatlist: {
    marginBottom: 8,
    alignItems: "center",
  },
  textFlatlist: {
    fontFamily: "Poppins-Medium",
    textAlign: "center",
    fontSize: 18,
    color: "#172342",
  },
  textTitleFlatlist: {
    fontFamily: "Poppins-Bold",

    textAlign: "center",
    fontSize: 19,
  },
  rowFlatList: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginBottom: 15,
  },
  text: {
    textAlign: "center",
    fontSize: 15,
    color: "#007BFF",
    fontFamily: "Poppins-Bold",
  },

  wrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    width: "99%",
    height: 3,

    borderRadius: 10,
  },
  modalContainer: {
    width: MODAL_WIDTH,
    height: MODAL_HEIGHT,
    borderWidth: 2,
    borderColor: "blue",
    backgroundColor: "lightblue",
    borderRadius: 30,
    padding: 16,
    alignItems: "center",
  },
});
