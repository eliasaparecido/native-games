import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTintColor: '#f4511e',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="mathematics" options={{ headerShown: false }}/>
      <Stack.Screen name="words" options={{ headerShown: false }}/>
      <Stack.Screen name="memory" options={{ headerShown: false }}/>
    </Stack>
  );
}
