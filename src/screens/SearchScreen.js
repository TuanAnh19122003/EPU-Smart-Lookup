import React, { useState } from 'react'
import {
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    Pressable,
} from 'react-native'
import { colors } from '../utils/theme'
import { moderateScale, verticalScale } from '../utils/dimensions'
import useSearch from '../hooks/useSearch'
import SearchBar from '../components/SearchBar'
import StudentList from '../components/StudentList'
import CertificateList from '../components/CertificateList'
import LoadingSkeleton from '../components/LoadingSkeleton'

const SEARCH_EXAMPLES = ['Tuấn 2007', 'Hải Tú Hạ Long', '0987 14/02/2008', 'EPU123', '20201234']

const SearchScreen = () => {
    const { query, setQuery, students, certificates, loading, error } = useSearch()
    const [showExamples, setShowExamples] = useState(false)

    const showEmpty = !loading && students.length === 0 && certificates.length === 0 && query.trim()

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.wrapper}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
            >
                <View style={styles.headerCard}>
                    <Text style={styles.title}>EPU Smart Lookup</Text>
                    <Text style={styles.subtitle}>Tìm kiếm và xác thực thông minh</Text>
                </View>

                <SearchBar value={query} onChange={setQuery} />

                {!query.trim() && (
                    <View style={styles.hero} accessible accessibilityRole="summary">
                        <Image
                            source={require('../assets/img/logo.png')}
                            style={styles.heroImage}
                            resizeMode="contain"
                        />
                        <Text style={styles.heroTitle}>Tra cứu nhanh mọi dữ liệu</Text>
                        <Text style={styles.heroSubtitle}>
                            Nhập tên, số, mã hồ sơ hoặc bất kỳ dữ liệu phân mảnh nào — chúng tôi sẽ tìm giúp.
                        </Text>

                        <View style={styles.ctaRow}>
                            <Pressable
                                style={({ pressed }) => [styles.ctaPrimary, pressed && styles.pressed]}
                                onPress={() => setQuery('EPU123')}
                                accessibilityRole="button"
                                accessibilityLabel="Thử ví dụ"
                            >
                                <Text style={styles.ctaPrimaryText}>Thử ví dụ</Text>
                            </Pressable>

                            <Pressable
                                style={({ pressed }) => [styles.cta, pressed && styles.pressed]}
                                onPress={() => setShowExamples((s) => !s)}
                                accessibilityRole="button"
                                accessibilityLabel="Hiện ví dụ phổ biến"
                            >
                                <Text style={styles.ctaText}>Ví dụ phổ biến</Text>
                            </Pressable>
                        </View>

                        {showExamples && (
                            <View style={styles.examplesPanel}>
                                {SEARCH_EXAMPLES.map((ex) => (
                                    <Pressable
                                        key={ex}
                                        style={({ pressed }) => [styles.exampleItem, pressed && styles.examplePressed]}
                                        onPress={() => setQuery(ex)}
                                        accessibilityRole="button"
                                        accessibilityLabel={`Ví dụ ${ex}`}
                                    >
                                        <Text style={styles.exampleText}>{ex}</Text>
                                    </Pressable>
                                ))}
                            </View>
                        )}
                    </View>
                )}

                {loading && <LoadingSkeleton />}
                {error && <Text style={styles.error}>{error}</Text>}

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {students.length > 0 && <StudentList students={students} />}
                    {certificates.length > 0 && <CertificateList certificates={certificates} />}

                    {showEmpty && (
                        <View style={styles.emptyWrap}>
                            <Text style={styles.emptyTitle}>Không tìm thấy kết quả</Text>
                            <Text style={styles.emptyText}>
                                Hãy thử lại với từ khóa khác hoặc kiểm tra chính tả.
                            </Text>
                        </View>
                    )}
                </ScrollView>

                {!query.trim() && (
                    <View style={styles.hintContainer}>
                        <Text style={styles.hintText}>Nhập mã sinh viên hoặc số văn bằng để tra cứu nhanh.</Text>
                    </View>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.gradientStart },
    wrapper: { flex: 1, paddingTop: verticalScale(40), paddingHorizontal: moderateScale(16) },
    headerCard: { marginBottom: verticalScale(6) },
    title: { fontSize: moderateScale(22), fontWeight: '700', textAlign: 'center', color: colors.primary },
    subtitle: {
        fontSize: moderateScale(14),
        textAlign: 'center',
        color: colors.muted,
        fontStyle: 'italic',
        marginBottom: verticalScale(12),
    },
    error: { color: 'red', textAlign: 'center', marginBottom: verticalScale(10) },
    scrollContent: { paddingBottom: moderateScale(36) },
    emptyWrap: { alignItems: 'center', padding: moderateScale(20) },
    emptyTitle: { fontSize: moderateScale(16), fontWeight: '700', color: colors.primary },
    emptyText: { textAlign: 'center', color: colors.muted, fontSize: moderateScale(14), marginTop: verticalScale(8) },
    hero: {
        alignItems: 'center',
        padding: moderateScale(18),
        marginBottom: verticalScale(12),
        backgroundColor: '#fff',
        borderRadius: moderateScale(12),
        borderWidth: 1,
        borderColor: '#eef6ff',
    },
    heroImage: { 
        width: moderateScale(140), 
        height: moderateScale(90), 
        marginBottom: verticalScale(10), 
        opacity: 0.95 
    },
    heroTitle: { 
        fontSize: moderateScale(18), 
        fontWeight: '700', 
        color: colors.primary, 
        marginBottom: verticalScale(6), 
        textAlign: 'center' 
    },
    heroSubtitle: { 
        color: colors.muted, 
        textAlign: 'center', 
        marginBottom: 
        verticalScale(12) 
    },
    ctaRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ctaPrimary: {
        backgroundColor: colors.primary,
        paddingHorizontal: moderateScale(14),
        paddingVertical: moderateScale(10),
        borderRadius: moderateScale(10),
        marginRight: moderateScale(8),
    },
    pressed: {
        opacity: 0.85,
    },
    ctaPrimaryText: {
        color: '#fff',
        fontWeight: '700',
    },
    cta: {
        backgroundColor: '#f1fbff',
        paddingHorizontal: moderateScale(12),
        paddingVertical: moderateScale(10),
        borderRadius: moderateScale(10),
    },
    ctaText: {
        color: colors.primary,
        fontWeight: '600',
    },
    examplesPanel: {
        marginTop: verticalScale(12),
        width: '100%',
    },
    exampleItem: {
        backgroundColor: '#fff',
        padding: moderateScale(12),
        borderBottomWidth: 1,
        borderBottomColor: '#f0f6ff',
    },
    examplePressed: {
        backgroundColor: '#f9fcff',
    },
    exampleText: {
        color: colors.text,
    },
    hintContainer: {
        alignItems: 'center',
        marginTop: verticalScale(20),
        marginBottom: verticalScale(11),
    },
    hintText: {
        color: colors.muted,
        fontSize: moderateScale(13),
        textAlign: 'center',
    },
})

export default SearchScreen