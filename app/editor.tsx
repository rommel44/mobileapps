import { router } from 'expo-router'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function HomeScreen() {
  const mockFile = {
    uri: FileSystem.documentDirectory + 'test.txt',
    name: 'test.txt',
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Файловий Менеджер</Text>
      <Button
        title="Відкрити файл"
        onPress={() =>
          router.push(
            `/editor?fileUri=${encodeURIComponent(mockFile.uri)}&fileName=${mockFile.name}`
          )
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
})
