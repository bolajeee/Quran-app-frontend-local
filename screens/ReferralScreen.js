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
          <ExtraView style={{ marginTop: 20, flexDirection: "column", alignItems: "flex-start" }}>
            <ExtraText>{`Total Referrals: ${currentReferralCount}`}</ExtraText>
            <ExtraText>{`Referral Bonus: ${referralBonus}`}</ExtraText>
          </ExtraView>
          {/* List of Referrals */}
          <ExtraView style={{ marginTop: 20, flexDirection: "column", alignItems: "flex-start" }}>
            <ExtraText style={{ fontWeight: "bold" }}>Your Referrals:</ExtraText>
            {referrals.map((referral, index) => (
              <ExtraText key={index}>{`${referral.name} - ${referral.status}`}</ExtraText>
            ))}
          </ExtraView>
        </StyledFormArea>
      </InnerContainer>
    </StyledContainer>
  );
};

export default ReferralScreen;
