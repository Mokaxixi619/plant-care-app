// 养护日历页面
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const PLANTS = [
  { id: 1, name: '绿萝', waterFreq: 3, fertilizeFreq: 30 },
  { id: 2, name: '吊兰', waterFreq: 2, fertilizeFreq: 30 },
  { id: 3, name: '多肉', waterFreq: 1, fertilizeFreq: 60 },
];

export default function CareScreen() {
  const [myPlants, setMyPlants] = useState(PLANTS);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📅 养护日历</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>我的植物</Text>
        
        {myPlants.map(plant => (
          <View key={plant.id} style={styles.plantCard}>
            <View style={styles.plantInfo}>
              <Text style={styles.plantName}>{plant.name}</Text>
              <Text style={styles.plantDetail}>💧 浇水: 每{plant.waterFreq}天</Text>
              <Text style={styles.plantDetail}>🧪 施肥: 每{plant.fertilizeFreq}天</Text>
            </View>
            <View style={styles.plantActions}>
              <TouchableOpacity style={styles.waterBtn}>
                <Text style={styles.btnText}>浇水</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.fertilizeBtn}>
                <Text style={styles.btnText}>施肥</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addBtnText}>+ 添加植物</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#4CAF50', padding: 40, paddingTop: 60, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  content: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  plantCard: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' },
  plantInfo: { flex: 1 },
  plantName: { fontSize: 18, fontWeight: 'bold' },
  plantDetail: { fontSize: 14, color: '#666', marginTop: 3 },
  plantActions: { justifyContent: 'space-around' },
  waterBtn: { backgroundColor: '#2196F3', padding: 8, borderRadius: 5, marginBottom: 5 },
  fertilizeBtn: { backgroundColor: '#FF9800', padding: 8, borderRadius: 5 },
  btnText: { color: '#fff', fontSize: 12 },
  addBtn: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  addBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
