import React from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider } from '@rneui/themed';
import { theme } from './ui';

export const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <SafeAreaView>
          <StatusBar />
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View>
              <Text>Hello World</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};
