import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import MessageList from '../components/MessageList';
import { BASE_URL } from '../constants';
import Svg from '../reusables/Svg';
import { NavProps } from '../routes/types';
import { logosvg } from '../utils/constants';

const MainScreen: React.FC<NavProps<'Main'>> = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const axios_config = {
          headers: {
            Authorization: token,
          },
        };
        const res = await axios.get(BASE_URL + '/auth/getuser', axios_config);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Signup');
  };

  console.log(user);
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingVertical: 0,
          flexDirection: 'row',
          paddingHorizontal: 30,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View>
          <Svg svg={logosvg} height={60} width={90} />
        </View>
        <Button onPress={handleLogout} title='Logout' />
      </View>
      {user && <MessageList user={user} />}
    </View>
  );
};

export default MainScreen;
