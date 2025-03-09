import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Message {
  id: string;
  followerName: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

const MessagesScreen = () => {
  const messages: Message[] = [
    {
      id: '1',
      followerName: 'John Smith',
      lastMessage: 'Thanks for the feedback on my progress!',
      timestamp: '10:30 AM',
      unread: true,
    },
    {
      id: '2',
      followerName: 'Sarah Johnson',
      lastMessage: 'I completed the morning routine today',
      timestamp: 'Yesterday',
      unread: false,
    },
    {
      id: '3',
      followerName: 'Michael Brown',
      lastMessage: 'Can you recommend a substitute for the protein shake?',
      timestamp: 'Yesterday',
      unread: true,
    },
    {
      id: '4',
      followerName: 'Emily Davis',
      lastMessage: "I'm struggling with the evening meditation",
      timestamp: '2 days ago',
      unread: false,
    },
    {
      id: '5',
      followerName: 'David Wilson',
      lastMessage: 'Looking forward to the new challenge!',
      timestamp: '3 days ago',
      unread: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Messages</Text>
        
        <View style={styles.messageList}>
          {messages.map(message => (
            <TouchableOpacity 
              key={message.id}
              style={styles.messageItem}
              activeOpacity={0.7}
            >
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {message.followerName.charAt(0)}
                  </Text>
                </View>
                {message.unread && <View style={styles.unreadIndicator} />}
              </View>
              
              <View style={styles.messageContent}>
                <View style={styles.messageHeader}>
                  <Text style={styles.followerName}>{message.followerName}</Text>
                  <Text style={styles.timestamp}>{message.timestamp}</Text>
                </View>
                <Text 
                  style={[
                    styles.lastMessage,
                    message.unread && styles.unreadMessage
                  ]}
                  numberOfLines={1}
                >
                  {message.lastMessage}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  messageList: {
    marginTop: 10,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3E7BFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  unreadIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF3B30',
    borderWidth: 2,
    borderColor: '#1C1C1E',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  followerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  timestamp: {
    fontSize: 12,
    color: '#8E8E93',
  },
  lastMessage: {
    fontSize: 14,
    color: '#8E8E93',
  },
  unreadMessage: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default MessagesScreen; 