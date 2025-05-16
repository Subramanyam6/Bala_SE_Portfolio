#!/bin/bash

echo "Setting up SQL Server connection test..."

# Create a temporary directory
mkdir -p /tmp/sql-test

# Create the test Java file
cat > /tmp/sql-test/TestSqlConnection.java << 'EOF'
import java.sql.*;

public class TestSqlConnection {
    public static void main(String[] args) {
        String connectionUrl = 
            "jdbc:sqlserver://host.docker.internal:1433;"
            + "database=master;"
            + "user=sa;"
            + "password=MEMPShanmukh6!((;"
            + "encrypt=false;"
            + "trustServerCertificate=false;"
            + "loginTimeout=30;";

        try {
            System.out.println("Attempting to connect to SQL Server...");
            Connection connection = DriverManager.getConnection(connectionUrl);
            System.out.println("Connected successfully to SQL Server!");
            
            DatabaseMetaData metaData = connection.getMetaData();
            System.out.println("Database: " + metaData.getDatabaseProductName() + " " + metaData.getDatabaseProductVersion());
            System.out.println("Driver: " + metaData.getDriverName() + " " + metaData.getDriverVersion());
            
            // Test if the portfolio database exists
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT name FROM sys.databases WHERE name = 'portfolio'");
            
            if (rs.next()) {
                System.out.println("Portfolio database already exists.");
            } else {
                System.out.println("Portfolio database does not exist. Creating it...");
                stmt.executeUpdate("CREATE DATABASE portfolio");
                System.out.println("Portfolio database created successfully.");
            }
            
            // Test creating a table in the portfolio database
            connection.close();
            
            // Connect to the portfolio database
            connectionUrl = connectionUrl.replace("database=master", "database=portfolio");
            connection = DriverManager.getConnection(connectionUrl);
            System.out.println("Connected to portfolio database!");
            
            stmt = connection.createStatement();
            
            // Check if test_table exists and create it if it doesn't
            rs = stmt.executeQuery("SELECT OBJECT_ID('test_table')");
            if (rs.next() && rs.getObject(1) != null) {
                System.out.println("Test table already exists.");
            } else {
                System.out.println("Creating test table...");
                stmt.executeUpdate("CREATE TABLE test_table (id INT, name NVARCHAR(100))");
                System.out.println("Test table created successfully.");
                
                // Insert a test row
                stmt.executeUpdate("INSERT INTO test_table VALUES (1, 'Test Data')");
                System.out.println("Test data inserted successfully.");
            }
            
            // Query the test table
            rs = stmt.executeQuery("SELECT * FROM test_table");
            System.out.println("Data in test_table:");
            while (rs.next()) {
                System.out.println(rs.getInt("id") + " - " + rs.getString("name"));
            }
            
            connection.close();
            System.out.println("Database connection test completed successfully!");
        } catch (Exception e) {
            System.out.println("Connection Failed:");
            e.printStackTrace();
        }
    }
}
EOF

# Create a Dockerfile for the test
cat > /tmp/sql-test/Dockerfile << 'EOF'
FROM openjdk:17-slim

RUN apt-get update && apt-get install -y curl

WORKDIR /app

COPY TestSqlConnection.java .

# Download the SQL Server JDBC driver
RUN curl -L -o mssql-jdbc.jar https://repo1.maven.org/maven2/com/microsoft/sqlserver/mssql-jdbc/12.4.2.jre11/mssql-jdbc-12.4.2.jre11.jar

# Compile the Java code
RUN javac -cp mssql-jdbc.jar TestSqlConnection.java

CMD ["java", "-cp", ".:mssql-jdbc.jar", "TestSqlConnection"]
EOF

# Build and run the Docker container
cd /tmp/sql-test
echo "Building Docker image for SQL Server connection test..."
docker build -t sql-test .
echo "Running SQL Server connection test..."
docker run --rm --network=host sql-test

# Clean up
cd -
rm -rf /tmp/sql-test
echo "Test completed. Temporary files cleaned up." 