import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import Video from 'react-native-video';
import NetInfo from '@react-native-community/netinfo';

const Welcome3 = () => {
    const [networkSpeed, setNetworkSpeed] = useState(null);
    const [background, setBackground] = useState(null);

    useEffect(() => {
        const handleNetworkChange = (state) => {
            if (state.type === 'wifi' || state.type === 'cellular') {
                const speed = state.details.effectiveType;
                if (speed === '4g' || speed === 'wifi') {
                    const bitrate = state.details.downlinkSpeed;
                    if (bitrate >= 50 * 1024) { // 100 kb
                        setNetworkSpeed('good');
                    } else {
                        setNetworkSpeed('bad');
                    }
                } else {
                    setNetworkSpeed('bad');
                }
            }
        };

        NetInfo.addEventListener('change', handleNetworkChange);

        return () => {
            NetInfo.removeEventListener('change', handleNetworkChange);
        };
    }, [setNetworkSpeed]);

    useEffect(() => {
        if (networkSpeed === 'good') {
            setBackground(
                <Video
                    source={require('../Login/bg.mp4')}
                    resizeMode="cover"
                    style={{ height: '100%', width: '100%' }}
                    repeat={true}

                />
            )
        } else {
            setBackground(
                <Image
                    source={require('../Login/background.jpg')}
                    resizeMode="cover"
                    style={{ height: '100%', width: '100%' }}
                />
            )
        }
    }, [networkSpeed]);

    return (
        <View style={{ flex: 1 }}>
            {background}
        </View>
    );
};

export default Welcome3;