// components/molecules/TaskCard.tsx
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Task } from '@/lib/types/task.types';
import { Text } from '../atoms/Text';
import { IconButton } from '../atoms/IconButton';
import { useTheme } from '@/lib/hooks/useTheme';
import { formatDate, isOverdue } from '@/lib/utils/dateHelpers';
import { Ionicons } from '@expo/vector-icons';

interface TaskCardProps {
  task: Task;
  onPress?: () => void;
  onDelete?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onPress, onDelete }) => {
  const { theme } = useTheme();

  const priorityConfig = {
    low: {
      bg: theme.colors.priorityLowBg,
      border: theme.colors.priorityLow,
    },
    medium: {
      bg: theme.colors.priorityMediumBg,
      border: theme.colors.priorityMedium,
    },
    high: {
      bg: theme.colors.priorityHighBg,
      border: theme.colors.priorityHigh,
    },
  };

  const statusIcons = {
    pending: 'ellipse-outline' as const,
    'in-progress': 'time-outline' as const,
    completed: 'checkmark-circle' as const,
  };

  const statusColors = {
    pending: theme.colors.statusPending,
    'in-progress': theme.colors.statusInProgress,
    completed: theme.colors.statusCompleted,
  };

  const isTaskOverdue = task.dueDate && isOverdue(task.dueDate);

  return (
    <TouchableOpacity
      onPress={onPress}
      className="rounded-xl border-l-4 p-4 mb-3 shadow-sm"
      style={{
        backgroundColor: theme.colors.card,
        borderLeftColor: priorityConfig[task.priority].border,
      }}
      activeOpacity={0.7}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1 mr-2">
          <View className="flex-row items-center mb-2">
            <Ionicons 
              name={statusIcons[task.status]} 
              size={20} 
              color={statusColors[task.status]} 
            />
            <Text 
              variant="subtitle" 
              className="ml-2 flex-1"
              style={{ color: theme.colors.text }}
            >
              {task.title}
            </Text>
          </View>
          
          {task.description && (
            <Text 
              variant="body" 
              className="mb-2" 
              numberOfLines={2}
              style={{ color: theme.colors.textSecondary }}
            >
              {task.description}
            </Text>
          )}

          <View className="flex-row items-center flex-wrap gap-2">
            {task.dueDate && (
              <View 
                className="flex-row items-center px-2 py-1 rounded-md"
                style={{ 
                  backgroundColor: isTaskOverdue 
                    ? theme.colors.priorityHighBg 
                    : theme.colors.divider 
                }}
              >
                <Ionicons 
                  name="calendar-outline" 
                  size={14} 
                  color={isTaskOverdue ? theme.colors.error : theme.colors.textSecondary} 
                />
                <Text 
                  variant="caption" 
                  className="ml-1"
                  style={{ 
                    color: isTaskOverdue ? theme.colors.error : theme.colors.textSecondary 
                  }}
                >
                  {formatDate(task.dueDate)}
                </Text>
              </View>
            )}

            {task.tags && task.tags.map((tag, index) => (
              <View 
                key={index} 
                className="px-2 py-1 rounded-md"
                style={{ backgroundColor: theme.colors.primaryLight + '20' }}
              >
                <Text 
                  variant="caption"
                  style={{ color: theme.colors.primary }}
                >
                  #{tag}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {onDelete && (
          <IconButton
            icon="trash-outline"
            size={20}
            color={theme.colors.error}
            onPress={onDelete}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};