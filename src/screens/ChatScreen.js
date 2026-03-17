// AI 对话页面
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { MINIMAX_CONFIG } from '../constants/api';

const SUGGESTIONS = [
  '如何浇水？',
  '叶子发黄怎么办？',
  '需要施肥吗？',
  '多久晒一次太阳？',
];

const SYSTEM_PROMPT = `你是"植物小绿"，一个温暖、耐心、懂植物的邻家朋友。

角色：亲切但专业，不说教，会共情，偶尔卖萌
特长：植物养护、病虫害诊断、品种推荐

对话原则：
1. 先共情，再给建议
2. 追问细节
3. 给出具体可操作步骤
4. 适时提醒注意事项`;

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: '1', text: '您好！我是植物小绿🌿 有什么可以帮您的？', isBot: true },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = { id: Date.now().toString(), text: input, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(MINIMAX_CONFIG.URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${MINIMAX_CONFIG.API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: MINIMAX_CONFIG.MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.slice(-6).map(m => ({ role: m.isBot ? 'assistant' : 'user', content: m.text })),
            { role: 'user', content: currentInput }
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });
      
      const data = await response.json();
      
      if (data.choices && data.choices[0]) {
        setMessages(prev => [...prev, { 
          id: (Date.now() + 1).toString(), 
          text: data.choices[0].message.content,
          isBot: true 
        }]);
      } else {
        throw new Error('API error');
      }
    } catch (error) {
      const fallbackReplies = [
        '植物养护要因人而异哦～ 能告诉我您的植物是什么品种吗？',
        '这个问题需要了解更多情况。请问您的植物放在什么环境？',
        '我明白了！让我给您一些建议...',
      ];
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        text: fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)],
        isBot: true 
      }]);
    }
    
    setLoading(false);
  };

  const askSuggestion = (text) => {
    setInput(text);
    setTimeout(sendMessage, 100);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>💬 AI 对话</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.message, item.isBot ? styles.botMessage : styles.userMessage]}>
            <Text style={item.isBot ? styles.botText : styles.userText}>{item.text}</Text>
          </View>
        )}
        style={styles.chatList}
      />

      {messages.length === 1 && (
        <View style={styles.suggestions}>
          {SUGGESTIONS.map((s, i) => (
            <TouchableOpacity key={i} style={styles.suggestionBtn} onPress={() => askSuggestion(s)}>
              <Text style={styles.suggestionText}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="问我植物养护问题..."
          multiline
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendBtnText}>发送</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#4CAF50', padding: 40, paddingTop: 60, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  chatList: { flex: 1, padding: 10 },
  message: { maxWidth: '80%', padding: 12, borderRadius: 15, marginBottom: 10 },
  botMessage: { backgroundColor: '#fff', alignSelf: 'flex-start' },
  userMessage: { backgroundColor: '#4CAF50', alignSelf: 'flex-end' },
  botText: { color: '#333' },
  userText: { color: '#fff' },
  suggestions: { flexDirection: 'row', flexWrap: 'wrap', padding: 10 },
  suggestionBtn: { backgroundColor: '#fff', padding: 8, borderRadius: 15, margin: 5 },
  suggestionText: { fontSize: 14, color: '#4CAF50' },
  inputContainer: { flexDirection: 'row', padding: 10, backgroundColor: '#fff' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 20, paddingHorizontal: 15, maxHeight: 80 },
  sendBtn: { backgroundColor: '#4CAF50', paddingHorizontal: 20, justifyContent: 'center', borderRadius: 20, marginLeft: 10 },
  sendBtnText: { color: '#fff', fontWeight: 'bold' },
});
