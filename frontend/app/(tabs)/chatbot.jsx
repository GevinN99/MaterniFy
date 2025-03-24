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
import { getChatHistory, sendMessage } from '../../api/chatAPI';

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
  const [typewriter, setTypewriter] = useState(false);  // "currently animating the text"

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    try {
      const response = await getChatHistory();
      if (response) {
        const formattedMessages = response.flatMap(chat => [
          { role: 'user', content: chat.userMessage },
          { role: 'assistant', content: chat.botResponse }
        ]);

        const updatedMessages = [...messages, ...formattedMessages];
        setMessages(updatedMessages);
      }
    } catch (error) {
      console.error("Error fetching chat history", error);
    }
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

      const response = await sendMessage(JSON.stringify({message: inputText}));
      
      const assistantMessage = await response.botResponse;

      // Hide typing indicator
      setTyping(false);

      if (assistantMessage) {
        startTypewriter(assistantMessage);
      }
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      setTyping(false);
    }
  };


  /**
   * 3) Start typewriter animation for the new assistant message.
   *    We'll add a new "assistant" message with empty content,
   *    then gradually fill it with characters from fullText.
   */
  const startTypewriter = (fullText) => {
    // Add a new assistant message with empty content to state
    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: '' },
    ]);

    setTypewriter(true);

    let i = 0;
    const speed = 10; // ms per character (adjust as desired)
    const intervalId = setInterval(() => {
      i++;
      const partial = fullText.slice(0, i);

      // Update the last message's content with the partial text
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastIndex = newMessages.length - 1;

        // Make sure it's the assistant message we just added
        if (newMessages[lastIndex].role === 'assistant') {
          newMessages[lastIndex] = {
            ...newMessages[lastIndex],
            content: partial,
          };
        }
        return newMessages;
      });

      if (i >= fullText.length) {
        // Done animating
        clearInterval(intervalId);
        setTypewriter(false);
      }
    }, speed);
  };

  return (
    <View style={styles.container}>
      {/* Header with icon + title */}
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/8943/8943377.png',
          }}
          style={styles.headerIcon}
        />
        <Text style={styles.headerTitle}>MaterniFy Bot</Text>
      </View>

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

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0078fe',
    paddingHorizontal: 10,
    height: 60,
  },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
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