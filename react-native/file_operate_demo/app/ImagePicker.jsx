import React, { useState } from 'react';
import {
	Button,
	Image,
	Text,
	View,
} from 'react-native';
import { styles } from './style';
import Header from '../component/Header';

import { launchImageLibrary } from 'react-native-image-picker';

function ImagePickerTest() {

	const [imageList, setImageList] = useState([]);

	const handleLauchLibrary = async () => {
		// permissions ?
		const result = await launchImageLibrary({
			selectionLimit: 0, // 多选
		})
		console.log(result); //didCancel assets 
		setImageList(result.assets);
	};



	const handleLauchCamera = () => {

	};


	return (
		<>
			<Header title='Image Picker' />
			<View style={styles.box}>
				<Button title='lauchImageLibrary' onPress={handleLauchLibrary} />
				<View style={{ flexDirection: 'row' }}>
					{/* Preview */}
					{
						imageList.map(e => {
							return <View style={{ padding: 4, }}>
								<Image style={{ width: 60, height: 60 }} source={{ uri: e.uri }} />
							</View>
						})
					}

					<Text style={{ display: imageList.length === 0 ? 'flex' : 'none' }}>暂无数据</Text>
				</View>
			</View>
			<View style={styles.box}>
				<Button title='lauchCamera' onPress={handleLauchCamera} />
			</View>
		</>
	);
}


export default ImagePickerTest;
