package project1;

import java.io.IOException;
import java.io.PrintWriter;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import java.util.Iterator;
import java.util.List;

import javax.servlet.*;
import javax.servlet.http.*;

import jcifs.smb.NtlmPasswordAuthentication;
import jcifs.smb.SmbFile;
import jcifs.smb.SmbFileOutputStream;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

public class upload_image
  extends HttpServlet
{
  private static final String CONTENT_TYPE = "text/html; charset=windows-1256";

  public void init(ServletConfig config)
    throws ServletException
  {
    super.init(config);
  }

  public void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException
  {
    response.setContentType(CONTENT_TYPE);
    PrintWriter out = response.getWriter();
    
    connect_to_db connect = new connect_to_db();
    Connection con = connect.connect();
    
    String item_id = "";
    String check = "";
    String fileName = "";
    
    boolean isMultipart = ServletFileUpload.isMultipartContent(request);
    
    if (isMultipart) {
        // Create a factory for disk-based file items
        FileItemFactory factory = new DiskFileItemFactory();
    
        // Create a new file upload handler
        ServletFileUpload upload = new ServletFileUpload(factory);
    
        try {
            // Parse the request
            List /* FileItem */ items = upload.parseRequest(request);
            Iterator iterator = items.iterator();
            while (iterator.hasNext())
            {
              FileItem item = (FileItem) iterator.next();
              if (!item.isFormField())
              {
                String user = StorageSettings.read_setting("storage_username");
                String pass = StorageSettings.read_setting("storage_password");
                String server_ip = StorageSettings.read_setting("storage_hostname");
                String sharedFolder= StorageSettings.read_setting("images_folder");
              
                fileName = item.getName();
                
                String path="smb://"+ server_ip +"/"+sharedFolder+"/" + fileName;
                NtlmPasswordAuthentication auth = new NtlmPasswordAuthentication("",user, pass);
                SmbFile smbFile = new SmbFile(path,auth);
                SmbFileOutputStream smbfos = new SmbFileOutputStream(smbFile);
                smbfos.write(item.get());
                smbfos.close();
              }
              else
              {
                String name = item.getFieldName();
                if(name.equals("item_id_hidden"))
                {
                  item_id = item.getString();
                }
                else
                {
                  check = item.getString();
                }
              }
            }
          
          String sql_add_image_to_db = "";
          if(check.equals("") || check == null)
          {
            sql_add_image_to_db = "UPDATE ITEMS SET ITEMS.IMAGE = '" + fileName +"' WHERE ITEMS.ID = '" + item_id + "'";
          }
          else
          {
            String sql_get_type_model = "SELECT ITEMS.TYPE_ID,ITEMS.BRAND_ID, ITEMS.MODEL FROM ITEMS WHERE ITEMS.ID = '" + item_id + "'";
            Statement stat_get_type_model = con.createStatement();
            ResultSet rs_get_type_model = stat_get_type_model.executeQuery(sql_get_type_model);
            System.out.println("hi");
            rs_get_type_model.next();
            String type = rs_get_type_model.getString(1);
            String brand = "";
            String model = "";
            try
            {
              brand = rs_get_type_model.getString(2);
            }
            catch(Exception e)
            {
              brand = "null";
            }
            try
            {
              model = rs_get_type_model.getString(3);
            }
            catch(Exception e)
            {
              model = "null";
            }
            
            sql_add_image_to_db = "UPDATE ITEMS SET ITEMS.IMAGE = '" + fileName + "' WHERE ITEMS.TYPE_ID = '" + type + "'";
            if(model == null || model.equals("null"))
            {
              sql_add_image_to_db = sql_add_image_to_db + " AND ITEMS.MODEL IS NULL";
            }
            else
            {
              sql_add_image_to_db = sql_add_image_to_db + " AND ITEMS.MODEL = '" + model + "'";
            }
            if(brand == null || brand.equals("null"))
            {
              sql_add_image_to_db = sql_add_image_to_db + " AND ITEMS.BRAND_ID IS NULL";
            }
            else
            {
              sql_add_image_to_db = sql_add_image_to_db + " AND ITEMS.BRAND_ID = '" + brand + "'";
            }
          }
          Statement stat_add_image_to_db = con.createStatement();
          stat_add_image_to_db.executeUpdate(sql_add_image_to_db);
          response.sendRedirect("items_hq");

          
        } catch (FileUploadException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
  }
}
