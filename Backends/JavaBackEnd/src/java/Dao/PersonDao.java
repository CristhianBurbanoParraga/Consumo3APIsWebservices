
package Dao;
import Model.Person;
import Connection.ConnectPostgres;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class PersonDao extends ConnectPostgres {
    
    public Person getPersonByName (String name) {
        Person person = new Person();
        try {
            PreparedStatement preparedStatement = getConecction()
                    .prepareStatement("select id " +
            "from (select id, (firstname || ' ' || lastname) as nameperson" +
            " from person) as tabla" +
            " where nameperson like ?;");
            preparedStatement.setString(1, name);
            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) { 
                person.setId(resultSet.getInt("id"));  
            }
        } catch (SQLException e) {
            System.err.println(e.getMessage());
        }
        return person;
    }
    
}
