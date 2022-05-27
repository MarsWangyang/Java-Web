// window: 當前視窗
window.onload = function () {
    // 當頁面load完成，需要綁定各種事件
    // 根據id獲取到表格
    var fruitTb1 = window.document.getElementById("tbl_fruit")
    // 獲取表格當中的所有row (table當中tr的所有value)
    var rows = fruitTb1.rows;
    for (var i = 0; i < rows.length; i++) {
        var tr = rows[i];
        // 1. 綁定mouse hover以及out -> 設定bgcolor event
        tr.onmouseover = showBGColor; // 是綁定showBGColor事件，而不是"執行"這個事件
        tr.onmouseout = clearBGColor;
        // 獲取tr此row的所有entries
        var cells = tr.cells;
        var priceTD = cells[1];
        // 2. 綁定mouse hover在price entity變成hand的event
        priceTD.onmouseover = showHand;

    }

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
        td.style.cursor = "hands";
    }
    
}