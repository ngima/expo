import Slider from '@react-native-community/slider';
import * as Brightness from 'expo-brightness';
import * as Permissions from 'expo-permissions';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import Button from '../components/Button';
import HeadingText from '../components/HeadingText';
import { useResolvedValue } from '../utilities/useResolvedValue';

const brightnessTypes: string[] = ['Brightness', 'SystemBrightness'];

export default function BrightnessScreen() {
  const [isAvailable, error] = useResolvedValue(Brightness.isAvailableAsync);

  const warning = React.useMemo(() => {
    if (error) {
      return `An unknown error occurred while checking the API availability: ${error.message}`;
    } else if (isAvailable === null) {
      return 'Checking availability...';
    } else if (isAvailable === false) {
      return 'Brightness API is not available on this platform.';
    }
    return null;
  }, [error, isAvailable]);

  if (warning) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Text>{warning}</Text>
      </View>
    );
  }

  return <BrightnessView />;
}

function BrightnessView() {
  const [brightness] = useResolvedValue(Brightness.getBrightnessAsync);
  const [systemBrightness] = useResolvedValue(Brightness.getSystemBrightnessAsync);
  const [sliderBrightness, setBrightness] = React.useState<Record<string, number>>({});
  const [systemBrightnessPermissionGranted, askAsync] = Permissions.usePermissions(
    Permissions.SYSTEM_BRIGHTNESS
  );

  function alertBrightnessAsync(type: string) {
    (type === 'Brightness'
      ? Brightness.getBrightnessAsync()
      : Brightness.getSystemBrightnessAsync()
    ).then(value => {
      alert(value);
    });
  }

  function updateBrightnessAsync(value: number, type: string) {
    setBrightness(brightness => ({ ...brightness, [type]: value }));
    if (type === 'Brightness') {
      Brightness.setBrightnessAsync(value);
    } else {
      Brightness.setSystemBrightnessAsync(value);
    }
  }

  const initBrightness = {
    Brightness: brightness,
    SystemBrightness: systemBrightness,
  };

  let views = brightnessTypes.map(type => {
    const currentBrightness = initBrightness[type] ?? 0;
    return (
      <View key={type} style={{ padding: 20 }}>
        <HeadingText>{type}</HeadingText>
        {type === 'SystemBrightness' && (
          <Button
            title="Permissions.SYSTEM_BRIGHTNESS"
            onPress={() => askAsync()}
            style={{ marginTop: 15 }}
          />
        )}
        <Button
          title={'get' + type + 'Async'}
          onPress={() => alertBrightnessAsync(type)}
          style={{ marginTop: 15, marginBottom: 20 }}
        />
        <Text style={{ marginBottom: -2 }}>
          {'set' + type + 'Async: '}
          {(sliderBrightness[type] || currentBrightness).toFixed(3)}
        </Text>
        <Slider
          value={currentBrightness}
          disabled={type === 'SystemBrightness' && !systemBrightnessPermissionGranted}
          onValueChange={value => updateBrightnessAsync(value, type)}
        />
      </View>
    );
  });
  return (
    <ScrollView style={{ flex: 1 }}>
      {views}
      <View style={{ padding: 20 }}>
        <HeadingText>Permission</HeadingText>
        {systemBrightnessPermissionGranted && (
          <Text>{JSON.stringify(systemBrightnessPermissionGranted, null, 2)}</Text>
        )}
      </View>
    </ScrollView>
  );
}

BrightnessScreen.navigationOptions = {
  title: 'Brightness',
};
