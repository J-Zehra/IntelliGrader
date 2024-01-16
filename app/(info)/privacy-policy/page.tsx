"use client";

import { Divider, Highlight, Stack, Text } from "@chakra-ui/react";

export default function PrivacyPolicy() {
  const terms = [
    {
      number: 1,
      title: "Information We Collect",
      subtitles: [
        {
          title: "Personal Information",
          text: "",
          number: 1.1,
          sub: [
            {
              title: "User Provided Information",
              text: "When you create an account or use certain features of the App, we may collect information such as your name, email address, and other contact details.",
            },
            {
              title: "Scanning Information",
              text: "When you use the App to scan and grade bubble sheets, we may collect and process the data present on the scanned sheets. This may include student answers and configurations provided by the user.",
            },
          ],
        },
        {
          text: "We may also collect non-personal information automatically when you use the App. This may include:",
          title: "Non-personal Information",
          number: 1.2,
          sub: [
            {
              title: "Usage Data",
              text: "Information about how you use the App, such as access times, pages viewed, and interactions.",
            },
            {
              title: "Device Information",
              text: "Information about your device, including device type, operating system, and browser type.",
            },
          ],
        },
      ],
      text: "We may collect personally identifiable information, such as:",
    },
    {
      number: 2,
      title: "How We Use Your Information",
      text: "We use the collected information for various purposes, including but not limited to:",
      subtitles: [
        {
          title: "",
          number: "",
          text: "",
          sub: [
            { title: "", text: "Providing and maintaining the App." },
            { title: "", text: "Improving and customizing the App." },
            { title: "", text: "Analyzing usage patterns and trends." },
            {
              title: "",
              text: "Communicating with you regarding updates or support.",
            },
          ],
        },
      ],
    },
    {
      number: 3,
      title: "Data Security",
      text: "We take appropriate measures to protect the security of your personal information. However, please be aware that no method of transmission over the internet or electronic storage is completely secure.",
      subtitles: [
        {
          title: "",
          number: "",
          text: "",
          sub: [{ title: "", text: "" }],
        },
      ],
    },
    {
      number: 4,
      title: "Disclosure of Information",
      text: "We may disclose your personal information in the following circumstances:",
      subtitles: [
        {
          title: "",
          number: "",
          text: "",
          sub: [
            {
              title: "With Your Consent",
              text: "We may share your information when you give us consent to do so.",
            },
            {
              title: "Service Providers",
              text: "We may engage third-party companies and individuals to facilitate our App, provide the App on our behalf, perform App-related services, or assist us in analyzing how the App is used.",
            },
            {
              title: "Compliance with Laws",
              text: "We may disclose information where required by law or to protect our rights or the rights of others.",
            },
          ],
        },
      ],
    },
    {
      number: 5,
      title: "Changes to This Privacy Policy",
      text: "We may update our Privacy Policy from time to time. You are advised to review this Privacy Policy periodically for any changes.",
      subtitles: [
        {
          title: "",
          number: "",
          text: "",
          sub: [{ title: "", text: "" }],
        },
      ],
    },
    {
      number: 6,
      title: "Contact Information",
      text: "If you have any questions or concerns about our Privacy Policy, please contact us at scoretech@intelligrader.org.",
      subtitles: [
        {
          title: "",
          number: "",
          text: "",
          sub: [{ title: "", text: "" }],
        },
      ],
    },
  ];

  return (
    <Stack>
      <Text fontSize="1.8rem" fontWeight="bold" opacity={0.8}>
        PRIVACY POLICY
      </Text>
      <Stack spacing="1.5rem">
        <Text>Last Updated: January 16, 2024</Text>
        <Text>
          This Privacy Policy informs you of our policies regarding the
          collection, use, and disclosure of personal information when you use
          our App.
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
              <Text fontSize=".9rem">{item.text}</Text>;
              {item.subtitles
                ? item.subtitles.map((subItem) => {
                    return (
                      <Stack>
                        <Stack
                          direction="row"
                          fontSize="1.1rem"
                          fontWeight="semibold"
                        >
                          <Text>{subItem.number}</Text>;
                          <Text>{subItem.title}</Text>;
                        </Stack>
                        <Text>{subItem.text}</Text>
                        {subItem.sub
                          ? subItem.sub.map((sub) => {
                              return (
                                <Stack paddingLeft="1rem">
                                  <Text>
                                    <Highlight
                                      query={[
                                        "User Provided Information.",
                                        "Usage data.",
                                        "Devide Information.",
                                        "Scanning Information",
                                        "With Your Consent",
                                        "Service Providers",
                                        "Compliance with Laws",
                                      ]}
                                      styles={{ fontWeight: "semibold" }}
                                    >
                                      {`${sub.title}. ${sub.text}`}
                                    </Highlight>
                                  </Text>
                                </Stack>
                              );
                            })
                          : null}
                      </Stack>
                    );
                  })
                : null}
            </Stack>
          );
        })}
        <Text fontSize=".9rem">
          By using the Intelligrader App, you agree to the terms outlined in
          this Privacy Policy.
        </Text>
      </Stack>
    </Stack>
  );
}
