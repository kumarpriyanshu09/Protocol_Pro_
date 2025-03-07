import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const JournalScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Journal</Text>
        <View style={styles.entryContainer}>
          <Text style={styles.entryDate}>Today</Text>
          <View style={styles.entryCard}>
            <Text style={styles.entryText}>
              This is a placeholder for the journal feature. In the full version, 
              users will be able to log their thoughts, track their progress, and 
              reflect on their journey.
            </Text>
          </View>
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
  entryContainer: {
    marginBottom: 20,
  },
  entryDate: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 8,
  },
  entryCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    padding: 16,
  },
  entryText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
  },
});

export default JournalScreen; 