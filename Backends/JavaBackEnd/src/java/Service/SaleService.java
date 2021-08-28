
package Service;
import Model.Sale;
import Dao.SaleDao;
import java.io.IOException;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;

@Path("/sale")
public class SaleService implements ContainerResponseFilter {
    
    SaleDao saleDao = new SaleDao();
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Sale> getAllSales () {
        return saleDao.getAllSales();
    }
    
    @GET
    @Path("/{person}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Sale> getSalesByUser (@PathParam("person") String userName) {
        return saleDao.getSaleByPerson(userName);
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Sale insertSale (Sale sale) {
        return saleDao.insertSale(sale);
    }
    
    @PUT
    @Path("/{idsale}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Sale updateSale (@PathParam("idsale") int id, Sale sale) {
        sale.setId(id);
        return saleDao.updateSale(sale);
    }
    
    @DELETE
    @Path("/{idsale}")
    public int deleteSale (@PathParam("idsale") int id) {
        return saleDao.deleteSale(id);
    }
    
    @Override
    public void filter(ContainerRequestContext requestContext, 
            ContainerResponseContext responseContext) throws IOException {
        responseContext.getHeaders().add("Access-Control-Allow-Origin", "*");
        responseContext.getHeaders().add("Access-Control-Allow-Headers",
                "origin, content-type, accept, authorization");
        responseContext.getHeaders().add("Access-Control-Allow-Credentials", "true");
        responseContext.getHeaders().add("Access-Control-Allow-Methods",
                "GET, POST, PUT, DELETE, OPTIONS, HEAD");
    }
}
