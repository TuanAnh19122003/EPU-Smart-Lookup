import React from 'react'
import { View, StyleSheet } from 'react-native'
import { moderateScale, verticalScale } from '../utils/dimensions'

const LoadingSkeleton = () => (
    <View style={styles.container}>
        {[...Array(3)].map((_, i) => (
            <View key={i} style={styles.row}>
                <View style={styles.avatar} />
                <View style={styles.lines}>
                    <View style={styles.lineShort} />
                    <View style={styles.lineLong} />
                </View>
            </View>
        ))}
    </View>
)

const styles = StyleSheet.create({
    container: { marginVertical: verticalScale(10) },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f7fa',
        padding: moderateScale(10),
        borderRadius: moderateScale(8),
        marginBottom: verticalScale(10),
    },
    avatar: {
        width: moderateScale(44),
        height: moderateScale(44),
        borderRadius: moderateScale(22),
        backgroundColor: '#e0e0e0',
        marginRight: moderateScale(12),
        opacity: 0.6,
    },
    lines: { flex: 1 },
    lineShort: {
        height: moderateScale(10),
        width: '40%',
        backgroundColor: '#e0e0e0',
        borderRadius: moderateScale(6),
        marginBottom: moderateScale(8),
        opacity: 0.6,
    },
    lineLong: {
        height: moderateScale(10),
        width: '70%',
        backgroundColor: '#e0e0e0',
        borderRadius: moderateScale(6),
        opacity: 0.6,
    },
})

export default LoadingSkeleton
