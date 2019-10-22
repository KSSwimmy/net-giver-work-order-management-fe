import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import * as Permissions from 'expo-permissions'
import { Camera as Camera1 } from 'expo-camera'
const Camera = props => {
    console.log('TCL: props -> Camera -> MainProps', props)
    const [hasCameraPermission, setHasCameraPermission] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back)
    useEffect(() => {
        // const { status } = await Permissions.askAsync(Permissions.CAMERA);
        // setHasCameraPermission("granted");
    }, [hasCameraPermission])

    if (hasCameraPermission === null) {
        return <View />
    } else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>
    } else {
        return (
            <View style={{ flex: 1 }}>
                <Camera1 style={{ flex: 1 }} type={type}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flex: 0.1,
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                            }}
                            onPress={() => {
                                this.setState({
                                    type:
                                        type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back,
                                })
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    marginBottom: 10,
                                    color: 'white',
                                }}
                            >
                                {' '}
                                Flip{' '}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Camera1>
            </View>
        )
    }
}
export default Camera
