import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../utils/theme'
import { moderateScale } from '../utils/dimensions'

const SearchBar = ({ value, onChange }) => {
    const clear = () => onChange('')

    return (
        <View style={styles.container}>
            <View style={styles.leftIconWrap} pointerEvents="none">
                <Icon name="search" size={moderateScale(18)} color={colors.primary} />
            </View>

            <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Nhập mã sinh viên hoặc số văn bằng"
                placeholderTextColor={colors.muted}
                style={styles.input}
                returnKeyType="search"
                accessible
                accessibilityLabel="Thanh tìm kiếm"
                underlineColorAndroid="transparent"
                textAlignVertical="center"
                includeFontPadding={false}
            />

            {value ? (
                <TouchableOpacity onPress={clear} style={styles.clearBtn} accessibilityLabel="Xóa">
                    <Icon name={Platform.OS === 'ios' ? 'close' : 'close'} size={moderateScale(16)} color={colors.muted} />
                </TouchableOpacity>
            ) : (
                <View style={styles.rightPlaceholder} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.card,
        borderRadius: moderateScale(14),
        paddingVertical: moderateScale(8),
        paddingHorizontal: moderateScale(10),
        marginBottom: moderateScale(12),
        borderWidth: 1,
        borderColor: '#e8f3ff',
        // elevation / shadow
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
    },
    leftIconWrap: {
        width: moderateScale(36),
        height: moderateScale(36),
        borderRadius: moderateScale(10),
        backgroundColor: '#f1fbff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: moderateScale(8),
    },
    input: {
        fontSize: moderateScale(15),
        color: colors.text,
        flex: 1,
        paddingVertical: moderateScale(6),
        paddingHorizontal: moderateScale(4),
        textAlignVertical: 'center',
    },
    clearBtn: {
        width: moderateScale(34),
        height: moderateScale(34),
        borderRadius: moderateScale(8),
        backgroundColor: '#fff6ea',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightPlaceholder: {
        width: moderateScale(34),
        height: moderateScale(34),
    },
})

export default SearchBar
