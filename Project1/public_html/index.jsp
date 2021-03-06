<!DOCTYPE html>
    <head>
        <!-- CSS -->
        <link type="text/css" rel="stylesheet" href="css/main.css">
        <link rel="icon" href="images/logo_image.png">
    </head>
    <body>
        <div id="MainContainer">
            <% request.getRequestDispatcher("nav_bar.html").include(request,response);%>
            <div id="IndexContent">
                <div id="index_logo"><img id = 'index_logo' src="images/logo_stock.png"></div>
                <div id="index-table">
                    <table>
                        <tr>
                            <td><a href="add_item.jsp">Add Item<br><img class = 'index_images' src="images/add-icon-png-2461.png"></a></td>
                            <td><a href="items_hq">Search Items<br><img class = 'index_images' src="images/search_icon.png"></a></td>
                            <td><a href="search_records.jsp">Search Records<br><img class = 'index_images' src="images/book-16-xxl.png"></a></td>
                        </tr>
                        <tr>
                            <td><a href="new_user.jsp">New User<br><img class = 'index_images' src="images/new_user.png"></a></td>
                            <td><a href="manage_access.jsp">Manage access<br><img class = 'index_images' src="images/Security guard.png"></a></td>
                            <td><a href="logs.jsp">Logs<br><img class = 'index_images' src="images/logs.png"></a></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </body>
</html>