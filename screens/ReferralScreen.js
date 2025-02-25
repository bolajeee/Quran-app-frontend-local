import React, { useState } from "react";
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledInputLabel,
  StyledTextInput,
  StyledButton,
  StyledButtonText,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from "../components/styles";
import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../components/styles";

const ReferralScreen = () => {
  // Hardcoded referral code and referral link
  const [referralCode] = useState("ABC123XYZ");
  const referralLink = `https://example.com/referral/${referralCode}`;

  // Hardcoded list of referrals
  const referrals = [
    { name: "John Doe", status: "Active" },
    { name: "Jane Smith", status: "Pending" },
    { name: "Alice Johnson", status: "Active" },
    { name: "Bob Brown", status: "Inactive" },
    { name: "Charlie Davis", status: "Active" },
  ];

  // Additional referral information (hardcoded)
  const currentReferralCount = referrals.length;
  const referralBonus = "NGN2,000";

  // Handle copying referral code to clipboard
  const handleCopyReferral = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(referralCode);
      alert("Referral code copied to clipboard!");
    } else {
      alert("Clipboard API not supported");
    }
  };

  return (
    <StyledContainer>
      <InnerContainer>
        <PageTitle>Refer a Friend</PageTitle>
        <SubTitle>Invite your friends and earn rewards!</SubTitle>
        <StyledFormArea>
          <StyledInputLabel>Your Referral Code</StyledInputLabel>
          <StyledTextInput value={referralCode} editable={false} />
          <StyledButton onPress={handleCopyReferral}>
            <StyledButtonText>Copy Referral Code</StyledButtonText>
          </StyledButton>
          <ExtraView>
            <ExtraText>Your referral link: </ExtraText>
            <TextLink onPress={handleCopyReferral}>
              <TextLinkContent>{referralLink}</TextLinkContent>
            </TextLink>
          </ExtraView>
          {/* Additional Referral Information */}
          <ExtraView
            style={{
              marginTop: 20,
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <ExtraText>{`Total Referrals: ${currentReferralCount}`}</ExtraText>
            <ExtraText>{`Referral Bonus: ${referralBonus}`}</ExtraText>
          </ExtraView>
          {/* Styled List of Referrals */}
          <View style={localStyles.referralList}>
            <ExtraText style={[localStyles.sectionTitle]}>
              Your Referrals:
            </ExtraText>
            {referrals.map((referral, index) => (
              <View key={index} style={localStyles.referralItem}>
                <Text style={localStyles.referralText}>
                  {referral.name} - {referral.status}
                </Text>
              </View>
            ))}
          </View>
        </StyledFormArea>
      </InnerContainer>
    </StyledContainer>
  );
};

const localStyles = StyleSheet.create({
  referralList: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    width: "100%",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.tertiary,
  },
  referralItem: {
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.darkLight,
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
  referralText: {
    fontSize: 16,
    color: Colors.tertiary,
  },
});

export default ReferralScreen;
