import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Markdown from 'react-native-markdown-display';

export default function ChatBotScreen() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hey there, mama! 🤰✨ I’m MaterniFy, your friendly guide to all things maternal health. Whether it’s nutrition tips, emotional support, or just a listening ear, I’m here for you! Ready to dive in? Ask away! ❤️‍🩹',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [typing, setTyping] = useState(false);       // Are we waiting for GPT?
  const [typingDots, setTypingDots] = useState('');  // Cycles ".", "..", "..."

  // Replace with your own OpenAI API key
  const OPENAI_API_KEY = 'YOUR_API_KEY_HERE';


  // We define our system message:
  const systemMessage = {
    role: 'system',
    content: `
      You are a helpful assistant specialized in maternal health. 
      You should only answer questions related to maternal health. 
      If the user asks a question outside of maternal health, 
      politely decline to answer.
    `,
  };

  // Cycle "typingDots" between ".", "..", "..." every 500ms when typing == true
  useEffect(() => {
    let intervalId;
    if (typing) {
      let i = 0;
      intervalId = setInterval(() => {
        // Cycle among ".", "..", "..."
        setTypingDots('.'.repeat((i % 3) + 1));
        i++;
      }, 500);
    } else {
      // Reset if not typing
      setTypingDots('');
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [typing]);

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
      // Show typing indicator
      setTyping(true);

      // Construct final message list: system message + conversation messages
      const requestMessages = [systemMessage, ...updatedMessages];

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: requestMessages,
        }),
      });

      const data = await response.json();
      const assistantMessage = data?.choices?.[0]?.message;

      // Hide typing indicator
      setTyping(false);

      if (assistantMessage) {
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      setTyping(false);
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
              {!isUserMessage && (
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/8943/8943377.png',
                  }}
                  style={styles.profileImage}
                />
              )}
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
        {/* TYPING INDICATOR: only if 'typing' is true */}
        {typing && (
          <View style={[styles.messageRow, styles.assistantRow]}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/8943/8943377.png',
              }}
              style={styles.profileImage}
            />
            <View style={[styles.bubble, styles.assistantBubble]}>
              {/* Show the animated dots */}
              <Text style={styles.assistantTyping}>{typingDots}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input field & custom send button */}
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

  // Each message row takes full width
  messageRow: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  userRow: {
    justifyContent: 'flex-end', // bubble on the right
  },
  assistantRow: {
    justifyContent: 'flex-start', // bubble on the left
  },

  // Bubble styles
  bubble: {
    maxWidth: '80%',       // Don’t exceed 80% of container width
    flexShrink: 1,         // Allow bubble to wrap text properly
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
    borderRadius: 20, // half the height for a pill shape
    paddingHorizontal: 12,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#0078fe',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  // Rounded assistant profile image
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
});