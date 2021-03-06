package project1;

import java.io.IOException;
import java.io.PrintWriter;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.*;
import javax.servlet.http.*;

public class return_receipt_from_record_id extends HttpServlet {
    private static final String CONTENT_TYPE = "text/html; charset=windows-1256";

    public void init(ServletConfig config) throws ServletException {
        super.init(config);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType(CONTENT_TYPE);
        PrintWriter out = response.getWriter();
        
        String record_id = request.getParameter("record_id");
        String client_returner = request.getParameter("client_returner");
        String new_location = request.getParameter("new_location");
        
        String receipt_id = Records.get_receipt_id_from_record_id(record_id);
        
        List<String> record_ids = new ArrayList<String>();
        record_ids = Records.get_record_ids_from_receipt(receipt_id);
        
        HttpSession session = request.getSession();
        String admin_receiver = (String)session.getAttribute("username");
        String admin_name = Queries.get_name_from_username(admin_receiver);
        
        Access access = new Access();
        String user = (String)session.getAttribute("username");
        String method = "return_receipt"; // this method name is to be added in the manage_access.jsp page
        if(user == null){
            out.println("<a href=\"login.jsp\">Login first.</a>");
        }
        else if(!access.has_access(user, method)){
            out.println("You do not have permission to do that.");
        }
        else{
            for(int i = 0 ; i < record_ids.size() ; i++){
                if(Records.return_item(record_ids.get(i), client_returner, out, admin_receiver, new_location)){
                }
                else{
                    // send error flag to client side
                    out.println("ERROR");
                }
            }
            // send email
            String content = "";
            String subject = "IT STOCK - CHECK IN";
            content += "Admin: " + admin_name + " has received a whole receipt<br>";
            content += "Receipt ID: " + receipt_id + "<br>";
            content += "Returner: " + client_returner + "<br>";
            content += "New location: " + new_location + "<br><br>";
            
            // get Receipt items
            List<String> item_ids = new ArrayList<String>();
            item_ids = Records.get_item_ids_from_receipt_id(receipt_id);
            
            // add details of each item to email
            if(item_ids != null){
                for(int i = 0 ; i < item_ids.size() ; i++){
                    String item_id = item_ids.get(i);
                    String item_type = "";
                    String item_brand = "";
                    String item_label = "";
                    
                    item_type = Queries.get_item_type_from_id(item_id);
                    item_brand = Queries.get_item_brand_from_id(item_id);
                    item_label = Queries.get_item_label_from_item_id(item_id);
                    content += "<br>";
                    content += "Item ID: "+ item_id +"<br>";
                    content += "Type: "+ item_type +"<br>";
                    content += "Brand: "+ item_brand +"<br>";
                    content += "Label: "+ item_label +"<br>";
                }
            }
                        
            content += "<br>Regards,";
            SendEmail.send_email(content, subject);
            
            Log log = new Log();
            // HttpSession session = request.getSession();
            String description = "Receipt " + receipt_id + " checked in";
            log.log(description, request, session);
            out.close();
        }
        
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType(CONTENT_TYPE);
        PrintWriter out = response.getWriter();
        out.close();
    }
}
