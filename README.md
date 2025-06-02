# UG Sales - Full Stack Sales Representative Management System

[![.NET](https://img.shields.io/badge/.NET%208-512bd4?style=flat&logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/) [![React](https://img.shields.io/badge/React%2018-61dafb?style=flat&logo=react&logoColor=black)](https://reactjs.org/) [![SQL Server](https://img.shields.io/badge/SQL%20Server-CC2927?style=flat&logo=microsoftsqlserver&logoColor=white)](https://www.microsoft.com/en-us/sql-server)

## 📦 Repository
**GitHub:** [UGSales](https://github.com/anandabhi1105/UGSales.git)

## 🔧 Tech Stack
- **Frontend**: React 18, React Router, React Hook Form, AG Grid, Tailwind CSS (optional)
- **Backend**: .NET 8 Web API (MVC), EF Core, FluentValidation, AutoMapper, Serilog
- **Database**: SQL Server

---

## 🚀 Features
- Full CRUD for **Sales Representatives** and **Product Sales**
- Filterable **Sales Dashboard** (Product, Region, Platform)
- Authentication with **Register/Login** UI and API
- Role-based access possible (via token extensions)
- Swagger API documentation
- Logging with **Serilog**

---

## 📁 Project Structure
```
UGSales/
├── SalesRepApi/           # ASP.NET Core 6 Web API backend
├── client-app/            # React 18 frontend
└── README.md
```

---

## 🛠 Backend Setup
```bash
cd SalesRepApi
# Install dependencies
 dotnet restore

# Run EF migrations (ensure SQL Server is running)
dotnet ef migrations add InitialCreate
dotnet ef database update

# Run the API
 dotnet run
```

Swagger UI: `https://localhost:5285/swagger`

---

## 💻 Frontend Setup
```bash
cd clientapp
npm install
npm start
```

Runs at: `http://localhost:3000`

---

## 🧪 API Endpoints
| Method | Endpoint                 | Description                       |
|--------|--------------------------|-----------------------------------|
| GET    | `/api/salesreps`         | List all sales reps               |
| GET    | `/api/salesreps/{id}`    | Get a sales rep by ID             |
| POST   | `/api/salesreps`         | Create a new sales rep            |
| PUT    | `/api/salesreps/{id}`    | Update a sales rep                |
| DELETE | `/api/salesreps/{id}`    | Delete a sales rep                |
| GET    | `/api/sales`             | Get filtered sales data           |
| POST   | `/api/auth/register`     | Register a new user               |
| POST   | `/api/auth/login`        | Authenticate and login a user     |
---

## 🛡 Security Notes
- Use HTTPS in production
- Store tokens in `HttpOnly` cookies for security
- Use app secrets or environment variables for config

---

## 📚 Project Architecture, Design Decisions, Testing & Deployment

### 🧱 Architecture Overview

**UGSales** uses a layered architecture with a clear separation of concerns:

#### Frontend (React 18)
- Functional components + routing
- Auth context and protected routes
- Axios interceptor for global token management

#### Backend (ASP.NET Core)
- Controllers → Services → Repositories pattern
- AutoMapper for DTO-model conversion
- FluentValidation for input validation
- JWT for authentication with roles (`Admin`, `User`)
- Swagger + Serilog integration

#### Database
- SQL Server
- EF Core with migrations
- Foreign key between `ProductSales` and `SalesReps`
- Indexed columns for efficient filtering

### ✅ Design Rationale

| Concern         | Design Choice                                        |
|----------------|-------------------------------------------------------|
| Maintainability | Service + Repository Pattern                         |
| Security        | JWT + Role-based `[Authorize]` attributes            |
| Modularity      | DTOs, layered services, interceptors, React context  |
| Performance     | SQL indexing, async calls, minimal API overhead      |
| Extensibility   | Frontend components and API are designed for scale   |

### 🧪 Testing Methodologies

| Type               | Approach                                                 |
|--------------------|----------------------------------------------------------|
| 🔌 Integration API | Tested via Postman and Swagger for login, CRUD flows    |
| 🎛 Frontend Logic  | Manual validation via component interaction and routing  |
| 🔑 JWT Handling    | Tokens verified using [jwt.io](https://jwt.io)          |
| 🚥 Role Access     | Protected routes tested using both Admin and User roles |

### 🚀 Deployment

#### Local
```bash
cd SalesRepApi
dotnet ef database update
dotnet run

cd clientapp
npm install
npm start

---

## 📬 Contact
Maintained by [@anandabhi1105](https://github.com/anandabhi1105)

Feel free to open issues, suggest features, or contribute!
