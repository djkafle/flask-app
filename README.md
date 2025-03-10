# Flask MySQL Kubernetes Project

This project demonstrates a simple web application named **Personal Finance Tracker** built with **Fast API** (Python),**React** (frontend) and **MySQL**, deployed on **Azure Kubernetes Service (AKS)**. The application allows users to submit their transaction through a web form along with the dashobard view, which are then stored in a MySQL database.

---


## **Features**

1. **Frontend:**
   - A simple web form to collect user input built in React JS.
   - Styled with CSS for a clean and modern look.
   - Validate user inputs using JavaScripts.

2. **Backend:**
   - FAST API to handle form submissions.
   - Connects to a MySQL database to store and retrieve user data.

3. **Database:**
   - MySQL database to store transaction information.
   - Initialized with a `transactions` table using `init.sql`.

4. **Kubernetes Deployment:**
   - Deployed on Azure Kubernetes Service (AKS).
   - Includes deployments and services for the frontend, backend, and database.

5. **CI/CD Pipeline:**
   - **Pipeline for every environment is separated so that changes in one doesn't affect another.**
   - Automated build and deployment using GitHub Actions.
   - Docker images are built and pushed to Docker Hub.
   - Application is deployed to AKS.

7. **Azure Managed Grafana:**
   - Azure Monitor to collect logs and metrics.
   - Prometheus scrapes metrics in AKS.
   - Grafana queries Prometheus to visualize the data through dashboards.
---

## **Prerequisites**

Before running the project, ensure you have the following installed:

1. **Docker**: For containerizing the application.
2. **Kubectl**: For interacting with the Kubernetes cluster.
3. **Azure CLI**: For managing Azure resources.
4. **MySQL Client**: For interacting with the MySQL database.
5. **Python 3.x**: For running Flask locally (optional).

---

# **Setup Instructions**
## 1. Clone the repository

```bash
git clone https://github.com/djkafle/flask-app.git
cd flask-app
```

## 2. Set Up the Database

### Build the MySQL Docker Image:
```bash
cd database
docker build -t your-dockerhub-username/app-segregation-database:latest .
```

### Run the MySQL Container Locally (Optional):
```bash
docker run -d --name mysql-container -e MYSQL_ROOT_PASSWORD=rootpassword -p 3306:3306 dhananjayakafle/app-segregation-database:latest
```

### Initialize the Database:
Connect to the MySQL container and run the `init.sql` script:
```bash
docker exec -it mysql-container mysql -u root -p
```
Enter the password (`rootpassword`) and run:
```sql
source /docker-entrypoint-initdb.d/init.sql;
```

## 3. Set Up the Backend

### Build the Backend Docker Image:
```bash
cd ../backend
docker build -t dhananjayakafle/app-segregation-backend:latest .
```

### Run the Backend Locally (Optional):
```bash
docker run -d --name backend-container -p 5001:5001 dhananjayakafle/app-segregation-backend:latest
```

## 4. Set Up the Frontend

### Build the Frontend Docker Image:
```bash
cd ../frontend
docker build -t dhananjayakafle/app-segregation-frontend:latest .
```

### Run the Frontend Locally (Optional):
```bash
docker run -d --name frontend-container -p 5000:5000 dhananjayakafle/app-segregation-frontend:latest
```

## 5. Deploy to Kubernetes

### Set Up AKS Cluster:
- Create an AKS cluster using the Azure CLI.
- Configure `kubectl` to connect to your cluster.

### Apply Kubernetes Manifests:
```bash
kubectl apply -f k3s/
```

### Verify Deployment:
Check the status of the pods and services:
```bash
kubectl get pods
kubectl get services
```

## 6. Access the Application

### Get the External IP:
Find the external IP of the frontend service:
```bash
kubectl get svc frontend-service
```

### Open in Browser:
Open the external IP in your browser to access the application.

## CI/CD Pipeline
The project includes a GitHub Actions workflow (`ci-cd.yml`) to automate the build and deployment process. The pipeline:

- Builds Docker images for the frontend, backend, and database.
- Pushes the images to Docker Hub.
- Deploys the application to AKS.

## Technologies Used

- **Frontend:** HTML, CSS, Flask (for templating)
- **Backend:** Flask (Python)
- **Database:** MySQL
- **Containerization:** Docker
- **Orchestration:** Kubernetes (AKS)
- **CI/CD:** GitHub Actions
- **Monitoring Cluster:** Azure Monitor with Prometheus and Grafana

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeatureName
   ```
5. Open a pull request.

# **Grafana Queries**
## Overview
We use Azure Kubernetes Service (AKS) for container orchestration and Azure Monitor to collect logs and metrics. Prometheus scrapes metrics from our applications in AKS, and Grafana queries Prometheus to visualize the data through dashboards.
This document provides details on the PromQL queries used in this dashboard to monitor CPU, memory, disk, network, and system load.

---
## 1. CPU Usage Query

```bash
100 - (avg by(instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)
```
This calculates CPU usage by subtracting idle time from 100%.

## 2. Memory Usage Query

```bash
(node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes * 100
```
This shows the percentage of memory used.

## 3. Disk Usage Query

```bash
100 - (node_filesystem_avail_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"} * 100)
```
This calculates the disk usage percentage.

## 4. Network Traffic Query

```bash
rate(node_network_receive_bytes_total[5m])
```
This measures the incoming network traffic rate over the last 5 minutes.

## 5. Load Average Query

```bash
node_load1
```
This shows the 1-minute load average of the node.

## Grafana URL
   ```bash
   https://snapshots.raintank.io/dashboard/snapshot/FSNMBhkU1aa9iEojGEvDFB1EwRhlcUfb
   ```

## Acknowledgments
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Azure AKS Documentation](https://docs.microsoft.com/en-us/azure/aks/)

