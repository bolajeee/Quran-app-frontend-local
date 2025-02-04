import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { Octicons } from "@expo/vector-icons";

import { Formik } from "formik";
import React from "react";
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
} from "../components/styles";

const LoginScreen = () => {
  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageLogo
          resizeMode="cover"
          source={require("../assets/images/quran-logo.png")}
        />
        <PageTitle>Quran Master</PageTitle>
        <SubTitle>Account Login</SubTitle>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => console.log(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <StyledTextInput
                placeholder="Enter your email"
                placeholderTextColor={Colors.darkLight}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />
              <StyledTextInput
                placeholder="Enter your password"
                placeholderTextColor={Colors.darkLight}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry={true}
              />
              <StyledButton onPress={handleSubmit}>
                <StyledButtonText>Login</StyledButtonText>
              </StyledButton>
            </>
          )}
        </Formik>
      </InnerContainer>
    </StyledContainer>
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
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <LeftIcon>
          <Octicons name={icon} size={20} color={Colors.darkLight} />
        </LeftIcon>
        <TextInput
          placeholder={label}
          style={{ flex: 1, paddingVertical: 15, paddingLeft: 15 }}
          secureTextEntry={hidePassword}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Text style={{ color: Colors.darkLight, marginRight: 15 }}>
              {hidePassword ? "Show" : "Hide"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
