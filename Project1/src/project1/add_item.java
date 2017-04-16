package project1;

import java.io.IOException;
import java.io.PrintWriter;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.*;
import javax.servlet.http.*;

public class add_item extends HttpServlet {
    private static final String CONTENT_TYPE = "text/html; charset=windows-1256";

    public void init(ServletConfig config) throws ServletException {
        super.init(config);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType(CONTENT_TYPE);
        PrintWriter out = response.getWriter();
        
        
        
        out.close();
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType(CONTENT_TYPE);
        PrintWriter out = response.getWriter();
        
        // get sent attributes
        String type = request.getParameter("type");
        String brand = request.getParameter("brand");
        String location = request.getParameter("location");
        String label = request.getParameter("label");
        String serial_number = request.getParameter("serial_number");
        String condition = request.getParameter("condition");
        String[] specs_names = request.getParameterValues("specs_names[]"); // sorted with respect to specs_values
        String[] specs_values = request.getParameterValues("specs_values[]"); // sorted with respect to specs_names
        String model = request.getParameter("model");
        String keyword = request.getParameter("keyword");
        String notes = request.getParameter("notes");
        /*String count = request.getParameter("count");
        int count_ = 0;
        try{
            count_ = Integer.parseInt(count);
        }
        catch (Exception ex){
            System.out.println(ex.toString());
        }*/
        //if(count_ > 0 && count_ < 101){        
            //for(int i = 0 ; i < count_ ; i++){
                if(Queries.add_item(label, location, brand, type, serial_number, condition, specs_names, specs_values, model, keyword, notes)){
                    out.println("Item added successfully: " + label);
                    Log log = new Log();
                    HttpSession session = request.getSession();
                    String description = "Added item " + label + " of type " + type;
                    log.log(description, request, session);
                }
                else{
                    out.println("Cannot add item "+ label +". Check input.");
                }
            //}
        //}
        /*else{
            out.println("Cannot add item "+ label +". Count error.");
        }*/
        out.close();
    }
}
