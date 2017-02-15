package project1;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.*;
import javax.servlet.http.*;

public class logout extends HttpServlet {
    private static final String CONTENT_TYPE = "text/html; charset=UTF-8";

    public void init(ServletConfig config) throws ServletException {
        super.init(config);
    }

    public void doGet(HttpServletRequest request,
                      HttpServletResponse response) throws ServletException,
                                                           IOException {
        response.setContentType("text/html");  
        PrintWriter out=response.getWriter();  
        
        out.println("<html>");
        out.println("<head>");
        out.println("<link type='text/css' rel='stylesheet' href='css/main.css'>");
        out.println("</head>");
        out.println("<body>");
        out.println("<div id='MainContainer'>");
          
        request.getRequestDispatcher("nav_bar.html").include(request, response);  
          
        HttpSession session=request.getSession();
        
        Log log = new Log();
        log.log("Logged out", request, session);
        
        session.invalidate();  
          
        out.print("<h3 style=\"float:left\">You are successfully logged out.</h3><br>");  
        out.print("<a href='login.jsp'>login</a>");
        out.println("</div></body></html>");
          
        out.close();
    }

    public void doPost(HttpServletRequest request,
                       HttpServletResponse response) throws ServletException,
                                                            IOException {
        response.setContentType(CONTENT_TYPE);
        PrintWriter out = response.getWriter();
        out.close();
    }
}
