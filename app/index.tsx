import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./tabs/login";
import StudentMain from "./tabs/student-main";
import SubjectTasks from './tabs/student-subject-tasks';

const Stack = createNativeStackNavigator();

export default function Index(){
  return(
    <Stack.Navigator initialRouteName='StudentMain'>
      <Stack.Screen name="StudentMain" component={StudentMain} options={{ headerShown: false }} />
      <Stack.Screen 
        name="StudentSubjectTasks" 
        component={SubjectTasks} 
        options={({ route }) => ({ title: route.params.subjectName })}
      />
    </Stack.Navigator>
  )
}
