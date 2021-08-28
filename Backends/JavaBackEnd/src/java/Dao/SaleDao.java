package Dao;

import Model.Sale;
import Model.Product;
import Model.Person;
import Connection.ConnectPostgres;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class SaleDao extends ConnectPostgres {

    public List<Sale> getAllSales() {
        List<Sale> sales = new ArrayList<>();
        try {
            try (PreparedStatement preparedStatement = getConecction()
                    .prepareStatement("SELECT s.id, p.\"name\" as nameproduct,"
                + " (pr.firstname || ' ' || pr.lastname) as nameperson, "
                + "s.quantity, s.total, s.observation "
                + "FROM sale as s INNER JOIN product as p ON s.idproduct = p.id"
                + " INNER JOIN person as pr ON s.idperson = pr.id");
                    ResultSet resultSet = preparedStatement.executeQuery()) {
                while (resultSet.next()) {
                    Sale sale = new Sale(resultSet.getInt("id"),
                            resultSet.getString("nameproduct"),
                            resultSet.getString("nameperson"),
                            resultSet.getInt("quantity"),
                            resultSet.getDouble("total"),
                            resultSet.getString("observation"));
                    sales.add(sale);
                }
            }
        } catch (SQLException e) {
            System.err.println(e.getMessage());
        }
        return sales;
    }

    public List<Sale> getSaleByPerson(String name) {
        List<Sale> sales = new ArrayList<>();
        try {
            PreparedStatement preparedStatement = getConecction()
                    .prepareStatement("select * "
                + "from (select s.id, pr.name as nameproduct, "
                + "(p.firstname || ' ' || p.lastname) as nameperson, "
                + "s.quantity, s.total, s.observation "
                + "from sale as s inner join person as p on p.id = s.idperson "
                + "inner join product as pr on pr.id = s.idproduct) as tabla "
                + "where nameperson like ?;");
            preparedStatement.setString(1, name);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                Sale sale = new Sale(resultSet.getInt("id"),
                        resultSet.getString("nameproduct"),
                        resultSet.getString("nameperson"),
                        resultSet.getInt("quantity"),
                        resultSet.getDouble("total"),
                        resultSet.getString("observation"));
                sales.add(sale);
            }
        } catch (SQLException e) {
            System.err.println(e.getMessage());
        }
        return sales;
    }
    
    public Sale insertSale (Sale sale) {
        ResultSet resultSet = null;
        int row = 0;
        ProductDao productDao = new ProductDao();
        PersonDao personDao = new PersonDao();
        Product product = productDao.getProductByName(sale.getNameProduct());
        Person person = personDao.getPersonByName(sale.getNamePerson());
        try {
            PreparedStatement preparedStatement = getConecction()
                    .prepareStatement("insert into sale (idproduct,idperson,"
            + "quantity,total,observation) values (?,?,?,?,?);", 
                            PreparedStatement.RETURN_GENERATED_KEYS);
            preparedStatement.setInt(1, product.getId());
            preparedStatement.setInt(2, person.getId());
            preparedStatement.setInt(3, sale.getQuantity());
            preparedStatement.setDouble(4, product.getPrice() * sale.getQuantity());
            preparedStatement.setString(5, sale.getObservation());
            preparedStatement.executeUpdate();
            resultSet = preparedStatement.getGeneratedKeys();
            while (resultSet.next()) {
                row = resultSet.getInt(1);
            }
        } catch (SQLException e) {
            System.err.println(e.getMessage());
        }
        if (row == 0) {
            return null;
        } else {
            sale.setId(row);
            sale.setTotal(product.getPrice() * sale.getQuantity());
            return sale;
        }
    }
    
    public Sale updateSale (Sale sale) {
        int row = 0;
        ProductDao productDao = new ProductDao();
        PersonDao personDao = new PersonDao();
        Product product = productDao.getProductByName(sale.getNameProduct());
        Person person = personDao.getPersonByName(sale.getNamePerson());
        try {
            PreparedStatement preparedStatement = getConecction()
                    .prepareStatement("update sale set idproduct = ?, " +
            "idperson = ?, quantity = ?, total = ?, observation = ? " +
            "where id = ?");
            preparedStatement.setInt(1, product.getId());
            preparedStatement.setInt(2, person.getId());
            preparedStatement.setInt(3, sale.getQuantity());
            preparedStatement.setDouble(4, product.getPrice() * sale.getQuantity());
            preparedStatement.setString(5, sale.getObservation());
            preparedStatement.setInt(6, sale.getId());
            row = preparedStatement.executeUpdate();
        } catch (SQLException e) {
            System.err.println(e.getMessage());
        }
        if (row == 0) {
            return null;
        } else {
            sale.setTotal(product.getPrice() * sale.getQuantity());
            return sale;
        }
    }
    
    public int deleteSale (int id) {
        int row = 0;
        try {
            PreparedStatement preparedStatement = getConecction()
                    .prepareStatement("delete from sale where id = ?;");
            preparedStatement.setInt(1, id);
            row = preparedStatement.executeUpdate();
        } catch (SQLException e) {
            System.err.println(e.getMessage());
        }
        if (row == 0) {
            return 0;
        } else {
            return id;
        }
    }
}
