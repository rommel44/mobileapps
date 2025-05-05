import * as FileSystem from 'expo-file-system'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native'

export default function EditorScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [fileContent, setFileContent] = useState('')
  const [error, setError] = useState<string | null>(null)

  const { fileUri, fileName } = useLocalSearchParams<{
    fileUri: string
    fileName: string
  }>()

  useEffect(() => {
    const loadFileContent = async () => {
      if (!fileUri) {
        setError('Failed to retrieve the file path.')
        setIsLoading(false)
        return
      }

      try {
        const content = await FileSystem.readAsStringAsync(fileUri)
        setFileContent(content)
        setError(null)
      } catch (err: any) {
        setError('Failed to read the file: ' + err.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadFileContent()
  }, [fileUri])

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading file...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContentContainer}>
      <TextInput
        style={styles.textInput}
        value={fileContent}
        editable={false}
        multiline
        textAlignVertical="top"
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContentContainer: { flexGrow: 1 },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  textInput: {
    flex: 1,
    minHeight: 300,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
})
