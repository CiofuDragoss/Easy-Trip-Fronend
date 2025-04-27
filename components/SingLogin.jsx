import { useState, useContext, useRef } from "react";
import { StyleSheet, Text, TextInput, View, Animated } from "react-native";
import colors from "../constants/colors";
import AuthSwitcher from "./AnimatedTouchable";
import { LoadingScreen } from "./loading_scr";
import GoButton from "./Gobutton";
import { AuthContext } from "@/context/AuthContext";
import { useAuthForm } from "@/hooks/AuthHook";
const SignLogin = () => {
  const { login, signup, isLoading, authError, LogPanel, setPanel } =
    useContext(AuthContext);
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const loginForm = useAuthForm({
    initialVal: { email: "", password: "" },
    onSubmit: login,
  });

  const signupForm = useAuthForm({
    initialVal: { username: "", email: "", password: "" },
    onSubmit: signup,
  });

  const handleToggle = (panel) => {
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setPanel(panel);

      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };
  const form = LogPanel ? loginForm : signupForm;

  return (
    <View style={styles.loginContainer}>
      <AuthSwitcher onToggle={handleToggle} selected={LogPanel} />

      <Animated.View style={[styles.inputView, { opacity: opacityAnim }]}>
        {LogPanel ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={form.values.email}
              onChangeText={(text) => form.handleChange("email", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {form.errors.email && (
              <Text style={[styles.login_txt_small, { color: "red" }]}>
                {form.errors.email}
              </Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Parola "
              secureTextEntry
              value={form.values.password}
              onChangeText={(text) => form.handleChange("password", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {form.errors.password === "Acest camp este obligatoriu" && (
              <Text style={[styles.login_txt_small, { color: "red" }]}>
                {form.errors.password}
              </Text>
            )}
            {form.errors.password &&
              !authError &&
              form.errors.password !== "Acest camp este obligatoriu" && (
                <Text style={[styles.login_txt_small, { color: "red" }]}>
                  Parola invalida! Verifica parola.
                </Text>
              )}
            {authError && (
              <Text style={[styles.login_txt_small, { color: "red" }]}>
                {authError.message}
              </Text>
            )}
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={form.values.username}
              onChangeText={(text) => form.handleChange("username", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {form.errors.username && (
              <Text style={[styles.login_txt_small, { color: "red" }]}>
                {form.errors.username}
              </Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={form.values.email}
              onChangeText={(text) => form.handleChange("email", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {form.errors.email && (
              <Text style={[styles.login_txt_small, { color: "red" }]}>
                {form.errors.email}
              </Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Parola -> ex. Mypass123@"
              secureTextEntry
              value={form.values.password}
              onChangeText={(text) => form.handleChange("password", text)}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {form.errors.password && (
              <Text style={[styles.login_txt_small, { color: "red" }]}>
                {form.errors.password}
              </Text>
            )}
            {authError && (
              <Text style={[styles.login_txt_small, { color: "red" }]}>
                {authError.message}
              </Text>
            )}
          </>
        )}
      </Animated.View>
      <GoButton
        text={LogPanel ? "Log in" : "Sign up"}
        key={LogPanel ? "Log in" : "Sign up"}
        onSwipe={form.handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    justifyContent: "flex-start",

    width: "80%",
    height: 400,
    borderRadius: 10,
    backgroundColor: colors.login_Container,

    alignItems: "center",
  },

  login_txt: {
    fontFamily: "Poppins-Medium",
    fontSize: 20,
  },
  login_txt_small: {
    fontFamiliy: "Poppins-Medium",
    fontSize: 14,
    alignSelf: "flex-start",
    marginLeft: "7.5%",
  },
  inputView: {
    marginTop: 10,
    width: "80%",
    alignItems: "center",
  },
  input: {
    height: 45,
    width: "85%",
    fontFamily: "Poppins-Medium",
    fontSize: 15,

    backgroundColor: "transparent",
    borderWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: "black",
    paddingHorizontal: 5,
    marginVertical: 8,
  },
});

export default SignLogin;
