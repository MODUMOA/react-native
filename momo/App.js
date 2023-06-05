import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Alert } from 'react-native';
import WebView from 'react-native-webview';

const App = () => {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (canGoBack) {
        webViewRef.current?.goBack();
      } else {
        showExitAlert(); // 확인 창 표시
      }
      return true; // BackHandler 기본 동작 방지
    };

    // Android의 경우 뒤로가기 버튼 이벤트 등록
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    // 컴포넌트가 언마운트될 때 등록된 이벤트 리스너 제거
    return () => backHandler.remove();
  }, [canGoBack]);

  const onNavigationStateChange = (navState) => {
    setCanGoBack(navState.canGoBack);
  };

  const showExitAlert = () => {
    Alert.alert(
      '앱 종료',
      '앱을 종료하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { text: '확인', onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false }
    );
  };

  return (
    <WebView
      ref={webViewRef}
      style={{ flex: 1 }}
      source={{ uri: 'http://192.168.0.116:8080/' }}
      onNavigationStateChange={onNavigationStateChange}
    />
  );
};

export default App;