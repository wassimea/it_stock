package project1;

import com.google.gson.Gson;

import java.io.IOException;
import java.io.PrintWriter;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.*;
import javax.servlet.http.*;

public class get_specs extends HttpServlet {
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
        
        // get the type selected in the autocomplete box of labeled "Add Item of type:"
        String type = request.getParameter("type_selected");
        
        // get specs of chosen type and add to list
        List<String> specs = new ArrayList<String>();
        specs = Queries.get_specs_of_type(type);
        
        // output as JSON
        Gson gson = new Gson();
        out.println(gson.toJson(specs));
        
        // test
        // System.out.println(gson.toJson(specs));
        
        out.close();
    }
}
