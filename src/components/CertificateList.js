import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native'
import { colors } from '../utils/theme'
import { moderateScale, verticalScale } from '../utils/dimensions'

const CertificateList = ({ certificates }) => {
    const [open, setOpen] = useState([])

    const toggle = (id) => {
        setOpen((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        )
    }

    return (
        <View style={{ marginTop: verticalScale(10) }}>
            <Text style={styles.title}>Văn bằng</Text>
            {certificates.map((c) => (
                <View key={c.id} style={styles.card}>
                    <View style={styles.header}>
                        <View style={styles.infoLeft}>
                            <Text style={styles.number}>{c.number}</Text>
                            <Text style={styles.meta}>
                                {c.type} - {c.status}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => toggle(c.id)} style={styles.detailTouch}>
                            <Text style={styles.detailBtn}>
                                {open.includes(c.id) ? 'Thu gọn' : 'Chi tiết'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {open.includes(c.id) && (
                        <View style={styles.detail}>
                            <Text>Ngày tốt nghiệp: {c.grad_date || '-'}</Text>
                            <Text>Người cấp: {c.issuer || '-'}</Text>
                            {c.file_url ? (
                                <TouchableOpacity onPress={() => Linking.openURL(c.file_url)} style={styles.linkBtn}>
                                    <Text style={styles.link}>Xem file</Text>
                                </TouchableOpacity>
                            ) : (
                                <Text>Chưa có file</Text>
                            )}
                        </View>
                    )}
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: moderateScale(18),
        fontWeight: '700',
        color: colors.primary,
        marginBottom: verticalScale(6),
    },
    card: {
        backgroundColor: colors.card,
        borderRadius: moderateScale(10),
        padding: moderateScale(14),
        marginBottom: verticalScale(10),
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoLeft: {
        flex: 1,
        paddingRight: moderateScale(8),
    },
    number: {
        fontWeight: '600',
        color: colors.text,
        fontSize: moderateScale(15),
    },
    meta: {
        color: colors.muted,
        fontSize: moderateScale(13),
    },
    detailBtn: {
        color: colors.primary,
        fontSize: moderateScale(13),
    },
    detailTouch: {
        padding: moderateScale(6),
        justifyContent: 'center',
    },
    detail: {
        marginTop: verticalScale(8),
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: verticalScale(6),
    },
    link: {
        color: colors.accent,
        textDecorationLine: 'underline',
    },
    linkBtn: {
        marginTop: verticalScale(6),
        alignSelf: 'flex-start',
        paddingHorizontal: moderateScale(8),
        paddingVertical: moderateScale(6),
        backgroundColor: '#fff6ea',
        borderRadius: moderateScale(6),
    },
})

export default CertificateList
