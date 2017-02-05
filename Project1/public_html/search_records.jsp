<!DOCTYPE html>
<%@ page contentType="text/html;charset=windows-1256"%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=windows-1256"/>
        
        <!-- CSS -->
        <link type="text/css" rel="stylesheet" href="css/main.css">
        <link type="text/css" rel="stylesheet" href="css/jquery-ui.css">
        <link type="text/css" rel="stylesheet" href="css/jquery-style.css">
        
        <!-- javascript -->
        <script src="js/jquery.min.js"></script>
        <script src="js/jquery-1.12.4.js"></script>
        <script src="js/jquery-ui.js"></script>
        <script src="js/search_records.js"></script>
                
    </head>
    <body>
        <div id="MainContainer">
            <h2>Search records</h2>
            <span id="message-box"></span>
            <div class="container" id="LeftContainer">
                <label>Receipt ID: </label><input type="text" id="ReceiptId" /><br>
                <label>Item Label: </label><input type="text" id="ItemLabel" /><br>
                <label>Borrower: </label><input type="text" id="Borrower" /><br>
                <label>Receiver: </label><input type="text" id="Receiver" /><br>
                <label>Borrowed Before: </label><input type="text" id="BorrowBeforeDate" /><br>
                <label>Borrowed After: </label><input type="text" id="BorrowAfterDate" /><br>
                <label>Returned Before: </label><input type="text" id="ReturnBeforeDate" /><br>
                <label>Returned After: </label><input type="text" id="ReturnAfterDate" /><br>
                <label>Item type: </label><input type="text" id="ItemType" /><br>
                <label>Receipt status: </label>
                <select id="ReceiptStatus">
                    <option value="" selected>All</option>
                    <option value="0">Open</option>
                    <option value="1">Closed</option>
                </select>
                <br>
                <label>Item availability: </label>
                <select id="ItemStatus" >
                    <option value="" selected>All</option>
                    <option value="1">Available</option>
                    <option value="0">Not available</option>
                </select>
                <br>
                <button type="button" id="SearchButton">Search</button>
            </div>
            <div class="container" id="RightContainer">
                <!--<img id="LoadingResults" src="images/ajax-loader-2.gif">-->
                <table id="ResultsTable">
                    <tr>
                        <th>Records ID</th>
                        <th>Item Label</th>
                        <th>Item Type</th>
                        <th>Borrower</th>
                        <th>Borrow Date</th>
                        <th>Return Date</th>
                        <th>Status</th>
                        <th>Details</th>
                    </tr>
                </table>
            </div>
            <div id="ViewDetailsDialog">
                <label>Item ID:</label><span id="ItemId_dialog"></span><br>
                <label>Item Label:</label><span id="ItemLabel_dialog"></span><br>
                <label>Item Type:</label><span id="ItemType_dialog"></span><br>
                <label>Borrower:</label><span id="Borrower_dialog"></span><br>
                <label>IT Admin:</label><span id="Admin_dialog"></span><br>
                <label>Borrowed On:</label><span id="BorrowDate_dialog"></span><br>
                <label>Returned On:</label><span id="ReturnDate_dialog"></span><br>
                <label>Receipt ID:</label><span id="ReceiptId_dialog"></span><br>
            </div>
            <div id="ItemDetailsDialog">
                <label>ID:</label><span id="ItemId_ItemDialog"></span><br>
                <label>Label:</label><span id="ItemLabel_ItemDialog"></span><br>
                <label>Type:</label><span id="ItemType_ItemDialog"></span><br>
                <label>Location:</label><span id="Borrower_ItemDialog"></span><br>
                <label>Brand:</label><span id="Admin_ItemDialog"></span><br>
                <label>Serial No.:</label><span id="BorrowDate_ItemDialog"></span><br>
                <label>Condition:</label><span id="ReturnDate_ItemDialog"></span><br>
                <label>Availability:</label><span id="ReceiptId_ItemDialog"></span><br>
                <div id="ItemSpecs"></div>
            </div>
        </div>
    </body>
</html>