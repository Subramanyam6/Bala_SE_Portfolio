#!/bin/bash

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Testing SQL Server Connection...${NC}"

# Create a Java class to test connection
cat > TestSqlConnection.java << 'EOF'
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
EOF

# Check if the portfolio database exists, and create it if it doesn't
echo -e "${YELLOW}Checking if portfolio database exists...${NC}"
docker exec -it sqldev /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "YourStrong@Passw0rd" -Q "IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'portfolio') CREATE DATABASE portfolio"

# Compile and run the Java program
echo -e "${YELLOW}Compiling test program...${NC}"
if ! javac TestSqlConnection.java; then
    echo -e "${RED}Compilation failed!${NC}"
    exit 1
fi

echo -e "${YELLOW}Running test program...${NC}"
java -cp .:portfolio-app/backend/target/classes:$(find ~/.m2/repository -name "mssql-jdbc-*.jar" | head -1) TestSqlConnection

# Clean up
rm TestSqlConnection.java
rm TestSqlConnection.class

echo -e "${GREEN}Test completed!${NC}" 