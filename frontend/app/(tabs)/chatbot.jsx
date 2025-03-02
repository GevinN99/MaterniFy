import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Markdown from 'react-native-markdown-display';

export default function ChatBotScreen() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  // Replace with your own OpenAI API key
  const OPENAI_API_KEY = 'YOUR_API_KEY_HERE';

  const handleSend = async () => {
    if (!inputText.trim()) return;

    // Add user's new message
    const userMessage = {
      role: 'user',
      content: inputText,
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText('');

    try {
      // Call OpenAI Chat API
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
      if (assistantMessage) {
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContentContainer}
      >
        {messages.map((msg, index) => {
          const isUserMessage = msg.role === 'user';

          return (
            <View
              key={index}
              style={[
                styles.messageRow,
                isUserMessage ? styles.userRow : styles.assistantRow,
              ]}
            >
              <View
                style={[
                  styles.bubble,
                  isUserMessage ? styles.userBubble : styles.assistantBubble,
                ]}
              >
                {/* User messages as plain text; assistant messages as Markdown */}
                {isUserMessage ? (
                  <Text style={styles.userText}>{msg.content}</Text>
                ) : (
                  <Markdown style={markdownStyle}>{msg.content}</Markdown>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Rounded input field & custom send button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Optionally customize how Markdown text is displayed for the assistant messages
const markdownStyle = {
  body: {
    fontSize: 16,
    color: '#000',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatContainer: {
    flex: 1,
  },
  chatContentContainer: {
    paddingVertical: 10,
  },

  // Each message row
  messageRow: {
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  assistantRow: {
    justifyContent: 'flex-start',
  },

  // Bubble styles
  bubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: '#0078fe', // Messenger-style blue
    borderBottomRightRadius: 0,
  },
  assistantBubble: {
    backgroundColor: '#e4e6eb', // Light gray
    borderBottomLeftRadius: 0,
  },

  // Text styles
  userText: {
    fontSize: 16,
    color: '#fff',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 40,
    borderRadius: 20, // Half of the height for a full "pill" shape
    paddingHorizontal: 12,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#0078fe',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20, // Matches input's rounding
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
