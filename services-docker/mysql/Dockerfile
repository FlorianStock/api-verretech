FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD fenrirproject2020  
ENV MYSQL_DATABASE verretech-erp-db  
ENV MYSQL_USER fenrirproject  
ENV MYSQL_PASSWORD fenrirproject2020

ADD db.sql /docker-entrypoint-initdb.d/
