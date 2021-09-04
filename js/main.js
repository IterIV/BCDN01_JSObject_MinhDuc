var DanhSachNV = new DanhSachNhanVien();

function getELE(nameID) {
    return document.getElementById(nameID);
}

function formatCurrency(money){
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function resetForm(){
    document.querySelector("#myModal form").reset();
    getELE("tknv").disabled = false;
    getELE("password").disabled = false;
    getELE("btnThemNV").style.display = "inline-block";
    getELE("btnCapNhat").style.display = "none";
}

function formatDate(date){
    date = new Date(date);
    let day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    let month = date.getMonth() + 1;
    if (month < 3) {
        month = "0" + month;
    }
    
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function setLocalStorage() {
    localStorage.setItem("DSNV", JSON.stringify(DanhSachNV.listNV));
}

function getLocalStorage() {
    if (localStorage.getItem("DSNV") != null) {
        DanhSachNV.listNV = JSON.parse(localStorage.getItem("DSNV"));
    }
    displayInTable(DanhSachNV.listNV);
}

function displayInTable(arr) {
    let outputHTML = "";
    arr.map(function (item) {
        outputHTML += `<tr>
            <td>${item.taiKhoan}</td>
            <td>${item.hoTen}</td>
            <td>${item.email}</td>
            <td>${formatDate(item.ngayLam)}</td>
            <td>${item.chucVu}</td>
            <td>${formatCurrency(item.tongLuong)}</td>
            <td>${item.loaiNV}</td>
            <td>
                <button class="btn btn-warning" style="font-size: 14px;" onclick = "openEditForm('${item.taiKhoan}');">Sửa</button>
                <button class="btn btn-danger" style="font-size: 14px;" onclick = "deleteObj('${item.taiKhoan}');">Xóa</button>
            </td>
        </tr>`;
    });
    
    getELE("tableDanhSach").innerHTML = outputHTML;
}

function checkIsValid(nhanVien){
    var isValid = true;
    var validation = new Validation();
    //Kiểm tra tài khoản nhân viên
    
    isValid &= validation.checkEmpty(nhanVien.taiKhoan, "tbTKNV", "Tài khoản nhân viên không để trống!");
    if (getELE("tknv").disabled === false) {
        isValid &= validation.checkID(nhanVien.taiKhoan, DanhSachNV.listNV, "tbTKNV", "Đã tồn tại tên tài khoản trong hệ thống!");
    }

    //Kiểm tra tên nhân viên
    isValid &= validation.checkEmpty(nhanVien.hoTen, "tbTen", "Tên nhân viên không để trống!") && validation.checkName(nhanVien.hoTen, "tbTen", "Tên nhân viên không hợp lệ!");

    //Kiểm tra email
    isValid &= validation.checkEmpty(nhanVien.email, "tbEmail", "Email không để trống!") && validation.checkEmail(nhanVien.email, "tbEmail", "Email không hợp lệ!");

    //Kiểm tra mật khẩu
    isValid &= validation.checkEmpty(nhanVien.matKhau, "tbMatKhau", "Mật khẩu không để trống!") && validation.checkPassword(nhanVien.matKhau, "tbMatKhau", "Mật khẩu tối thiểu 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt!");

    //Kiểm tra ngày
    isValid &= validation.checkEmpty(nhanVien.ngayLam, "tbNgay", "Không để trống ngày!") && validation.checkDate(nhanVien.ngayLam, "tbNgay", "Dữ liệu ngày không hợp lệ!");

    //Kiểm tra tiền lương
    isValid &= validation.checkIsNumber(nhanVien.luongCoBan, "tbLuongCB", "Dữ liệu nhập vào không phải là số nguyên dương!") && validation.checkRangeNumber(nhanVien.luongCoBan, "tbLuongCB", "Số tiền nằm trong khoảng 1.000.000 - 20.000.000!",1e6,20e6);

    //Kiểm tra chức vụ
    isValid &= validation.checkSelect(nhanVien.chucVu, "tbChucVu", "Chưa chọn chức vụ!");

    //Kiểm tra giờ làm
    isValid &= validation.checkIsNumber(nhanVien.gioLam, "tbGiolam", "Dữ liệu nhập vào không phải là số nguyên dương!") && validation.checkRangeNumber(nhanVien.gioLam, "tbGiolam", "Giờ làm phải nằm trong khoảng từ 80-200 giờ.",80,200);
    return isValid;
}

getLocalStorage();

//Thêm nhân viên
getELE("btnThem").addEventListener("click", function () {
    resetForm();
    getELE("header-title").innerHTML = "Thông tin nhân viên";
});

getELE("btnThemNV").addEventListener("click", function () {
    let nhanVien = new NhanVien(
        getELE("tknv").value,
        getELE("name").value,
        getELE("email").value,
        getELE("password").value,
        getELE("datepicker").value,
        Number(getELE("luongCB").value),
        getELE("chucvu").value,
        Number(getELE("gioLam").value),
    );
    var isValid = checkIsValid(nhanVien);
    if (isValid) {
        nhanVien.loaiNV = nhanVien.xepLoai();
        nhanVien.tongLuong = nhanVien.tinhTongLuong();
        DanhSachNV.addNV(nhanVien);
        $("#myModal").modal('hide');
        resetForm();
        setLocalStorage();
        displayInTable(DanhSachNV.listNV);
    }
});

//Sửa nhân viên
function openEditForm(taiKhoan){
    var index = DanhSachNV.findIndex(taiKhoan);
    if (index >=0) {
        getELE("btnThemNV").style.display = "none";
        getELE("btnCapNhat").style.display = "inline-block";
        getELE("tknv").disabled = true;
        getELE("password").disabled = true;
        var nhanVien = DanhSachNV.listNV[index];
        getELE("tknv").value = nhanVien.taiKhoan;
        getELE("name").value = nhanVien.hoTen;
        getELE("email").value = nhanVien.email;
        getELE("password").value = nhanVien.matKhau;
        getELE("datepicker").value = nhanVien.ngayLam;
        getELE("luongCB").value = nhanVien.luongCoBan;
        getELE("chucvu").value = nhanVien.chucVu;
        getELE("gioLam").value = nhanVien.gioLam;
        $("#myModal").modal('show');
    }
}

getELE("btnCapNhat").addEventListener("click",function(){
    let nhanVien = new NhanVien(
        getELE("tknv").value,
        getELE("name").value,
        getELE("email").value,
        getELE("password").value,
        getELE("datepicker").value,
        Number(getELE("luongCB").value),
        getELE("chucvu").value,
        Number(getELE("gioLam").value),
    );
    var isValid = checkIsValid(nhanVien);
    if (isValid) {
        nhanVien.loaiNV = nhanVien.xepLoai();
        nhanVien.tongLuong = nhanVien.tinhTongLuong();
        DanhSachNV.updateNV(nhanVien);
        $("#myModal").modal('hide');
        resetForm();
        setLocalStorage();
        displayInTable(DanhSachNV.listNV);
    }
});
//Xóa nhân viên
function deleteObj(taiKhoan){
    DanhSachNV.deleteNV(taiKhoan);
    displayInTable(DanhSachNV.listNV);
    setLocalStorage();
}

getELE("searchName").addEventListener("keyup", function(){
    var searchArr = DanhSachNV.searchNV(this.value);
    displayInTable(searchArr);
});