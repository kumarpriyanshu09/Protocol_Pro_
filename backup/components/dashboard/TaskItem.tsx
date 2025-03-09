import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Platform
} from 'react-native';
import { UserTask } from '../../data/mockData';

interface TaskItemProps {
  item: UserTask;
  index: number;
  onToggle: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ item, index, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [pressedId, setPressedId] = useState<string | null>(null);

  return (
    <View style={styles.taskCard}>
      <Pressable
        onPressIn={() => setPressedId(index.toString())}
        onPressOut={() => setPressedId(null)}
        onPress={onToggle}
        {...(Platform.OS === 'web' ? {
          onMouseEnter: () => setIsHovered(true),
          onMouseLeave: () => setIsHovered(false),
        } : {})}
        style={({ pressed }) => [
          styles.taskRow,
          pressed && styles.taskPressed,
          isHovered && styles.taskHovered
        ]}
        accessible={true}
        accessibilityRole="checkbox"
        accessibilityLabel={`${item.title}, ${item.completed ? 'completed' : 'not completed'}`}
        accessibilityState={{ checked: item.completed }}
      >
        <View style={[
          styles.checkbox,
          item.completed && styles.checkboxChecked
        ]}>
          {item.completed && (
            <View style={styles.checkmark} />
          )}
        </View>
        <View style={styles.textContainer}>
          <Text style={[
            styles.taskText,
            item.completed && styles.taskTextCompleted
          ]}>{item.title}</Text>
          {item.description && (
            <Text style={styles.taskDescription}>{item.description}</Text>
          )}
          {item.frequency && (
            <View style={styles.frequencyBadge}>
              <Text style={styles.frequencyText}>{item.frequency}</Text>
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    overflow: 'hidden',
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#0A84FF',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#0A84FF',
  },
  checkmark: {
    width: 12,
    height: 6,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#FFFFFF',
    transform: [{ rotate: '-45deg' }],
  },
  textContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
  taskPressed: {
    opacity: 0.7,
  },
  taskHovered: {
    backgroundColor: '#2C2C2E',
  },
  frequencyBadge: {
    backgroundColor: '#2C2C2E',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  frequencyText: {
    fontSize: 12,
    color: '#0A84FF',
  },
});

export default React.memo(TaskItem); 