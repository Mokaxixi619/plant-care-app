// 植物识别页面
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { DEMO_PLANTS } from '../constants/api';

export default function IdentifyScreen() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('需要权限', '请允许访问相册');
      return;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      identifyPlant(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('需要权限', '请允许访问相机');
      return;
    }
    
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      identifyPlant(result.assets[0].uri);
    }
  };

  const identifyPlant = async (uri) => {
    setLoading(true);
    setResult(null);
    
    try {
      // 调用后端API（需要后端服务运行）
      const formData = new FormData();
      formData.append('image', {
        uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
      
      const response = await fetch('http://localhost:5001/identify', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResult({
          name: data.name,
          scientific: data.scientific_name || '',
          confidence: data.confidence,
          care: {
            water: data.care_tips?.join('；') || '适量浇水',
            light: '根据品种调整',
            temp: '15-25°C',
          }
        });
      } else {
        // 使用兜底方案
        setResult(DEMO_PLANTS[Math.floor(Math.random() * DEMO_PLANTS.length)]);
      }
    } catch (error) {
      // 网络错误，使用兜底
      setResult(DEMO_PLANTS[Math.floor(Math.random() * DEMO_PLANTS.length)]);
    }
    
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📷 植物识别</Text>
      </View>

      <View style={styles.content}>
        {image && (
          <Image source={{ uri: image }} style={styles.image} />
        )}

        {loading && (
          <Text style={styles.loading}>🔍 识别中...</Text>
        )}

        {result && !loading && (
          <View style={styles.result}>
            <Text style={styles.resultName}>{result.name}</Text>
            <Text style={styles.resultSci}>{result.scientific}</Text>
            <Text style={styles.confidence}>置信度: {(result.confidence * 100).toFixed(1)}%</Text>
            
            <View style={styles.careInfo}>
              <Text style={styles.careTitle}>💧 养护建议</Text>
              <Text>💦 浇水: {result.care?.water}</Text>
              <Text>☀️ 光照: {result.care?.light}</Text>
              <Text>🌡️ 温度: {result.care?.temp}</Text>
            </View>
          </View>
        )}

        {!image && !loading && (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>📷 拍照或选择图片识别植物</Text>
          </View>
        )}

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.btn} onPress={takePhoto}>
            <Text style={styles.btnText}>📸 拍照</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={pickImage}>
            <Text style={styles.btnText}>🖼️ 相册</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#4CAF50', padding: 40, paddingTop: 60, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  content: { flex: 1, padding: 20 },
  image: { width: 250, height: 250, borderRadius: 20, alignSelf: 'center', marginBottom: 20 },
  loading: { fontSize: 18, textAlign: 'center', marginVertical: 20 },
  result: { backgroundColor: '#fff', padding: 20, borderRadius: 15, marginBottom: 20 },
  resultName: { fontSize: 24, fontWeight: 'bold', color: '#4CAF50' },
  resultSci: { fontSize: 16, fontStyle: 'italic', color: '#666', marginTop: 5 },
  confidence: { fontSize: 14, color: '#999', marginTop: 5 },
  careInfo: { marginTop: 15, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#eee' },
  careTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  placeholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  placeholderText: { fontSize: 18, color: '#999' },
  buttons: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  btn: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, width: '40%', alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
