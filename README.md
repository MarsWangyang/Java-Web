# **Java Web**

## **Description**

```
This project is the implementation for Java Web, including CSS, JS, HTML, and Java8
```

## **CSS**

1. 目的: 頁面顯示的美觀程度 <br/>
2. 基礎語法:
   - 標籤樣式
   - 類樣式
   - ID 樣式
   - 組合樣式
   - 嵌入式樣式表：在`.html`當中的`標籤內部`去做樣式
   - 內部樣式表：在`.html`當中設立一個`style`標籤，去做樣式管理
   - 外部樣式表：在`.css`當中去做樣式管理
3. 盒子模型：
   - `border`
   - `margin`
   - `padding`
4. 定位以及浮動：
   - `position`
   - `float`
   - DIV+CSS layout

## **JavaScript**

1. JS 是 client-side (or browser-side)運行的的 script language
2. JS 是若類型的 language,
   ```javascript
   var str = 99;
   ```
3. JS 的函數,
   ```javascript
   // parameters可以傳也可以不傳，也可以一次傳超過或少於原先定義好的數量
   function hello(var num) {}
   ```
4. DOM 技術：
   1. 鼠標懸浮：`onmouseover`, `event.srcElement`, 事件傳遞, `parentElement`, `style.backgroundColor`
   2. 鼠標離開：`onmouseout`
   3. 鼠標點擊：`hand/pointer`, `onclick`, `td.innerText`, `td.innerHTML="<input type='text'/>"`, `td.firstChild.value=oldPrice`
   4. 失去焦點：`onblur`, `input.parentElement.innerText=newPrice`
   5. 更新 total:`input=event.srcElement`, `tr=input.parentElement.parentElement;`, `tr.cells`, `parseInt()`
   6. 更新 sum：`documnet.getElementById("fruit_tbl")`, `fruitTbl.rows`
   7. 刪除 row：`img`, `img.parentElement.parentElement.rowIndex`, `table.deleteRow(rowIndex)`

## **Web**

|      |                                                                                                           Client-Side (CS, 客戶端服務器架構模式)                                                                                                           |                                                                         Browser-Side (BS, 瀏覽器服務器架構模式)                                                                         |
| :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Pros | 充分利用客戶端機器的 resource<br/>減輕 server 的 workload<br/> （在否些安全要求不高的計算儲存任務當中，會把這些內容放在 client-side 執行，不需要把所有的 compute 以及 storage 交給 server 執行，從而減輕 server pressure，同時也 reduce network pressure） |                                                                        需要 patch 或是 install, 升級維護的成本高                                                                        |
| Cons |                                                                                                             客戶端不需要安裝<br/>維護成本較低                                                                                                              | 所有的 compute 以及 storage 都是放在 server，服務器的負荷較重<br>server 在 compute finished 後，會把結果再傳給 client，因此客戶端和服務器端會進行非常頻繁的數據交換，因此網路負擔也較重 |

### TomCat

```
Client vs Server 當中, tomcat 所指的意思就是 server, 並且 tomcat 是一個 WebContainer
```

**Installation (By Docker)**

```bash
docker pull tomcat:latest
docker run -it -p 8080:8080 tomcat
# Here is to fix 404 Error when access the localhost:8080
# step1: check whether the webapps/ is empty or not
# step2: delete webapps/ directory
# step3: change the name of "webapps.dist" to "webapps"
ls webapps/
rm -r webapps
mv webapps.dist/ webapps/
```

**Tomcat Directory hierarchy**<br/>
|---bin--- 可執行的文件<br/>
|---conf--- 配置文件<br/>
|---lib--- 依賴許多的 java class<br/>
|---logs--- 運行的過程當中會存放日誌<br/>
|---temp--- 用來暫存資料的文件夾<br/>
|---webapps--- 項目部署的空間，部署的項目可以放在這邊<br/>
|---work--- 在開始運行後會產生工作目錄，就放到這邊來<br/>

- 配置環境變量：因為 tomcat 是用 java 以及 C 來寫的，因此需要 JRE，所以會需要配置 JAVA_HOME

**How to deploy a html page in Tomcat**

```bash
mkdir -p webapps/myweb/WEB-INF # the second folder must be called "WEB-INF"
mv <your_page_info> webapps/myweb/ # paste your page to the folder as same as WEB-INF folder
# access the page: localhost:8080/myweb/mypage.html -> /myweb/: context root
```

![mypage](/README_img/mypage.png "這是自行設計的page on tomcat in Docker")
