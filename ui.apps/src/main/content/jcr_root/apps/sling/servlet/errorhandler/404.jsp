<%  
//setting response code as 404
response.setStatus(HttpServletResponse.SC_NOT_FOUND);
try {
    String uri = request.getRequestURI();
         
    if(uri.matches("(/content/lhg-lms/us/en/)(.*)"))
    {
        response.sendRedirect("/content/lhg-lms/us/en/404.html");
    } else if(uri.matches("(/content/lhg-lms/us/fr/)(.*)"))
    {
        response.sendRedirect("/content/lhg-lms/us/fr/404.html");
    }
 
} catch (Exception e) {

%>
        Page Not Found
<%
}

%>