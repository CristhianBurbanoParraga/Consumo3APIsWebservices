
package Dao;
import Model.Product;
import Connection.ConnectPostgres;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ProductDao extends ConnectPostgres {
    
    public Product getProductByName (String name) {
        Product product = new Product();
        try {
            PreparedStatement preparedStatement = getConecction()
                    .prepareStatement("select id, price from product "
                            + "where name like ?;");
            preparedStatement.setString(1, name);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {                
                product.setId(resultSet.getInt("id"));
                product.setPrice(resultSet.getDouble("price"));
            }
        } catch (SQLException e) {
            System.err.println(e.getMessage());
        }
        return product;
    }
    
}
