import { Stack } from 'expo-router'
import React from 'react'

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: 'File manager' }} />
      <Stack.Screen name="editor" options={{ title: 'Editor' }} />
    </Stack>
  )
}
