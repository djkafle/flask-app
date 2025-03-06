# database/Dockerfile
FROM mysql:5.7

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=sql_database
ENV MYSQL_USER=sqluser
ENV MYSQL_PASSWORD=sqlpassword

# Copy the initialization script
COPY init.sql /docker-entrypoint-initdb.d/

# Expose the MySQL port
EXPOSE 3306
