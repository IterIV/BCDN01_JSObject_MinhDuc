
function DanhSachNhanVien(){
    this.listNV = [];
    //Phương thức
    //- Thêm nhân viên
    this.addNV = function (item){
        this.listNV.push(item);
    }

    this.updateNV = function (item){
        var index = this.findIndex(item.taiKhoan);
        if (index >=0) {
            this.listNV[index] = item;
        }
    }
    this.deleteNV = function(_taikhoan){
        var index = this.findIndex(_taikhoan);
        if (index >=0) {
        this.listNV.splice(index, 1)
        }
    }

    this.findIndex = function(itemID){
        result = -1;
        this.listNV.map(function(item,index){
            if (item.taiKhoan == itemID) {
                result = index;
            }
        });
        return result;
    }
    this.searchNV = function(keySearch){
        var searchArr = [];
        var lowerKeySearch = keySearch.trim().toLowerCase();
        this.listNV.map(function(item){
            var lowerValue = item.loaiNV.trim().toLowerCase();
            var result = lowerValue.indexOf(lowerKeySearch);
            if (result >= 0) {
                searchArr.push(item);
            }
        });
        return searchArr;
    }
}

