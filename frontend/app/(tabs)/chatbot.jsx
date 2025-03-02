import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  ScrollView,
} from 'react-native';
import Markdown from 'react-native-markdown-display';

export default function ChatBotScreen() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  // Replace with your own OpenAI API key
  const OPENAI_API_KEY = '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';

  const handleSend = async () => {
    if (!inputText.trim()) return;

    // The user's new message
    const userMessage = {
      role: 'user',
      content: inputText,
    };

    // Immediately show the user’s message locally
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText('');

    try {
      // Request to ChatGPT
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: updatedMessages,
        }),
      });

      const data = await response.json();
      const assistantMessage = data?.choices?.[0]?.message;

      // Add assistant's response
      if (assistantMessage) {
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {messages.map((msg, index) => (
          <View key={index} style={styles.messageBubble}>
            <Text style={styles.roleText}>{msg.role.toUpperCase()}:</Text>
            {/* For the assistant's text, we'll parse it as Markdown */}
            {msg.role === 'assistant' ? (
              <Markdown style={markdownStyle}>{msg.content}</Markdown>
            ) : (
              <Text style={styles.messageText}>{msg.content}</Text>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
}

// Optionally customize Markdown styling
const markdownStyle = {
  body: {
    fontSize: 16,
  },
  // Add more style rules if desired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    marginVertical: 5,
  },
  roleText: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
    borderRadius: 5,
  },
});
