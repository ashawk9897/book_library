# Library Management System (book_library)
A small neighborhood library wants a new service to manage its members, books, and borrowing/ruturn operations.

## Architecture
```
┌────────────┐      HTTP/JSON     ┌──────────────┐      gRPC      ┌─────────────────┐
│  React UI  │ ─────────────────▶ │ API Gateway  │ ────────────▶ │ Library Service │
│ (Frontend) │                    │  (FastAPI)   │                │ (gRPC + DB)     │
└────────────┘                    └──────────────┘                └─────────────────┘
                                                                   │ PostgreSQL │
                                                                   └────────────┘

```


##  Services

### 1 Library Service (gRPC)


**Purpose:**  
Handles all core library operations and database access.

There are some auto generated grpc code, for grpc service 
If needed, Generate or compile the .proto files using 
```python -m grpc_tools.protoc -I proto --python_out=library_service/app/grpc_gen    --grpc_python_out=library_service/app/grpc_gen proto/library.proto```


**Responsibilities:**
- Manage books
- Create members
- Borrow books
- Return books
- Track borrowing history

### 2 API Gateway (FastAPI)


**Purpose:**  
Acts as the single entry point for frontend clients.

There are some auto generated grpc code, for grpc service 
If needed, Generate or compile the .proto files using 
```python -m grpc_tools.protoc -I proto --python_out=api_gateway/app/grpc_gen    --grpc_python_out=api_gateway/app/grpc_gen proto/library.proto```


**Responsibilities:**
- Expose REST APIs
- Translate REST → gRPC
- Request validation
- Response mapping
- CORS handling

**Example APIs:**
 
 
 Docs for Apis can be accesed using http://localhost:8000/docs

GET    /books
POST   /books
POST   /members
GET    /borrowed?member_id=1
POST   /borrowed
PUT    /borrowed


### 3 Frontend (REact)


**Purpose:**  
Provides a user-friendly interface to interact with the library system.

**Responsibilities:**
- Book management
- Borrow books (searchable dropdown)
- RReturn borrowed books


## Docker Setup
All services are managed using Docker Compose.

### Services Defined


- db
- library-service
- api-gateway
- frontend
  
Once the code is cloned from github
`docker-compose up --build`
`docker-compose up -d`

Frontend - `http://localhost:5173`



