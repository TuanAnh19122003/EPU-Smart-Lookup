import React, { useEffect, useRef } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    StatusBar,
    Animated,
    Easing,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { moderateScale, verticalScale } from '../utils/dimensions'
import { colors, spacing, typography } from '../utils/theme'

const SplashScreen = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current
    const scaleAnim = useRef(new Animated.Value(0.85)).current
    const glowAnim = useRef(new Animated.Value(0)).current
    const textFade = useRef(new Animated.Value(0)).current

    useEffect(() => {
        // Hiệu ứng logo + chữ fade-in
        Animated.sequence([
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.ease),
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 6,
                    useNativeDriver: true,
                }),
            ]),
            Animated.timing(textFade, {
                toValue: 1,
                duration: 800,
                delay: 200,
                useNativeDriver: true,
            }),
            Animated.loop(
                Animated.sequence([
                    Animated.timing(glowAnim, {
                        toValue: 1,
                        duration: 1200,
                        useNativeDriver: false,
                    }),
                    Animated.timing(glowAnim, {
                        toValue: 0,
                        duration: 1200,
                        useNativeDriver: false,
                    }),
                ])
            ),
        ]).start()

        const t = setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
            }).start(() => navigation.replace('Home'))
        }, 3000)

        return () => clearTimeout(t)
    }, [fadeAnim, scaleAnim, glowAnim, textFade, navigation])

    // Màu quanh logo phát sáng
    const glowColor = glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(66,165,245,0.3)', 'rgba(255,255,255,0.8)'],
    })

    return (
        <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <StatusBar barStyle="light-content" backgroundColor={colors.gradientStart} />

            <Animated.View
                style={[
                    styles.logoWrap,
                    { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
                ]}
            >
                <Animated.View style={[styles.logoCircle, { shadowColor: glowColor }]}>
                    <Text style={styles.logoInitials}>{typography.brandShort}</Text>
                </Animated.View>

                <Animated.View
                    style={[
                        styles.textWrap,
                        {
                            opacity: textFade,
                            transform: [
                                {
                                    translateY: textFade.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [8, 0],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <Text style={styles.title}>EPU Smart Lookup</Text>
                    <Text style={styles.tagline}>Verify faster — Trust smarter</Text>
                    <Text style={styles.subtitle}>Tìm kiếm thông minh cho sinh viên EPU</Text>
                </Animated.View>
            </Animated.View>

            <View style={styles.footer}>
                <ActivityIndicator color={colors.accent} size="small" />
                <Text style={styles.version}> Đang khởi động hệ thống...</Text>
                <Text style={styles.versionText}>v1.0.0</Text>
            </View>
        </LinearGradient>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoWrap: {
        alignItems: 'center',
        marginBottom: verticalScale(spacing.lg),
    },
    textWrap: {
        alignItems: 'center',
    },
    logoCircle: {
        width: moderateScale(110),
        height: moderateScale(110),
        borderRadius: moderateScale(55),
        backgroundColor: colors.card,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 18,
        elevation: 10,
    },
    logoInitials: {
        color: colors.primary,
        fontSize: moderateScale(36),
        fontWeight: '700',
        letterSpacing: 1,
    },
    title: {
        color: colors.text,
        fontSize: moderateScale(24),
        fontWeight: '800',
        marginTop: verticalScale(10),
        textTransform: 'uppercase',
    },
    tagline: {
        color: colors.accent,
        fontSize: moderateScale(14),
        fontStyle: 'italic',
        marginTop: verticalScale(4),
    },
    subtitle: {
        color: colors.muted,
        fontSize: moderateScale(13),
        marginTop: verticalScale(3),
    },
    footer: {
        alignItems: 'center',
        position: 'absolute',
        bottom: verticalScale(40),
    },
    version: {
        color: colors.muted,
        fontSize: moderateScale(12),
        marginTop: verticalScale(6),
    },
    versionText: {
        color: colors.muted,
        fontSize: moderateScale(11),
        marginTop: verticalScale(2),
        opacity: 0.8,
    },
})
