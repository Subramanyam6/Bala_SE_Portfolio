import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class TestSqlConnection {
    public static void main(String[] args) {
        String url = "jdbc:sqlserver://localhost:1433;databaseName=portfolio;encrypt=false";
        String username = "sa";
        String password = "YourStrong@Passw0rd";
        
        try {
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            System.out.println("Driver loaded successfully!");
            
            System.out.println("Attempting to connect to SQL Server...");
            Connection connection = DriverManager.getConnection(url, username, password);
            System.out.println("Connection successful!");
            
            boolean valid = connection.isValid(5);
            System.out.println("Connection is valid: " + valid);
            
            connection.close();
            System.out.println("Connection closed successfully.");
        } catch (ClassNotFoundException e) {
            System.err.println("Error: SQL Server JDBC driver not found!");
            e.printStackTrace();
            System.exit(1);
        } catch (SQLException e) {
            System.err.println("Error: Failed to connect to SQL Server!");
            System.err.println("Error message: " + e.getMessage());
            System.err.println("SQL State: " + e.getSQLState());
            System.err.println("Error code: " + e.getErrorCode());
            e.printStackTrace();
            System.exit(1);
        }
    }
}
