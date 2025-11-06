# Aeronave GraphQL API

A GraphQL API for managing aircraft (aeronave) data with MongoDB, built with Apollo Server Express and Docker.

## 🚀 Features

- **GraphQL API** with Apollo Server Express
- **MongoDB** database with authentication
- **GraphQL Playground** for interactive API testing
- **Mongo Express** web-based database management
- **Docker Compose** for easy deployment
- **Complete CRUD operations** for aircraft data
- **Error handling** with async/await patterns
- **Health checks** for service dependencies

## 📋 Prerequisites

- Docker (version 20.10+)
- Docker Compose (version 1.29+)
- Git

## 🏗️ Project Structure

```
aeronave/
├── backend/
│   ├── src/
│   │   ├── index.js              # Main server file with Express & Apollo
│   │   ├── models/
│   │   │   └── Aeronave.js       # Mongoose model for aircraft
│   │   ├── resolvers/
│   │   │   ├── index.js          # Resolver aggregator
│   │   │   └── AeronaveResolver.js # CRUD resolvers
│   │   └── typeDefs/
│   │       ├── index.js          # Schema aggregator
│   │       ├── types.js          # GraphQL types
│   │       ├── query.js          # Query definitions
│   │       └── mutation.js       # Mutation definitions
│   ├── .env                      # Environment variables
│   └── package.json              # Node.js dependencies
├── docker-compose.yml            # Docker services configuration
├── Dockerfile.yml                # Backend container definition
├── MUTATION_EXAMPLES.md          # Detailed mutation examples
└── README.md                     # This file
```

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd aeronave
```

### 2. Start Services with Docker Compose

```bash
# Build and start all services
docker-compose up -d --build

# Check if services are running
docker-compose ps

# View logs
docker-compose logs -f
```

### 3. Verify Services

All services should be running:

- ✅ MongoDB (mongo)
- ✅ Mongo Express (mongo_express)
- ✅ Backend API (app)

## 🌐 Access Points

| Service                | URL                              | Credentials |
| ---------------------- | -------------------------------- | ----------- |
| **GraphQL Playground** | http://localhost:4000/playground | -           |
| **GraphQL API**        | http://localhost:4000/graphql    | -           |
| **Mongo Express**      | http://localhost:8081            | admin/admin |
| **MongoDB**            | mongodb://localhost:27017        | mongo/mongo |

## 📊 GraphQL Schema

### Types

```graphql
type Aeronave {
  id: ID!
  id_ocorrencia_a: String
  matricula: String
  operador_categoria: String
  tipo_veiculo: String
  fabricante: String
  modelo: String
  motor_tipo: String
  motor_quantidade: String
  assentos: String
  ano_fabricacao: String
  pais_fabricante: String
  registro_segmento: String
  voo_origem: String
  voo_destino: String
  fase_operacao: String
}
```

### Queries

```graphql
type Query {
  aeronaves: [Aeronave]
  aeronave(id: String): Aeronave
}
```

### Mutations

```graphql
type Mutation {
  createAeronave(aeronave: AeronaveInput): Aeronave
  updateAeronave(id: String, aeronave: AeronaveInput): Aeronave
  deleteAeronave(id: String): Aeronave
}
```

## 🎮 Quick Start Examples

### Using GraphQL Playground

1. Open http://localhost:4000/playground
2. Try these queries:

#### Query All Aircraft

```graphql
query {
  aeronaves {
    id
    matricula
    tipo_veiculo
    fabricante
    modelo
  }
}
```

#### Create New Aircraft

```graphql
mutation {
  createAeronave(
    aeronave: {
      matricula: "PP-XYZ"
      tipo_veiculo: "AVIAO"
      fabricante: "EMBRAER"
      modelo: "E190"
      assentos: "100"
      ano_fabricacao: "2015"
      pais_fabricante: "BRASIL"
    }
  ) {
    id
    matricula
    fabricante
    modelo
  }
}
```

#### Update Aircraft

```graphql
mutation {
  updateAeronave(
    id: "YOUR_AIRCRAFT_ID"
    aeronave: { assentos: "106", modelo: "E190-E2" }
  ) {
    id
    matricula
    modelo
    assentos
  }
}
```

#### Delete Aircraft

```graphql
mutation {
  deleteAeronave(id: "YOUR_AIRCRAFT_ID") {
    id
    matricula
  }
}
```

### Using cURL

```bash
# Create aircraft
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"mutation { createAeronave(aeronave: {matricula: \"TEST123\", tipo_veiculo: \"AVIAO\", fabricante: \"BOEING\"}) { id matricula fabricante } }"}'

