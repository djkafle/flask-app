# Use the official MySQL image as the base image
FROM mysql:5.7

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=finance_db
ENV MYSQL_USER=finance_user
ENV MYSQL_PASSWORD=db_user

# Copy the initialization script
COPY init.sql /docker-entrypoint-initdb.d/

# Expose the MySQL port
EXPOSE 3306
