"use client";

import { Divider, Stack, Text } from "@chakra-ui/react";

export default function TermsOfServicePage() {
  const terms = [
    {
      title: "Acceptance of Terms",
      text: "By accessing or using the Intelligrader App, you agree to be bound by these Terms. If you disagree with any part of the Terms, then you may not access the App.",
    },
    {
      title: "Use of the App",
      text: "You agree to use the Intelligrader App only for its intended purpose. Any unauthorized use, modification, or distribution of the App is strictly prohibited.",
    },
    {
      title: "User Accounts",
      text: "To use certain features of the App, you may be required to create a user account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.",
    },
    {
      title: "Privacy Policy",
      text: "Your use of the Intelligrader App is also governed by our Privacy Policy. Please review our Privacy Policy to understand how we collect, use, and disclose information.",
    },
    {
      title: "Modifications",
      text: "We reserve the right to modify or replace these Terms at any time. Any changes will be effective immediately upon posting on the App. Your continued use of the App following the posting of any changes constitutes acceptance of those changes.",
    },
    {
      title: "Termination",
      text: "We may terminate or suspend your access to the App immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.",
    },
    {
      title: "Disclaimer",
      text: "The Intelligrader App is provided as is and as available without any warranties, express or implied. We do not guarantee the accuracy, completeness, or reliability of any content or features within the App for there are conditions that must be meet. Check out our guides for better scanning.",
    },
    {
      title: "Limitation of Liability",
      text: "In no event shall ScoreTech and its nembers be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.",
    },
    {
      title: "Contact Information",
      text: "If you have any questions about these Terms, please contact us at scoretech@intelligrader.org.",
    },
  ];

  return (
    <Stack>
      <Text fontSize="1.8rem" fontWeight="bold" opacity={0.8}>
        TERMS OF SERVICE
      </Text>
      <Stack spacing="1.5rem">
        <Text>Last Updated: January 16, 2024</Text>
        <Text>
          Please read these terms of service carefully before using the
          Intelligrader application operated by our team, ScoreTech.
        </Text>
      </Stack>
      <Divider mt="1rem" />
      <Stack pt="2rem" spacing="1.5rem">
        {terms.map((item) => {
          return (
            <Stack spacing=".2rem">
              <Text fontSize="1.3rem" fontWeight="semibold">
                {item.title}
              </Text>
              <Text fontSize=".9rem">{item.text}</Text>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}
