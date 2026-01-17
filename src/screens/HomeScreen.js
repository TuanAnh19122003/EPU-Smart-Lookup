import React, { useState, useMemo } from 'react';
import {
    View, Text, TextInput, StyleSheet, Image,
    ActivityIndicator, TouchableOpacity,
    StatusBar, Platform, ScrollView, Modal, Dimensions
} from 'react-native';
import { WebView } from 'react-native-webview';
import Pdf from 'react-native-pdf'; // Thư viện xử lý PDF chuyên dụng
import LinearGradient from 'react-native-linear-gradient';
import { Search, ChevronDown, ChevronUp, FileText, Phone, Mail, GraduationCap, Award, X } from 'lucide-react-native';
import * as Animatable from 'react-native-animatable';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { debounce } from 'lodash';
import axios from 'axios';

const { width } = Dimensions.get('window');
const API_URL = Platform.OS === 'android' ? "http://10.0.2.2:5000" : "http://localhost:5000";

const HomeScreen = () => {
    const insets = useSafeAreaInsets();
    const [query, setQuery] = useState('');
    const [students, setStudents] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openStudents, setOpenStudents] = useState([]);
    const [openCerts, setOpenCerts] = useState([]);
    const [showPreview, setShowPreview] = useState(false);
    const [previewUrl, setPreviewUrl] = useState('');

    const searchApi = async (text) => {
        if (!text) { setStudents([]); setCertificates([]); return; }
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}/api/meili/search`, { params: { q: text } });
            setStudents(res.data.student || []);
            setCertificates(res.data.certificates || []);
        } catch (e) {
            console.log("Lỗi kết nối API");
        } finally {
            setLoading(false);
        }
    };

    const debouncedSearch = useMemo(() => debounce(searchApi, 400), []);

    const toggleStudent = (id) => {
        setOpenStudents(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const toggleCert = (id) => {
        setOpenCerts(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const handlePreview = (url) => {
        if (!url) return;
        const fullUrl = url.startsWith('http') ? url : `${API_URL}/${url}`;
        setPreviewUrl(fullUrl);
        setShowPreview(true);
    };

    // Hàm kiểm tra file có phải PDF hay không
    const isPdf = (url) => url.toLowerCase().endsWith('.pdf');

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Modal xem chi tiết file */}
            <Modal visible={showPreview} transparent={false} animationType="slide" onRequestClose={() => setShowPreview(false)}>
                <SafeAreaView style={styles.modalFullContainer}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={() => setShowPreview(false)} style={styles.closeBtn}>
                            <X size={28} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Xem chi tiết</Text>
                        <View style={styles.headerSpacer} />
                    </View>

                    <View style={styles.webviewContainer}>
                        {isPdf(previewUrl) ? (
                            <Pdf
                                source={{ uri: previewUrl, cache: true }}
                                style={styles.pdfView}
                                trustAllCerts={false}
                                onLoadComplete={(numberOfPages) => console.log(`Số trang: ${numberOfPages}`)}
                                onError={(error) => console.log('Lỗi hiển thị PDF:', error)}
                                renderLoading={() => (
                                    <ActivityIndicator size="large" color="#3b82f6" style={styles.absoluteCenter} />
                                )}
                            />
                        ) : (
                            <WebView
                                source={{ uri: previewUrl }}
                                style={styles.webview}
                                startInLoadingState={true}
                                scalesPageToFit={true}
                            />
                        )}
                    </View>
                </SafeAreaView>
            </Modal>

            {/* Header */}
            <View style={[styles.header, { height: 160 + insets.top }]}>
                <LinearGradient colors={['#0f172a', '#1e40af']} style={StyleSheet.absoluteFill} />
                <View style={[styles.headerContent, { paddingTop: insets.top }]}>
                    <Text style={styles.brand}>EPU<Text style={styles.brandAccent}>SmartLookup</Text></Text>
                    <View style={styles.searchWrapper}>
                        <Search size={18} color="#64748b" />
                        <TextInput
                            style={styles.input}
                            placeholder="Tên sinh viên, MSSV hoặc số hiệu..."
                            placeholderTextColor="#94a3b8"
                            value={query}
                            onChangeText={(t) => { setQuery(t); debouncedSearch(t); }}
                        />
                        {loading && <ActivityIndicator size="small" color="#3b82f6" />}
                    </View>
                </View>
            </View>

            <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: 170 + insets.top }]}>
                {/* Danh sách sinh viên */}
                {students.map((s) => (
                    <Animatable.View animation="fadeInUp" duration={400} key={s.id} style={styles.card}>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => toggleStudent(s.id)} style={styles.cardHeader}>
                            <View style={styles.row}>
                                <TouchableOpacity onPress={() => s.image && handlePreview(s.image)} style={styles.avatarContainer}>
                                    {s.image ? (
                                        <Image source={{ uri: `${API_URL}/${s.image}` }} style={styles.avatar} />
                                    ) : (
                                        <View style={styles.initialsBox}><Text style={styles.initialsText}>{s.firstname?.charAt(0)}</Text></View>
                                    )}
                                </TouchableOpacity>
                                <View style={styles.mainInfo}>
                                    <View style={styles.nameRow}>
                                        <Text style={styles.nameText}>{s.lastname} {s.firstname}</Text>
                                        <View style={styles.studentBadge}><Text style={styles.studentBadgeText}>SV</Text></View>
                                    </View>
                                    <Text style={styles.codeText}>{s.code}</Text>
                                    <View style={styles.infoIconRow}>
                                        <GraduationCap size={14} color="#64748b" />
                                        <Text style={styles.subText} numberOfLines={1}>{s.major?.name || 'Chưa cập nhật'}</Text>
                                    </View>
                                </View>
                                <View style={styles.chevronBox}>
                                    {openStudents.includes(s.id) ? <ChevronUp size={20} color="#94a3b8" /> : <ChevronDown size={20} color="#94a3b8" />}
                                </View>
                            </View>
                        </TouchableOpacity>

                        {openStudents.includes(s.id) && (
                            <View style={styles.expandedContent}>
                                <View style={styles.detailGrid}>
                                    <View style={styles.detailItem}><Phone size={14} color="#3b82f6" /><Text style={styles.val}>{s.phone || '-'}</Text></View>
                                    <View style={styles.detailItem}><Mail size={14} color="#3b82f6" /><Text style={styles.val}>{s.email || '-'}</Text></View>
                                </View>
                                <View style={styles.statsRow}>
                                    <View style={styles.statBox}><Text style={styles.statLabel}>GPA</Text><Text style={styles.statVal}>{s.gpa || '0.0'}</Text></View>
                                    <View style={styles.statBox}><Text style={styles.statLabel}>Học lực</Text><Text style={styles.statVal}>{s.hoc_luc || '-'}</Text></View>
                                </View>
                            </View>
                        )}
                    </Animatable.View>
                ))}

                {/* Danh sách bằng cấp */}
                {certificates.map((c) => (
                    <Animatable.View animation="fadeInUp" duration={400} key={c.id} style={[styles.card, styles.certCardBorder]}>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => toggleCert(c.id)} style={styles.cardHeader}>
                            <View style={styles.row}>
                                <View style={styles.certIconBox}><Award size={24} color="#10b981" /></View>
                                <View style={styles.mainInfo}>
                                    <Text style={styles.nameText}>{c.number}</Text>
                                    <Text style={styles.certTypeText}>{c.type}</Text>
                                    <Text style={styles.ownerText}>Sở hữu: {c.student?.lastname} {c.student?.firstname}</Text>
                                </View>
                                <View style={styles.statusBadge}><Text style={styles.statusBadgeText}>{c.status}</Text></View>
                            </View>
                        </TouchableOpacity>

                        {openCerts.includes(c.id) && (
                            <View style={styles.expandedContent}>
                                <View style={styles.infoLine}><Text style={styles.label}>Ngày cấp: </Text><Text style={styles.val}>{c.grad_date}</Text></View>
                                <View style={styles.infoLine}><Text style={styles.label}>Nơi cấp: </Text><Text style={styles.val}>{c.issuer}</Text></View>
                                <TouchableOpacity
                                    style={[styles.pdfBtn, !c.file_url && styles.disabledBtn]}
                                    onPress={() => c.file_url && handlePreview(c.file_url)}
                                >
                                    <FileText size={16} color={c.file_url ? "#fff" : "#94a3b8"} />
                                    <Text style={styles.pdfBtnText}>{c.file_url ? 'Xem ảnh văn bằng' : 'Không có tệp đính kèm'}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Animatable.View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    header: { position: 'absolute', top: 0, width: '100%', zIndex: 10, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, overflow: 'hidden' },
    headerContent: { paddingHorizontal: 24, justifyContent: 'center', height: '100%' },
    brand: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 15, letterSpacing: 0.5 },
    brandAccent: { color: '#60a5fa' },
    searchWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 15, paddingHorizontal: 15, height: 54, elevation: 10 },
    input: { flex: 1, marginLeft: 10, fontSize: 15, color: '#1e293b' },
    scrollContent: { paddingHorizontal: 16, paddingBottom: 40 },
    modalFullContainer: { flex: 1, backgroundColor: '#0f172a' },
    modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, backgroundColor: '#1e293b' },
    modalTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    headerSpacer: { width: 28 },
    closeBtn: { padding: 5 },
    webviewContainer: { flex: 1, backgroundColor: '#fff' },
    webview: { flex: 1 },
    pdfView: { flex: 1, width: width, backgroundColor: '#fff' },
    absoluteCenter: { position: 'absolute', top: '50%', left: '50%', marginTop: -20, marginLeft: -20 },
    card: { backgroundColor: '#fff', borderRadius: 20, marginBottom: 15, padding: 15, elevation: 3 },
    certCardBorder: { borderLeftWidth: 4, borderLeftColor: '#10b981' },
    cardHeader: { width: '100%' },
    row: { flexDirection: 'row', alignItems: 'center' },
    avatarContainer: { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
    avatar: { width: 60, height: 75, borderRadius: 12, backgroundColor: '#f1f5f9' },
    initialsBox: { width: 60, height: 75, borderRadius: 12, backgroundColor: '#3b82f6', justifyContent: 'center', alignItems: 'center' },
    initialsText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
    mainInfo: { marginLeft: 15, flex: 1 },
    nameRow: { flexDirection: 'row', alignItems: 'center' },
    nameText: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
    studentBadge: { backgroundColor: '#eff6ff', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, marginLeft: 8 },
    studentBadgeText: { color: '#3b82f6', fontSize: 10, fontWeight: 'bold' },
    codeText: { fontSize: 13, color: '#3b82f6', fontWeight: '600' },
    infoIconRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 5 },
    subText: { fontSize: 12, color: '#64748b', flex: 1 },
    chevronBox: { padding: 5 },
    expandedContent: { marginTop: 15, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#f1f5f9' },
    detailGrid: { gap: 10, marginBottom: 15 },
    detailItem: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    val: { fontSize: 13, color: '#334155', fontWeight: '500' },
    statsRow: { flexDirection: 'row', gap: 10 },
    statBox: { flex: 1, backgroundColor: '#f8fafc', padding: 10, borderRadius: 12, alignItems: 'center' },
    statLabel: { fontSize: 11, color: '#64748b', marginBottom: 4 },
    statVal: { fontSize: 15, fontWeight: 'bold', color: '#0f172a' },
    certIconBox: { width: 50, height: 50, borderRadius: 15, backgroundColor: '#ecfdf5', justifyContent: 'center', alignItems: 'center' },
    certTypeText: { fontSize: 12, color: '#10b981', fontWeight: '600' },
    ownerText: { fontSize: 12, color: '#64748b', marginTop: 2 },
    statusBadge: { backgroundColor: '#f0fdf4', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
    statusBadgeText: { color: '#16a34a', fontSize: 11, fontWeight: 'bold' },
    pdfBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 15, padding: 12, backgroundColor: '#1e293b', borderRadius: 12, gap: 8 },
    pdfBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
    disabledBtn: { backgroundColor: '#f1f5f9' },
    label: { fontSize: 13, color: '#64748b' },
    infoLine: { flexDirection: 'row', marginBottom: 5 }
});

export default HomeScreen;