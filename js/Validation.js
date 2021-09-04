
function Validation(){
    this.checkEmpty = function(inputVal, spanID, message){
        let spanElE = document.getElementById(spanID);
        if (inputVal.trim() == "") {
            spanElE.innerHTML = message;
            spanElE.style.display = "block";
            return false;
        }else{
            spanElE.style.display = "none";
            spanElE.innerHTML = "";
            return true;
        }
    }
    
    this.checkID = function(inputVal, arr, spanID, message){
        let spanElE = document.getElementById(spanID);
        let isExit = arr.some(function(item){
            return item.taiKhoan === inputVal.trim();
        });
        
        if (isExit) {
            spanElE.innerHTML = message;
            spanElE.style.display = "block";
            return false;
        }else{
            spanElE.style.display = "none";
            spanElE.innerHTML = "";
            return true;
        }
    }

    this.checkName = function(inputVal, spanID, message){
        let spanElE = document.getElementById(spanID);
        let pattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$");

        if (pattern.test(inputVal) == false) {
            spanElE.innerHTML = message;
            spanElE.style.display = "block";
            return false;
        }else{
            spanElE.style.display = "none";
            spanElE.innerHTML = "";
            return true;
        }
    }

    this.checkEmail = function(inputVal, spanID, message){
        let spanElE = document.getElementById(spanID);
        let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (pattern.test(inputVal) == false) {
            spanElE.innerHTML = message;
            spanElE.style.display = "block";
            return false;
        }else{
            spanElE.style.display = "none";
            spanElE.innerHTML = "";
            return true;
        }
    }
    this.checkPassword = function(inputVal, spanID, message){
        let spanElE = document.getElementById(spanID);
        let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;
        
        if (pattern.test(inputVal) == false) {
            spanElE.innerHTML = message;
            spanElE.style.display = "block";
            return false;
        }else{
            spanElE.style.display = "none";
            spanElE.innerHTML = "";
            return true;
        }
    }
    
    this.checkDate = function(inputVal, spanID, message){
        let spanElE = document.getElementById(spanID);
        let pattern = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
        if (pattern.test(inputVal) == false) {
            spanElE.innerHTML = message;
            spanElE.style.display = "block";
            return false;
        }else{
            spanElE.style.display = "none";
            spanElE.innerHTML = ""; 
            return true;
        }
    }

    this.checkIsNumber = function(inputVal, spanID, message){
        let spanElE = document.getElementById(spanID);
        let pattern = /^([0-9]+|(\d+(\.\d+)?))$/;
        if (pattern.test(inputVal) == false) {
            spanElE.innerHTML = message;
            spanElE.style.display = "block";
            return false;
        }else{
            spanElE.style.display = "none";
            spanElE.innerHTML = ""; 
            return true;
        }
    }
    this.checkRangeNumber = function(inputVal, spanID, message,rangeFrom, rangeTo){
        let spanElE = document.getElementById(spanID);
        if (Number(inputVal) < rangeFrom || Number(inputVal) > rangeTo || Number(inputVal) === 0) {
            spanElE.innerHTML = message;
            spanElE.style.display = "block";
            return false;
        }else{
            spanElE.style.display = "none";
            spanElE.innerHTML = ""; 
            return true;
        }
    }

    this.checkSelect = function(selectValue, spanID, message){
        let spanElE = document.getElementById(spanID);
        if (selectValue == "Chọn chức vụ") {
            spanElE.innerHTML = message;
            spanElE.style.display = "block";
            return false;
        }else{
            spanElE.style.display = "none";
            spanElE.innerHTML = ""; 
            return true;
        }
    }
    
}