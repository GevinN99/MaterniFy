import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  Button, 
  View, 
  ScrollView 
} from 'react-native';

export default function ChatBotScreen() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  // Replace with your own OpenAI API key. 
  // NOTE: In a real production app, store the key securely (e.g. using a backend or secure storage).
  const OPENAI_API_KEY = 'YOUR_API_KEY_HERE';

  const handleSend = async () => {
    if (!inputText.trim()) return;

    // The user's new message
    const userMessage = {
      role: 'user',
      content: inputText,
    };

    // Add user's message to local state (so it appears right away)
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText('');

    try {
      // Make the request to OpenAI Chat Completion endpoint
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o', // or gpt-4, etc.
          messages: updatedMessages,
        }),
      });

      const data = await response.json();

      // The response message from ChatGPT
      const assistantMessage = data?.choices?.[0]?.message;

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
            <Text style={styles.messageText}>{msg.content}</Text>
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
  },
  messageText: {
    fontSize: 16,
    marginVertical: 2,
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
