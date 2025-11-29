// components/molecules/TaskCard.tsx
import { Task } from '@/lib/types/task.types';
import { formatDate, isOverdue } from '@/lib/utils/dateHelpers';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { IconButton } from '../atoms/IconButton';
import { Text } from '../atoms/Text';

interface TaskCardProps {
  task: Task;
  onPress?: () => void;
  onDelete?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onPress, onDelete }) => {
  const priorityColors = {
    low: 'bg-green-100 border-green-300',
    medium: 'bg-yellow-100 border-yellow-300',
    high: 'bg-red-100 border-red-300',
  };

  const statusIcons = {
    pending: 'ellipse-outline' as const,
    'in-progress': 'time-outline' as const,
    completed: 'checkmark-circle' as const,
  };

  const statusColors = {
    pending: '#9CA3AF',
    'in-progress': '#F59E0B',
    completed: '#10B981',
  };

  const isTaskOverdue = task.dueDate && isOverdue(task.dueDate);

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-white rounded-xl border-l-4 ${priorityColors[task.priority]} p-4 mb-3 shadow-sm`}
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
            <Text variant="subtitle" className="ml-2 flex-1">
              {task.title}
            </Text>
          </View>
          
          {task.description && (
            <Text variant="body" className="text-gray-600 mb-2" numberOfLines={2}>
              {task.description}
            </Text>
          )}

          <View className="flex-row items-center flex-wrap gap-2">
            {task.dueDate && (
              <View className={`flex-row items-center px-2 py-1 rounded-md ${isTaskOverdue ? 'bg-red-100' : 'bg-gray-100'}`}>
                <Ionicons 
                  name="calendar-outline" 
                  size={14} 
                  color={isTaskOverdue ? '#EF4444' : '#6B7280'} 
                />
                <Text 
                  variant="caption" 
                  className={`ml-1 ${isTaskOverdue ? 'text-red-600' : 'text-gray-600'}`}
                >
                  {formatDate(task.dueDate)}
                </Text>
              </View>
            )}

            {task.tags && task.tags.map((tag, index) => (
              <View key={index} className="bg-blue-100 px-2 py-1 rounded-md">
                <Text variant="caption" className="text-blue-700">
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
            color="#EF4444"
            onPress={onDelete}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};