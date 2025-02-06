import React, { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { Ionicons, Octicons } from "@expo/vector-icons";
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

const SignUpScreen = ({ navigation }) => {
  // Add navigation prop
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StyledContainer StyleSheet={styles.container}>
          <StatusBar style="dark" />
          <InnerContainer>
            <PageLogo
              resizeMode="cover"
              source={require("../assets/images/quran-logo.png")}
            />
            <PageTitle>Quran Master</PageTitle>
            <SubTitle>Create Your Account</SubTitle>

            <Formik
              initialValues={{
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              onSubmit={(values) => console.log(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <>
                  <MyTextInput
                    label="Full Name"
                    icon="person"
                    placeholder="Enter your full name"
                    placeholderTextColor={Colors.darkLight}
                    onChangeText={handleChange("fullName")}
                    onBlur={handleBlur("fullName")}
                    value={values.fullName}
                  />
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
                  <MyTextInput
                    label="Confirm Password"
                    icon="lock"
                    placeholder="Confirm your password"
                    placeholderTextColor={Colors.darkLight}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                    secureTextEntry={hideConfirmPassword}
                    isPassword={true}
                    hidePassword={hideConfirmPassword}
                    setHidePassword={setHideConfirmPassword}
                  />

                  <MsgBox>...</MsgBox>
                  <StyledButton
                    onPress={() => {
                      handleSubmit();
                      {
                        navigation.navigate("Home");
                      }
                    }}

                  >
                    <StyledButtonText>Sign Up</StyledButtonText>
                  </StyledButton>
                  <Line />
                  <ExtraView>
                    <ExtraText>Already have an account?</ExtraText>
                    <TextLink onPress={() => navigation.navigate("Login")}>
                      <TextLinkContent>Login</TextLinkContent>
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
                name={hidePassword ? "eye" : "eye-off"}
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

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
  logo: {
    width: 150,
    height: 150,
  },
  signup: {
    width: "100%",
  },
});
