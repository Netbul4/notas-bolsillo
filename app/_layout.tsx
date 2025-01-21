import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="tabs/student-main" />
      <Stack.Screen name="tabs/student-school-subject" />
    </Stack>
  );
}