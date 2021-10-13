/**
 * WeatherAndRating Component
 * @version 1.0.1
 * @author [Yen Kuo](dev-yen@cbrlife.com.au)
 * @description This component displays the current exchange-rate, weather and search input field.
 * @lastUpdate 1.0.1 Bobby Chao 2021/09/08
 */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { middlewareCheckDataExpired, middlewareGetFullData } from '../../middleware';
import SearchInput from './SearchInput';
import FlagAus from '../../../assets/flag_aus.png';
import FlagChina from '../../../assets/flag_china.png';

interface Props {}

const WeatherAndRating: React.FC<Props> = () => {
  const [RMB, setRMB] = useState<number | string>(0);
  const [degree, setDegree] = useState<number | string>(0);
  const [weatherIcon, setWeatherIcon] = useState<string | undefined>(undefined);

  // Fectching the exchange rate and weather data
  const fetchData = async () => {
    const checkLocalDataExpiredStatus = await middlewareCheckDataExpired('weatherandrating');
    let paramByPass;
    if(checkLocalDataExpiredStatus){
      // 已过期
      paramByPass = true;
    }else{
      // 未过期
      paramByPass = false;
    }

    middlewareGetFullData({
      tableName: 'weatherandrating',
      bypass: paramByPass,
    }, (r:any) => {
      const response = r.message;
      const exchangeRate = response.message.exchange;
      const weather = response.message.weather;
      setRMB(exchangeRate[0] ? exchangeRate[0].value : 0);
      setDegree(weather[0] ? weather[0].temp : 0);
      setWeatherIcon(weather[0] ? weather[0].icon : '');
    });
  };

  useEffect(
    () => {
      fetchData();
    },
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Swiper
          horizontal={false}
          showsButtons={false}
          showsPagination={false}
          autoplay={true}
          loop={true}
          autoplayTimeout={5}
          bounces={true}
        >
          {/* ExchangeRate */}
          <View style={styles.slide}>
            <Image source={FlagAus} style={styles.imgFlag} />
            <Text style={styles.text}>澳元 {'>'} </Text>
            <Image source={FlagChina} style={styles.imgFlag} />
            <Text style={styles.text}>人民币: {RMB}</Text>
          </View>
          {/* Weather */}
          <View style={styles.slide}>
            <Text style={styles.text}>堪培拉: {degree}°C</Text>
            { weatherIcon ? <Image source={{ uri: weatherIcon }} style={styles.imgWeather} /> : null }
          </View>
        </Swiper>
      </View>
      <View style={styles.right}>
        <SearchInput/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
  },
  left: {
    flex: 0.5,
  },
  slide: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  imgFlag: {
    height: 24,
    width: 24,
  },
  imgWeather: {
    height: 30,
    width: 30,
  },
  right: {
    flex: 0.48,
  },
});

export default WeatherAndRating;
