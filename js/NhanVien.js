
function NhanVien (taiKhoan, ten, email, matKhau, ngay, luong, chucVu, gio){
    this.taiKhoan = taiKhoan;
    this.hoTen = ten;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLam = ngay;
    this.luongCoBan = luong;
    this.chucVu = chucVu;
    this.gioLam = gio;
    this.tongLuong = 0;
    this.loaiNV = "";
    //Phương thức
    this.tinhTongLuong = function(){
        switch (this.chucVu) {
            case "Sếp":
                return this.luongCoBan * 3;
                break;
            case "Trưởng phòng":
                return this.luongCoBan * 2;
                break;
            case "Nhân viên":
                return this.luongCoBan * 1;
                break;
        }
    }
    this.xepLoai = function(){
        if (this.gioLam >= 192) {
            return "Xuất sắc";
        } else if (this.gioLam >= 176 && this.gioLam < 192){
            return "Giỏi";
        } else if (this.gioLam >= 160 && this.gioLam < 176){
            return "Khá";
        } else {
            return "Trung bình";
        }
    }
}


