
package Connection;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectPostgres implements Serializable {
    
    private final String host = "localhost";
    private final String user = "postgres";
    private final String password = "criss97";
    private final String dataBase = "kiosquito";
    private final String port = "5432";
    private Connection conecction;

    public ConnectPostgres() {
        try {
            Class.forName("org.postgresql.Driver");
        } catch (ClassNotFoundException e) {
            System.err.println(e.getMessage());
        }
    }

    public synchronized Connection getConecction() {
        try {
            if (conecction == null || conecction.isClosed()) {
                conecction = DriverManager.getConnection("jdbc:postgresql://" 
                        + host + ":" + port + "/" + dataBase, user, password);
            }
        } catch (SQLException e) {
            System.err.println(e.getMessage());
        } 
        return conecction;
    }

    public boolean isConected() {
        try {
            if (conecction == null) {
                return false;
            } else return !conecction.isClosed();
        } catch (SQLException ex) {
            System.err.println(ex.getMessage());
        }
        return false;
    }
    
}
