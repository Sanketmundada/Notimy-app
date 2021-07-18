import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import * as Linking from 'expo-linking';

import io from 'socket.io-client';
import { BASE_URL } from '../constants';
import Svg from '../reusables/Svg';
import { notdata } from '../utils/constants';

interface Props {
  user: {
    _id: string;
    email: string;
    expoToken: string;
    messages: { _id: string; text: string; url: string; createdAt: Date }[];
  };
}

const MessageList: React.FC<Props> = ({ user }) => {
  const [messages, setMessages] = useState(user.messages);

  const addMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
    console.log(messages, '     oyyyyyyyyyyyyy');
  };

  useEffect(() => {
    const socket = (io as any).connect(BASE_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 15,
    });
    console.log(socket?.connected);
    socket.emit('join', { userId: user._id }, (error) => {
      if (error) {
        console.log(error);
        alert(error);
      }
    });
    socket.on('message', ({ message }) => {
      console.log(message, 'hofuhdosf');
      addMessage(message);
    });
    return () => {
      console.log('In disconnect');
      socket.disconnect();
    };
  }, []);

  const openURL = (url) => {
    console.log('In CLick', url);
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {messages.length > 0 ? (
        <FlatList
          data={messages}
          keyExtractor={(item) => item._id}
          renderItem={({ item }: { item: any }) => (
            <ListItem bottomDivider>
              <TouchableOpacity onPress={() => openURL(item.url)}>
                <ListItem.Content>
                  <ListItem.Title>{item.text}</ListItem.Title>
                  <ListItem.Subtitle>
                    {moment(item.createdAt).format('DD/MM/YYYY HH:mm')}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </TouchableOpacity>
            </ListItem>
          )}
        />
      ) : (
        <>
          <Svg svg={notdata} width={250} height={250} />
          <Text
            style={{
              paddingHorizontal: 10,
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            No webhook messages found. Please connect the webhook url sent to
            your registered Email ID
          </Text>
        </>
      )}
    </View>
  );
};

export default MessageList;
