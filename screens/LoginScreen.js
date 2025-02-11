import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";



//icons
import { Ionicons, Octicons, Fontisto } from "@expo/vector-icons";

//formik
import { Formik } from "formik";

import React, { useState } from "react";
import {
  Colors,
  InnerContainer,
  PageLogo,
  PageTitle,
  StyledContainer,
  SubTitle,
  StyledTextInput,
  StyledButton,
  StyledButtonText,
  LeftIcon,
  RightIcon,
  StyledInputLabel,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from "../components/styles";

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

const LoginScreen = ({navigation}) => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}

    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StyledContainer style={styles.container}>
          <StatusBar style="dark" />
          <InnerContainer>
            <PageLogo
              resizeMode="cover"
              source={require("../assets/images/quran-logo.png")}
              style={styles.logo}
            />
            <PageTitle style={styles.title}>Quran Master</PageTitle>
            <SubTitle style={styles.subtitle}>Account Login</SubTitle>

            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(values) => console.log(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <>
                  <MyTextInput
                    label="Email"
                    icon="mail"
                    placeholder="Enter your email"
                    placeholderTextColor={Colors.darkLight}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                  />
                  <MyTextInput
                    label="Password"
                    icon="lock"
                    placeholder="Enter your password"
                    placeholderTextColor={Colors.darkLight}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry={hidePassword}
                    isPassword={true}
                    hidePassword={hidePassword}
                    setHidePassword={setHidePassword}
                  />

                  <MsgBox>...</MsgBox>
                  <StyledButton
                    onPress={handleSubmit}
                    style={styles.loginButton}
                  >
                    <StyledButtonText>Login</StyledButtonText>
                  </StyledButton>
                  <Line style={styles.line} />
                  <StyledButton
                    google={true}
                    onPress={handleSubmit}
                    style={styles.googleButton}
                  >
                    <Fontisto name="google" size={20} color={Colors.primary} />
                    <StyledButtonText google={true}>
                      Sign in with Google
                    </StyledButtonText>
                  </StyledButton>
                  <ExtraView style={styles.extraView}>
                    <ExtraText>Don't have an account?</ExtraText>
                    <TextLink onPress={() => navigation.navigate("Signup")}>
                      <TextLinkContent>Sign Up</TextLinkContent>
                    </TextLink>
                  </ExtraView>
                </>
              )}
            </Formik>
          </InnerContainer>
        </StyledContainer>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <StyledInputLabel>{label}</StyledInputLabel>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <LeftIcon style={{ paddingBottom: 10 }}>
          <Octicons name={icon} size={20} color={Colors.darkLight} />
        </LeftIcon>
        <StyledTextInput
          placeholder={label}
          placeholderTextColor={Colors.darkLight}
          secureTextEntry={hidePassword}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <RightIcon style={{ paddingBottom: 10 }}>
              <Ionicons
                name={hidePassword ? "eye-off" : "eye"}
                size={20}
                color={Colors.darkLight}
              />
            </RightIcon>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: brand,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: darkLight,
    marginBottom: 30,
  },
  loginButton: {
    width: "100%",
    backgroundColor: brand,
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
  googleButton: {
    width: "100%",
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D3D3D3",
  },
  line: {
    marginVertical: 20,
  },
  extraView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
