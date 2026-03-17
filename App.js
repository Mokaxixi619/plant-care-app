import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import IdentifyScreen from './src/screens/IdentifyScreen';
import CareScreen from './src/screens/CareScreen';
import ChatScreen from './src/screens/ChatScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === '首页') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === '识别') iconName = focused ? 'camera' : 'camera-outline';
            else if (route.name === '养护') iconName = focused ? 'leaf' : 'leaf-outline';
            else if (route.name === '对话') iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4CAF50',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="首页" component={HomeScreen} />
        <Tab.Screen name="识别" component={IdentifyScreen} />
        <Tab.Screen name="养护" component={CareScreen} />
        <Tab.Screen name="对话" component={ChatScreen} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