# Query all aircraft
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ aeronaves { id matricula tipo_veiculo fabricante } }"}'
```

## 🐳 Docker Commands

### Service Management

```bash
# Start all services
docker-compose up -d

# Start with rebuild
docker-compose up -d --build

# Stop all services
docker-compose down

# Stop and remove volumes (⚠️ deletes data)
docker-compose down -v

# Restart a specific service
docker-compose restart app

# View logs (all services)
docker-compose logs -f

# View logs (specific service)
docker logs app -f
docker logs mongo -f
docker logs mongo_express -f
```

### Database Access

```bash
# Connect to MongoDB using mongosh
docker exec -it mongo mongosh -u mongo -p mongo --authenticationDatabase admin

# Inside mongosh:
use aero
db.aeronaves.find().pretty()
db.aeronaves.countDocuments()
exit
```

## 🔧 Configuration

### Environment Variables

Located in `backend/.env`:

```properties
DB_HOST=mongo:27017
DB_USER=mongo
DB_PASS=mongo
DB_NAME=aero
```

### MongoDB Configuration

- **Database**: `aero`
- **Collection**: `aeronaves`
- **Authentication**: Enabled (authSource=admin)
- **Credentials**: mongo/mongo

### Docker Compose Services

#### MongoDB

- **Image**: mongo:7.0
- **Port**: 27017
- **Volume**: mongo_data (persistent)
- **Health Check**: Enabled

#### Mongo Express

- **Image**: mongo-express:latest
- **Port**: 8081
- **Depends on**: MongoDB (with health check)

#### Backend App

- **Build**: From Dockerfile.yml
- **Port**: 4000
- **Depends on**: MongoDB (with health check)
- **Node Version**: 20-trixie-slim

## 📝 API Documentation

For detailed mutation examples and advanced usage, see [MUTATION_EXAMPLES.md](MUTATION_EXAMPLES.md).

Topics covered:

- ✅ Complete CRUD operations
- ✅ Using GraphQL Playground
- ✅ cURL examples
- ✅ JavaScript/Node.js examples
- ✅ Error handling
- ✅ Batch operations
- ✅ Troubleshooting

## 🧪 Testing

### Test the API

```bash
# Health check
curl http://localhost:4000/graphql

# Create test data
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"mutation { createAeronave(aeronave: {matricula: \"TEST\", tipo_veiculo: \"AVIAO\"}) { id matricula } }"}'

# Verify data
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ aeronaves { id matricula } }"}'
```

### View Database

- **Mongo Express UI**: http://localhost:8081
- Navigate to: `aero` → `aeronaves` collection

## 🐛 Troubleshooting

### Service Won't Start

```bash
# Check service status
docker-compose ps

# View logs for errors
docker-compose logs app
docker-compose logs mongo

# Remove old containers and start fresh
docker-compose down -v
docker-compose up -d --build
```

### MongoDB Connection Failed

**Error**: `MongoServerError: Authentication failed`

**Solution**: Ensure the connection string includes `authSource=admin`

```javascript
// In backend/src/index.js
const dbUri = `mongodb://${db.user}:${db.pass}@${db.host}/${db.name}?authSource=admin`;
```

### Network Error in GraphQL Playground

**Solution**: Use the correct URLs

- ✅ GraphQL Playground: http://localhost:4000/playground
- ✅ GraphQL API: http://localhost:4000/graphql

### Port Already in Use

```bash
# Find process using port 4000
sudo lsof -i :4000

# Stop conflicting services
docker-compose down

# Or change port in docker-compose.yml
ports:
  - "4001:4000"  # Maps host port 4001 to container port 4000
```

## 🔐 Security Notes

⚠️ **Development Configuration**

This setup is configured for **development only**:

- Default credentials (mongo/mongo, admin/admin)
- CORS enabled for all origins
- No CSRF protection
- MongoDB exposed on host

**For Production:**

- Change all default passwords
- Use environment variables for secrets
- Enable CSRF protection
- Configure CORS properly
- Use reverse proxy (nginx)
- Enable SSL/TLS
- Don't expose MongoDB port
- Use Docker secrets

## 📚 Technologies Used

- **Node.js** 20 - JavaScript runtime
- **Apollo Server Express** 3.13.0 - GraphQL server
- **Express** 4.18.2 - Web framework
- **GraphQL** 16.8.1 - Query language
- **Mongoose** 5.9.20 - MongoDB ODM
- **MongoDB** 7.0 - NoSQL database
- **Mongo Express** - Database management UI
- **Docker** - Containerization
- **GraphQL Playground** - API testing UI

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
