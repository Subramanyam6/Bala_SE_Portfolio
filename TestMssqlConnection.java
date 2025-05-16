import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class TestMssqlConnection {
    public static void main(String[] args) {
        String connectionUrl = 
            "jdbc:sqlserver://localhost:1433;"
            + "database=master;"
            + "user=sa;"
            + "password=YourStrong@Passw0rd;"
            + "encrypt=false;"
            + "trustServerCertificate=false;"
            + "loginTimeout=30;";

        try (Connection connection = DriverManager.getConnection(connectionUrl);
             Statement statement = connection.createStatement()) {
            
            System.out.println("Connected to SQL Server successfully!");
            
            // Test if the portfolio database exists
            String sql = "SELECT name FROM sys.databases WHERE name = 'portfolio'";
            ResultSet resultSet = statement.executeQuery(sql);
            
            if (resultSet.next()) {
                System.out.println("Portfolio database already exists.");
            } else {
                System.out.println("Portfolio database does not exist. Creating it...");
                statement.executeUpdate("CREATE DATABASE portfolio");
                System.out.println("Portfolio database created successfully.");
            }
            
            System.out.println("Database connection test completed successfully!");
        }
        catch (Exception e) {
            System.out.println("Connection Failed:");
            e.printStackTrace();
        }
    }
} 