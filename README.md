# Flask MySQL Kubernetes Project

This project demonstrates a simple web application built with **Flask** (Python) and **MySQL**, deployed on **Azure Kubernetes Service (AKS)**. The application allows users to submit their first and last names through a web form, which are then stored in a MySQL database.

---


## **Features**

1. **Frontend:**
   - A simple web form to collect user input (first name and last name).
   - Styled with CSS for a clean and modern look.

2. **Backend:**
   - Flask API to handle form submissions.
   - Connects to a MySQL database to store user data.

3. **Database:**
   - MySQL database to store user information.
   - Initialized with a `users` table using `init.sql`.

4. **Kubernetes Deployment:**
   - Deployed on Azure Kubernetes Service (AKS).
   - Includes deployments and services for the frontend, backend, and database.

5. **CI/CD Pipeline:**
   - Automated build and deployment using GitHub Actions.
   - Docker images are built and pushed to Docker Hub.
   - Application is deployed to AKS.

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


## Acknowledgments
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Azure AKS Documentation](https://docs.microsoft.com/en-us/azure/aks/)
