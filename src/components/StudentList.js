import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { colors } from '../utils/theme'
import { moderateScale, verticalScale } from '../utils/dimensions'

const StudentList = ({ students }) => {
    const [open, setOpen] = useState([])

    const toggle = (id) => {
        setOpen((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        )
    }

    return (
        <View style={{ marginTop: verticalScale(10) }}>
            <Text style={styles.title}>Sinh viên</Text>
            {students.map((s) => (
                <View key={s.id} style={styles.card}>
                    <View style={styles.header}>
                        <View style={styles.infoLeft}>
                            <Text style={styles.name}>
                                {s.lastname} {s.firstname}
                            </Text>
                            <View style={styles.codeWrap}>
                                <Text style={styles.code}>{s.code}</Text>
                            </View>
                        </View>

                        <TouchableOpacity onPress={() => toggle(s.id)} style={styles.detailTouch}>
                            <Text style={styles.detailBtn}>
                                {open.includes(s.id) ? 'Thu gọn' : 'Chi tiết'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {open.includes(s.id) && (
                        <View style={styles.detail}>
                            <Text>Email: {s.email || '-'}</Text>
                            <Text>SĐT: {s.phone || '-'}</Text>
                            <Text>Chuyên ngành: {s.major?.name || '-'}</Text>
                            <Text>GPA: {s.gpa || '-'}</Text>
                            <Text>Học lực: {s.hoc_luc || '-'}</Text>
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
        marginBottom: verticalScale(4),
    },
    infoLeft: {
        flex: 1,
        paddingRight: moderateScale(8),
    },
    name: {
        fontWeight: '600',
        fontSize: moderateScale(15),
        color: colors.text,
    },
    code: {
        fontSize: moderateScale(12),
        color: colors.primary,
        fontWeight: '700',
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
    codeWrap: {
        marginTop: verticalScale(4),
        alignSelf: 'flex-start',
        backgroundColor: '#f1f8ff',
        paddingHorizontal: moderateScale(8),
        paddingVertical: moderateScale(4),
        borderRadius: moderateScale(6),
    },
})

export default StudentList
