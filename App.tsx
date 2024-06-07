
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

function App(): React.JSX.Element {

	return <GestureHandlerRootView style={{ flex: 1 }}>
		<BottomSheetModalProvider>
			<AppNavigator />
		</BottomSheetModalProvider>
	</GestureHandlerRootView>;
}

export default App;
