import React, { useEffect, useMemo, useState } from 'react'
import { Button, FlatList, Text, TextInput, TouchableOpacity, View, Switch } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, removeTask, toggleTask, loadTasks } from '../../store/slices/tasksSlice'
import { styles } from './Tasks.style'
import Icon from 'react-native-vector-icons/Ionicons'

export default function TasksScreen() {
  const [task, setTask] = useState('')
  const [showCompleted, setShowCompleted] = useState(true)
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.tasks.items).filter(task => task !== undefined)

  useEffect(() => {
    dispatch(loadTasks())
  }, [dispatch])

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask(task.trim()))
      setTask('')
    }
  }

  const activeTasks = useMemo(() => tasks.filter(task => !task.completed), [tasks])
  const completedTasks = useMemo(() => tasks.filter(task => task.completed), [tasks])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <TextInput
        style={styles.input}
        placeholder="Добавить задачу..."
        value={task}
        onChangeText={setTask}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>Добавить</Text>
      </TouchableOpacity>

      <FlatList
        data={activeTasks}
        keyExtractor={(item) => (item?.id ? item.id.toString() : Math.random().toString())}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.text}</Text>
            <View style={styles.control}>
              <Switch value={item.completed} onValueChange={() => dispatch(toggleTask(item.id))} />
              <TouchableOpacity onPress={() => dispatch(removeTask(item.id))}>
                <Icon name={'close'} size={30} color={'#f44'} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {completedTasks.length > 0 && (
        <TouchableOpacity
          style={styles.showCompletedButton}
          onPress={() => setShowCompleted(!showCompleted)}
        >
          <Text style={styles.showCompletedText}>
            {showCompleted ? 'Скрыть выполненные' : 'Показать выполненные'}
          </Text>
        </TouchableOpacity>
      )}

      {showCompleted && (
        <FlatList
          data={completedTasks}
          keyExtractor={(item) => (item?.id ? item.id.toString() : Math.random().toString())}
          renderItem={({ item }) => (
            <View style={styles.taskContainer}>
              <Text style={[styles.taskText, { textDecorationLine: 'line-through', color: 'gray' }]}>
                {item.text}
              </Text>
              <View style={styles.control}>
                <Switch value={item.completed} onValueChange={() => dispatch(toggleTask(item.id))} />
                <TouchableOpacity onPress={() => dispatch(removeTask(item.id))}>
                  <Icon name={'close'} size={30} color={'#f44'} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  )
}
