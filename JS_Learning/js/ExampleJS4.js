// window: 當前視窗
window.onload = function () {
    updateTotal();
    // 當頁面load完成，需要綁定各種事件
    // 根據id獲取到表格
    var fruitTb1 = window.document.getElementById("tbl_fruit")
    // 獲取表格當中的所有row (table當中tr的所有value)
    var rows = fruitTb1.rows;
    for (var i = 0; i < rows.length - 1; i++) {
        var tr = rows[i];
        // 1. 綁定mouse hover以及out -> 設定bgcolor event
        tr.onmouseover = showBGColor; // 是綁定showBGColor事件，而不是"執行"這個事件
        tr.onmouseout = clearBGColor;
        // 獲取tr此row的所有entries
        var cells = tr.cells;
        var priceTD = cells[1];
        
        // 2. 綁定mouse hover在price entity變成hand的event
        priceTD.onmouseover = showHand;
        // 3. 綁定mouse click price entity的event
        priceTD.onclick = editPrice;

        // 7.綁定刪除小圖標的點擊事件
        var img = cells[4].firstChild;
        if (img && img.tagName == "IMG") {
            // 綁定click event
            img.onclick = delFruit;
        }
    }

}

function delFruit() {
    if (event && event.srcElement && event.srcElement.tagName == "IMG") {
        // alert: 表示彈出一個對話框(只有確定按鈕)
        // confirm: 表示彈出一個對話框(有確定以及取消的按鈕)，點擊confirm-> return true, else return false
        if (window.confirm("是否確認當前record")) {
            var img = event.srcElement;
            var tr = img.parentElement.parentElement;
            var fruitTbl = document.getElementById("tbl_fruit");
            fruitTbl.deleteRow(tr.rowIndex);
            updateTotal();
        }
    }
}

// 當mouse click Price entity的時候，進行edit
function editPrice() {
    if (event && event.srcElement && event.srcElement.tagName == "TD") {
        var priceTD = event.srcElement;
        
        // 用來判斷當前priceTD有sub node，並且第一個sub node是文本節點，TextNode對應的是3, ElementNode對應的是1
        if (priceTD.firstChild && priceTD.firstChild.nodeType == 3) {
            // innerText: 表示設置或者獲取當前entity的內部text
            var oldPrice = priceTD.innerText;
            // innerHTML: 表示設置當前節點的內部html
            priceTD.innerHTML = "<input type='text' size='4'/>"; // <td><input type='text' size='4'/></td>
            var input = priceTD.firstChild; //就是input這個節點
            if (input.tagName == "INPUT") {
                input.value = oldPrice;
                //選中輸入框當中的文本
                input.select();
                //4.綁定input框會失去焦點事件，並且更新price
                input.onblur = updatePrice;

                //8.在輸入框當中綁定keyboard enter的事件，需要去ensure user input = integer
                input.onkeydown = ckInput;
            }
        }
    }
}

// check 鍵盤enter時，value type是否正確
function ckInput() {
    var kc = event.keyCode;
    // 0~9: ascii code = 48~57
    // backspace: 8
    // enter: 13 -> user can use Enter to input value
    // console.log(kc); 可利用這個方式在view source裡面的console print出來

    if (!((kc >= 48 && kc <= 57) || kc==8 || kc==13)) {
        event.returnValue = false;        
    }

    if (kc == 13) {
        event.srcElement.blur();
    }
}

function updatePrice() {
    if (event && event.srcElement && event.srcElement.tagName == "INPUT") {
        var input = event.srcElement;
        var newPrice = input.value;
        //input的parent node是td
        var priceTD = input.parentElement;
        priceTD.innerText = newPrice;
        //5. 更新當前row total的entity
        //priceTD.parentElement: td的parentElement就是tr
        updateRowTotal(priceTD.parentElement);
    }
}

//更新assigned row的total
function updateRowTotal(tr) {
    if (tr && tr.tagName == "TR") {
        var tds = tr.cells;
        var priceTD = tds[1].innerText;
        var countTD = tds[2].innerText;
        //innerText所獲取到的value是string類型，因此需要做type conversion。
        var total = parseInt(priceTD) * parseInt(countTD);
        tds[3].innerText = total;

        //6. 更新總計
        updateTotal();
    }
}

function updateTotal() {
    var fruitTb1 = document.getElementById("tbl_fruit");   
    var rows = fruitTb1.rows;
    var sum = 0;
    for (var i = 1; i < rows.length - 1; i++) {
        var tr = rows[i];
        var rowTotal = parseInt(tr.cells[3].innerText);  // tr.cells[3] not a number => 是一個object，要先抓到innerText然後convert to integer
        sum = sum + rowTotal;
    }
    rows[rows.length - 1].cells[1].innerText = sum;

}

// 當mouse hover的時候，將顯示背景顏色
function showBGColor() {
    // event: 當前發生的事件 
    // .srcElement: 事件發生的起源
    // alert(event.srcElement);
    // alert(event.srcElement.tagName); --> TD
    if (event && event.srcElement && event.srcElement.tagName == "TD") {
        var td = event.srcElement;
        // td.parentElement: 表示獲取td的父元素 --> TR
        var tr = td.parentElement;
        // 如果想要通過js設定某節點的樣式，則需要加上 .style
        tr.style.backgroundColor = "navy";
        // tr.cells: 表示獲取這個tr當中所有的entries
        var tds = tr.cells;
        for (var i = 0; i < tds.length; i++) {
            tds[i].style.color = "white";
        }
    }
}



// 當mouse leaves, 恢復成原始狀態樣式
function clearBGColor() {
    if (event && event.srcElement && event.srcElement.tagName == "TD") {
        var td = event.srcElement;
        var tr = td.parentElement;
        tr.style.backgroundColor = "transparent";
        var tds = tr.cells;
        for (var i = 0; i < tds.length; i++) {
            tds[i].style.color = "green";
        }
    }
}

// 當mouse hover在entry上時，顯示手勢的cursor
function showHand() { 
    if (event && event.srcElement && event.srcElement.tagName == "TD") {
        var td = event.srcElement;
        td.style.cursor = "hand";
    }
    
}