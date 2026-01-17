import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    StatusBar,
    Animated,
    Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
    // Khởi tạo các giá trị Animation
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const slideUp = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        // Chạy chuỗi hiệu ứng song song
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                tension: 40,
                useNativeDriver: true,
            }),
            Animated.timing(slideUp, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            })
        ]).start();

        // Chuyển màn sau khi hoàn tất animation
        const timer = setTimeout(() => {
            navigation.replace('Home');
        }, 3000);

        return () => clearTimeout(timer);
    }, [fadeAnim, navigation, scaleAnim, slideUp]);

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            <LinearGradient
                colors={['#1e3a8a', '#2563eb', '#3b82f6']}
                style={styles.gradient}
            >
                {/* Các vòng tròn trang trí tạo chiều sâu (Abstract Background) */}
                <View style={[styles.circle, { top: -50, right: -50, opacity: 0.1 }]} />
                <View style={[styles.circle, { bottom: -100, left: -100, opacity: 0.05, width: 300, height: 300 }]} />

                <Animated.View
                    style={[
                        styles.content,
                        { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
                    ]}
                >
                    <View style={styles.logoShadow}>
                        <View style={styles.logoCircle}>
                            <Image
                                source={require('../assets/logo.png')}
                                style={styles.logo}
                            />
                        </View>
                    </View>

                    <Animated.View style={{ transform: [{ translateY: slideUp }] }}>
                        <Text style={styles.title}>EPU SMART</Text>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>VERIFIED LOOKUP</Text>
                        </View>
                    </Animated.View>
                </Animated.View>

                {/* Footer loading mờ */}
                <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
                    <Text style={styles.footerText}>Version 2.0 • Powered by EPU IT</Text>
                </Animated.View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    content: { alignItems: 'center' },
    circle: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#fff',
    },
    logoShadow: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 15,
        marginBottom: 30,
    },
    logoCircle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    logo: { width: 90, height: 90, resizeMode: 'contain' },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: '#fff',
        letterSpacing: 2,
        textAlign: 'center'
    },
    badge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        marginTop: 10,
        alignSelf: 'center',
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    footer: {
        position: 'absolute',
        bottom: 40,
    },
    footerText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 12,
        letterSpacing: 1,
    },
});

export default SplashScreen;