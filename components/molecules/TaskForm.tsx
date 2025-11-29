// components/molecules/TaskForm.tsx
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Input } from '../atoms/Input';
import { DateInput } from '../atoms/DateInput';
import { Button } from '../atoms/Button';
import { Text } from '../atoms/Text';
import { useTheme } from '@/lib/hooks/useTheme';
import { CreateTaskInput, TaskPriority, TaskStatus } from '@/lib/types/task.types';

interface TaskFormProps {
  onSubmit: (task: CreateTaskInput) => void;
  onCancel?: () => void;
  initialValues?: Partial<CreateTaskInput>;
}

export const TaskForm: React.FC<TaskFormProps> = ({ 
  onSubmit, 
  onCancel,
  initialValues 
}) => {
  const { theme } = useTheme();
  const [title, setTitle] = useState(initialValues?.title || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [priority, setPriority] = useState<TaskPriority>(initialValues?.priority || 'medium');
  const [status, setStatus] = useState<TaskStatus>(initialValues?.status || 'pending');
  const [dueDate, setDueDate] = useState<Date | undefined>(initialValues?.dueDate);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(initialValues?.tags || []);

  const handleSubmit = () => {
    if (!title.trim()) {
      alert('Por favor ingresa un título');
      return;
    }

    const taskData: CreateTaskInput = {
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      status,
      dueDate,
      tags: tags.length > 0 ? tags : undefined,
    };

    onSubmit(taskData);
  };

  const addTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const priorityOptions: { value: TaskPriority; label: string; color: string }[] = [
    { value: 'low', label: 'Baja', color: theme.colors.priorityLow },
    { value: 'medium', label: 'Media', color: theme.colors.priorityMedium },
    { value: 'high', label: 'Alta', color: theme.colors.priorityHigh },
  ];

  const statusOptions: { value: TaskStatus; label: string }[] = [
    { value: 'pending', label: 'Pendiente' },
    { value: 'in-progress', label: 'En Progreso' },
    { value: 'completed', label: 'Completada' },
  ];

  return (
    <ScrollView 
      className="flex-1" 
      style={{ backgroundColor: theme.colors.background }}
    >
      <View className="p-6">
        <Input
          label="Título de la tarea *"
          value={title}
          onChangeText={setTitle}
          placeholder="Ej: Completar presentación"
        />

        <Input
          label="Descripción"
          value={description}
          onChangeText={setDescription}
          placeholder="Añade detalles sobre la tarea..."
          multiline
          numberOfLines={4}
          containerClassName="mt-4"
          className="h-24 pt-3"
          textAlignVertical="top"
        />

        {/* Prioridad */}
        <View className="mt-4">
          <Text 
            variant="caption" 
            className="mb-2 font-medium"
            style={{ color: theme.colors.text }}
          >
            Prioridad
          </Text>
          <View className="flex-row gap-2">
            {priorityOptions.map(option => (
              <TouchableOpacity
                key={option.value}
                onPress={() => setPriority(option.value)}
                className="flex-1 py-3 rounded-lg border-2"
                style={{
                  backgroundColor: priority === option.value 
                    ? theme.colors.primaryLight + '20' 
                    : theme.colors.surface,
                  borderColor: priority === option.value 
                    ? theme.colors.primary 
                    : theme.colors.border,
                }}
              >
                <View className="items-center">
                  <View 
                    className="w-3 h-3 rounded-full mb-1" 
                    style={{ backgroundColor: option.color }}
                  />
                  <Text 
                    style={{ 
                      color: priority === option.value 
                        ? theme.colors.primary 
                        : theme.colors.text 
                    }}
                  >
                    {option.label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Estado */}
        <View className="mt-4">
          <Text 
            variant="caption" 
            className="mb-2 font-medium"
            style={{ color: theme.colors.text }}
          >
            Estado
          </Text>
          <View className="flex-row gap-2">
            {statusOptions.map(option => (
              <TouchableOpacity
                key={option.value}
                onPress={() => setStatus(option.value)}
                className="flex-1 py-3 rounded-lg border-2"
                style={{
                  backgroundColor: status === option.value 
                    ? theme.colors.primaryLight + '20' 
                    : theme.colors.surface,
                  borderColor: status === option.value 
                    ? theme.colors.primary 
                    : theme.colors.border,
                }}
              >
                <Text 
                  className="text-center"
                  style={{ 
                    color: status === option.value 
                      ? theme.colors.primary 
                      : theme.colors.text 
                  }}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Fecha límite */}
        <DateInput
          label="Fecha límite"
          value={dueDate}
          onChange={setDueDate}
          placeholder="Seleccionar fecha límite"
          containerClassName="mt-4"
        />

        {/* Tags */}
        <View className="mt-4">
          <Text 
            variant="caption" 
            className="mb-2 font-medium"
            style={{ color: theme.colors.text }}
          >
            Etiquetas
          </Text>
          <View className="flex-row gap-2 mb-2">
            <Input
              value={tagInput}
              onChangeText={setTagInput}
              placeholder="Añadir etiqueta..."
              containerClassName="flex-1"
              onSubmitEditing={addTag}
            />
            <Button
              title="Añadir"
              onPress={addTag}
              size="small"
              className="self-end mb-5"
            />
          </View>
          
          {tags.length > 0 && (
            <View className="flex-row flex-wrap gap-2">
              {tags.map((tag, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => removeTag(tag)}
                  className="px-3 py-2 rounded-full flex-row items-center"
                  style={{ backgroundColor: theme.colors.primaryLight + '20' }}
                >
                  <Text 
                    variant="caption"
                    style={{ color: theme.colors.primary }}
                  >
                    #{tag}
                  </Text>
                  <Text style={{ marginLeft: 8, color: theme.colors.primary }}>×</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Botones */}
        <View className="mt-6 gap-3">
          <Button
            title="Crear Tarea"
            onPress={handleSubmit}
          />
          {onCancel && (
            <Button
              title="Cancelar"
              variant="outline"
              onPress={onCancel}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};