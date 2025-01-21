import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity,  } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import type { Task, Subject } from '../types/task';

const subjectTasks: Task[] = [
  {
    id: '1',
    title: 'Ejercicios de Álgebra Lineal',
    subjectId: 'math-101',
    tag: 'Tarea #1',
    description: 'Resolver problemas de matrices y determinantes. Entregar antes del viernes.',
    imageUrl: '/placeholder.svg',
  },
  {
    id: '2',
    title: 'Proyecto de Geometría Analítica',
    subjectId: 'math-101',
    tag: 'Proyecto',
    description: 'Desarrollar una presentación sobre cónicas y sus aplicaciones en la vida real.',
    imageUrl: '/placeholder.svg',
  },
  {
    id: '3',
    title: 'Práctica de Cálculo Diferencial',
    subjectId: 'math-101',
    tag: 'Tarea #2',
    description: 'Completar ejercicios sobre límites, continuidad y reglas de derivación.',
    imageUrl: '/placeholder.svg',
  },
];

export default function SubjectTasks({}) {
  const route = useRoute();
  const navigation = useNavigation();
  const tasks = subjectTasks;
  const {subjectName} = route.params;
  
  console.log(subjectName);
  return (
    <View style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
      <ScrollView contentContainerStyle={{ padding: 16, marginBottom: 16 }}>
        {tasks.map((task) => (
          <Card key={task.id} style={{ overflow: 'hidden', marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', padding: 16, gap: 16 }}>
              <View style={{ width: 96, height: 96, backgroundColor: '#E5E7EB', borderRadius: 8, overflow: 'hidden' }}>
                <Image
                  source={{ uri: task.imageUrl || '/placeholder.svg' }}
                  style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                />
              </View>
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={{ fontSize: 12, color: '#6B7280' }}>{task.tag}</Text>
                <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 4, color: '#111827' }}>{task.title}</Text>
                <Text style={{ fontSize: 14, color: '#4B5563', marginTop: 4 }}>{task.description}</Text>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}