// 首页
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🌸 鲜花绿植智能体</Text>
        <Text style={styles.subtitle}>您的植物养护小助手</Text>
      </View>

      <View style={styles.features}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('识别')}>
          <Text style={styles.cardIcon}>📷</Text>
          <Text style={styles.cardTitle}>植物识别</Text>
          <Text style={styles.cardDesc}>拍照识别植物种类</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('养护')}>
          <Text style={styles.cardIcon}>📅</Text>
          <Text style={styles.cardTitle}>养护日历</Text>
          <Text style={styles.cardDesc}>制定专属养护计划</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('对话')}>
          <Text style={styles.cardIcon}>💬</Text>
          <Text style={styles.cardTitle}>AI 对话</Text>
          <Text style={styles.cardDesc}>智能解答养护问题</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardIcon}>🚨</Text>
          <Text style={styles.cardTitle}>植物急诊</Text>
          <Text style={styles.cardDesc}>快速诊断植物问题</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#4CAF50', padding: 40, paddingTop: 60, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 16, color: '#fff', opacity: 0.9, marginTop: 5 },
  features: { flexDirection: 'row', flexWrap: 'wrap', padding: 10 },
  card: { width: '45%', backgroundColor: '#fff', margin: '2.5%', padding: 20, borderRadius: 15, alignItems: 'center', elevation: 2 },
  cardIcon: { fontSize: 40 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  cardDesc: { fontSize: 12, color: '#666', marginTop: 5, textAlign: 'center' },
});
