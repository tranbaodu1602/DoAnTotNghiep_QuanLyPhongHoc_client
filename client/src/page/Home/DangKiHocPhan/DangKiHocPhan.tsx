import { Button, Table, Spin, Modal } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import Footer from '../../../components/Footer/Footer';
import NavBar from '../../../components/NavBar/NavBar';
import './DangKiHocPhan.scss';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

interface Course {
    key: string;
    maLopHocPhan: string;
    tenMonHoc: string;
    nhomThucHanh: string;
    startDate: string;
    buoiHoc: string;
    tietHoc: string;
    soLuong: string;
    trangThai: string;
    tenGiaoVien: string;
}

const DangKiHocPhan = () => {
    const storedData: any = localStorage.getItem('myDataKey');
    const data = JSON.parse(storedData);

    const courseRegistered = data.DanhSachHocPhan.filter((item: any) =>
        item.danhSachSinhVien.includes(data.checkUser?.taikhoan),
    ).map((item: any) => ({
        key: item._id,
        maLopHocPhan: item.maLopHocPhan,
        tenMonHoc: item.tenMonHoc,
        startDate: new Date(item.thongTinLich[0].startDate).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }),
        tietHoc: item.thongTinLich[0].tietHoc,
        soLuong: `${item.danhSachSinhVien.length}/${item.soLuong}`,
        trangThai: 'Đã đăng ký',
    }));

    const seenSubjects = new Set();
    const dataToShow = data.DanhSachHocPhan
        // Lọc ra các lớp học phần mà sinh viên chưa đăng ký
        .filter((item: any) => !item.danhSachSinhVien.includes(data.checkUser?.taikhoan))
        // Lọc ra các lớp học phần để chỉ giữ lại một lớp cho mỗi môn học
        .filter((item: any) => {
            if (seenSubjects.has(item.tenMonHoc)) {
                return false;
            }
            seenSubjects.add(item.tenMonHoc);
            return true;
        })
        // Chuyển đổi dữ liệu thành cấu trúc cần thiết để hiển thị
        .map((item: any, index: number) => ({
            key: item._id,
            stt: index + 1,
            maLopHocPhan: item.maLopHocPhan,
            tenMonHoc: item.tenMonHoc,
            soTinChi: item.soTinChi,
            soTietLT: item.soTietLT,
            soTietTH: item.soTietTH,
        }));

    const uniqueDataToShow = dataToShow.filter(
        (item: any) => !courseRegistered.some((item2: any) => item.tenMonHoc === item2.tenMonHoc),
    );
    console.log(uniqueDataToShow);

    // UseState
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRowKeys2, setSelectedRowKeys2] = useState([]);
    const [dataCourse, setDataCourse] = useState<Course[]>([]);
    const [dataCourse2, setDataCourse2] = useState<Course[]>([]);
    const [rerender, setRerender] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const timeout = (ms: number) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    // Function
    const onSelectChange = async (selectedRowKeys: any) => {
        setSelectedRowKeys(selectedRowKeys);
        setSelectedRowKeys2([]);
        setLoading(true);

        await timeout(200);

        const selectedRow = uniqueDataToShow.find((item: any) => item.key === selectedRowKeys[0]);
        const course = data.DanhSachHocPhan.find((item: any) => item._id === selectedRow.key);
        const courseSeleted = data.DanhSachHocPhan.filter((item: any) => item.tenMonHoc === course.tenMonHoc);

        console.log(courseSeleted);

        // Tạo một mảng để lưu dữ liệu course
        let dataCourse: any = [];

        for (let item of courseSeleted) {
            let sinhVien = 0;

            if (item.danhSachSinhVien) {
                sinhVien = item.danhSachSinhVien.length;
            }

            const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

            const startDate = new Date(item.thongTinLich[0].startDate);
            const dayOfWeek = daysOfWeek[startDate.getUTCDay()]; // Lấy ngày trong tuần

            dataCourse.push({
                key: item._id,
                maLopHocPhan: item.maLopHocPhan,
                tenMonHoc: item.tenMonHoc,
                nhomThucHanh: item.tenNhomThucHanh || 'Không',
                buoiHoc: dayOfWeek,
                soLuong: `${sinhVien}/${item.soLuong}`,
                trangThai: item.trangThai,
                tenGiaoVien: item.thongTinLich[0].tenGV,
            });
        }

        setDataCourse(dataCourse); // Đặt mảng dataCourse vào state
        setLoading(false);
    };

    const rowSelection = async (selectedRowKeys2: any) => {
        setLoading2(true);
        await timeout(200);
        setSelectedRowKeys2(selectedRowKeys2);

        const selectedRow = data.DanhSachHocPhan.filter((item: any) => item._id === selectedRowKeys2[0]).map(
            (item: any, index: number) => ({
                key: item._id,
                stt: index + 1,
                maLopHocPhan: item.maLopHocPhan,
                tenMonHoc: item.tenMonHoc,
                soTinChi: item.soTinChi,
                soTietLT: item.soTietLT,
                soTietTH: item.soTietTH,
            }),
        );

        const course = data.DanhSachHocPhan.find((item: any) => item._id === selectedRow[0].key);

        if (course) {
            const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
            const startDate = new Date(course.thongTinLich[0].startDate);
            const dayOfWeek = daysOfWeek[startDate.getUTCDay()];
            const formattedDate = startDate.toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });

            setDataCourse2([
                {
                    key: course._id,
                    maLopHocPhan: course.maLopHocPhan,
                    startDate: formattedDate,
                    tietHoc: course.thongTinLich[0].tietHoc,
                    soLuong: `${course.danhSachSinhVien.length}/${course.soLuong}`,
                    tenGiaoVien: course.thongTinLich[0].tenGV,
                    tenMonHoc: course.tenMonHoc,
                    nhomThucHanh: course.tenNhomThucHanh || 'Không',
                    buoiHoc: dayOfWeek,
                    trangThai: course.trangThai,
                },
            ]);
        }

        setLoading2(false);
    };

    const handleSubmit = async () => {
        const selectedRow = data.DanhSachHocPhan.find((item: any) => item._id === selectedRowKeys2[0]);

        const mssv = data.checkUser?.taikhoan;

        const payload = {
            ...selectedRow,
            mssv: mssv,
        };

        try {
            const response = await fetch('http://localhost:3001/course/register', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const rs = response.json();
                rs.then((result) => {
                    if (result.course.status === 'fail') {
                        toast.error(result.course.message);
                    } else {
                        toast.success(result.course.message);
                        data.DanhSachHocPhan = result.course.DSHP;
                        localStorage.setItem('myDataKey', JSON.stringify(data));
                        setDataCourse([]);
                        setDataCourse2([]);
                        setRerender(!rerender);
                    }
                });
            }
        } catch (error) {
            toast.error('Đã xảy ra lỗi khi đăng ký học phần');
        }

        setModalVisible(false);
    };

    const handleCancelCourse = async (key: string) => {
        const payload = {
            key: key,
            mssv: data.checkUser?.taikhoan,
        };

        try {
            const response = await fetch('http://localhost:3001/course/cancel-course', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const rs = response.json();

                rs.then((result) => {
                    if (result.course.status === 'fail') {
                        toast.error(result.course.message);
                    } else {
                        toast.success(result.course.message);
                        data.DanhSachHocPhan = result.course.DSHP;
                        localStorage.setItem('myDataKey', JSON.stringify(data));
                        setRerender(!rerender);
                    }
                });
            }
        } catch (error) {
            toast.error('Có lỗi xảy ra');
        }
    };

    const handleCheckData = () => {
        if (selectedRowKeys.length === 0 || selectedRowKeys2.length === 0) {
            toast.error('Vui lòng chọn một học phần');
        } else {
            setModalVisible(true);
        }
    };

    useEffect(() => {
        // Hiển thị dataCourse khi rerender thay đổi
    }, [rerender, dataCourse, dataCourse2]);

    const columns = [
        {
            title: 'Chọn',
            dataIndex: 'select1',
            key: 'select1',
            width: 60,
            align: 'center',
            render: (text: any, record: any) => (
                <input
                    type="radio"
                    name="select1"
                    checked={selectedRowKeys.includes(record.key)}
                    onChange={() => onSelectChange([record.key])}
                />
            ),
            //responsive: ['md'] Hiển thị từ màn hình medium trở lên
        },
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            width: 60,
            align: 'center',
            responsive: ['sm'], // Hiển thị từ màn hình small trở lên
        },
        {
            title: 'Mã Lớp HP',
            dataIndex: 'maLopHocPhan',
            key: 'maLopHocPhan',
            width: 50,
            align: 'center',
        },
        {
            title: 'Tên Môn Học',
            dataIndex: 'tenMonHoc',
            key: 'tenMonHoc',
            width: 250,
        },
        {
            title: 'Môn tiên quyết',
            key: 'info',
            width: 120,
            align: 'center',
            render: (text: any, record: any) => <CloseCircleOutlined style={{ fontSize: '20px', color: 'red' }} />,
        },
        {
            title: 'Số Tín Chỉ',
            dataIndex: 'soTinChi',
            key: 'soTinChi',
            width: 100,
            align: 'center',
        },
        {
            title: 'Số Tiết LT',
            dataIndex: 'soTietLT',
            key: 'soTietLT',
            width: 100,
            align: 'center',
        },
        {
            title: 'Số Tiết TH',
            dataIndex: 'soTietTH',
            key: 'soTietTH',
            width: 100,
            align: 'center',
        },
    ];

    const columns2 = [
        {
            title: 'Chọn',
            dataIndex: 'select2',
            key: 'select2',
            width: 60,
            align: 'center',
            render: (text: any, record: any) => (
                <input
                    type="radio"
                    name="select2"
                    checked={selectedRowKeys2.includes(record.key)}
                    onChange={() => rowSelection([record.key])}
                />
            ),
            //responsive: ['md'] Hiển thị từ màn hình medium trở lên
        },
        {
            title: 'Mã Lớp HP',
            dataIndex: 'maLopHocPhan',
            key: 'maLopHocPhan',
            width: 100,
            align: 'center',
        },
        {
            title: 'Tên Môn Học',
            dataIndex: 'tenMonHoc',
            key: 'tenMonHoc',
            width: 250,
        },
        dataCourse[0]?.nhomThucHanh !== 'Không'
            ? {
                  title: 'Nhóm thực hành',
                  dataIndex: 'nhomThucHanh',
                  key: 'nhomThucHanh',
                  width: 150,
              }
            : {
                  title: 'Buổi học',
                  dataIndex: 'buoiHoc',
                  key: 'buoiHoc',
                  width: 60,
                  align: 'center',
              },
        {
            title: 'Số lượng',
            dataIndex: 'soLuong',
            key: 'soLuong',
            width: 60,
            align: 'center',
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'trangThai',
            key: 'trangThai',
            width: 100,
            align: 'center',
        },
        {
            title: 'Tên Giáo Viên',
            dataIndex: 'tenGiaoVien',
            key: 'tenGiaoVien',
            width: 140,
            align: 'center',
        },
    ];

    const columns3 = [
        {
            title: 'Mã Lớp HP',
            dataIndex: 'maLopHocPhan',
            key: 'maLopHocPhan',
            width: 100,
            align: 'center',
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            key: 'startDate',
            width: 150,
        },
        {
            title: 'Tiết học',
            dataIndex: 'tietHoc',
            key: 'tietHoc',
            width: 60,
            align: 'center',
        },
        {
            title: 'Số lượng',
            dataIndex: 'soLuong',
            key: 'soLuong',
            width: 100,
            align: 'center',
        },
        {
            title: 'Tên Giáo Viên',
            dataIndex: 'tenGiaoVien',
            key: 'tenGiaoVien',
            width: 140,
            align: 'center',
        },
    ];

    const columns4 = [
        {
            title: 'Mã Lớp HP',
            dataIndex: 'maLopHocPhan',
            key: 'maLopHocPhan',
            width: 100,
            align: 'center',
        },
        {
            title: 'Tên Môn Học',
            dataIndex: 'tenMonHoc',
            key: 'tenMonHoc',
            width: 180,
            align: 'center',
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            key: 'startDate',
            width: 100,
        },
        {
            title: 'Tiết học',
            dataIndex: 'tietHoc',
            key: 'tietHoc',
            width: 60,
            align: 'center',
        },
        {
            title: 'Số lượng',
            dataIndex: 'soLuong',
            key: 'soLuong',
            width: 60,
            align: 'center',
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'trangThai',
            key: 'trangThai',
            width: 60,
            align: 'center',
        },
        {
            title: ' ',
            key: 'cancel',
            width: 60,
            align: 'center',
            render: (text: any, record: any) => (
                <Button
                    style={{ backgroundColor: '#f5222d', color: '#fff' }}
                    danger={true}
                    icon={<CloseCircleOutlined style={{ color: ' #fff' }} />}
                    onClick={() => handleCancelCourse(record.key)}
                >
                    Hủy đăng ký
                </Button>
            ),
        },
    ];

    return (
        <>
            <NavBar />
            <ToastContainer />
            <div className="dang-ki-hoc-phan-container">
                <div className="content">
                    <div className="title">
                        <h1>ĐĂNG KÍ HỌC PHẦN</h1>
                    </div>
                    <Table columns={columns} dataSource={uniqueDataToShow} pagination={false} scroll={{ x: true }} />

                    {loading ? (
                        <Spin style={{ margin: 'auto' }} size="large" />
                    ) : (
                        dataCourse.length !== 0 && (
                            <>
                                <hr />
                                <div className="title">
                                    <h1>THÔNG TIN LỚP HỌC PHẦN</h1>
                                </div>
                                <Table
                                    columns={columns2}
                                    dataSource={dataCourse}
                                    pagination={false}
                                    scroll={{ x: true }}
                                />
                            </>
                        )
                    )}

                    {loading2 ? (
                        <Spin style={{ margin: 'auto' }} size="large" />
                    ) : (
                        dataCourse2.length !== 0 && (
                            <>
                                <div className="title">
                                    <h1>CHI TIẾT HỌC PHẦN</h1>
                                </div>
                                <Table
                                    columns={columns3}
                                    dataSource={dataCourse2}
                                    pagination={false}
                                    scroll={{ x: true }}
                                />
                            </>
                        )
                    )}

                    <div className="submitBtn">
                        <Button onClick={() => handleCheckData()}>Đăng ký</Button>
                    </div>

                    {courseRegistered.length !== 0 && (
                        <>
                            <hr />
                            <div className="title">
                                <h1>MÔN HỌC ĐÃ ĐĂNG KÍ</h1>
                            </div>
                            <Table
                                columns={columns4}
                                dataSource={courseRegistered}
                                pagination={false}
                                scroll={{ x: true }}
                            />
                        </>
                    )}

                    <Modal
                        title="Xác nhận đăng ký"
                        visible={modalVisible}
                        onOk={handleSubmit}
                        onCancel={() => setModalVisible(false)}
                    >
                        <p>Bạn có chắc chắn muốn đăng ký học phần này không?</p>
                    </Modal>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default DangKiHocPhan;
