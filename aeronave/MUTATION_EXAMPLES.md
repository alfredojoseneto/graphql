# GraphQL Mutation Examples

## How to Insert Data into MongoDB using GraphQL Mutations

## 🚀 Quick Start

### Build the project

```bash
$ cd aeronave
$ docker compose up -d --build
```

### Access GraphQL Playground

Open your browser and navigate to:

- ~~**GraphQL Playground**: http://localhost:4000/playground~~
- **GraphQL API Endpoint**: http://localhost:4000/graphql
- **Mongo Express** (Database UI): http://localhost:8081

### Server Configuration

- ✅ MongoDB with authentication (`authSource=admin`)
- ✅ Express-based Apollo Server
- ✅ GraphQL Playground integrated
- ✅ CORS enabled for development
- ✅ Error handling with async/await
- ✅ Database connection validation

---

## 1. Create Aeronave (Insert New Record)

### Using GraphQL Playground (Recommended)

Open http://localhost:4000/playground and paste this mutation:

```graphql
mutation CreateAeronave {
  createAeronave(
    aeronave: {
      id_ocorrencia_a: "39115"
      matricula: "PTNQX"
      operador_categoria: "PARTICULAR"
      tipo_veiculo: "AVIAO"
      fabricante: "NEIVA INDUSTRIA AERONAUTICA"
      modelo: "EMB-711A"
      motor_tipo: "PISTAO"
      motor_quantidade: "MONOMOTOR"
      assentos: "4"
      ano_fabricacao: "1979"
      pais_fabricante: "BRASIL"
      registro_segmento: "PARTICULAR"
      voo_origem: "BRIGADEIRO ARARIPE MACEDO"
      voo_destino: "CORRENTINA"
      fase_operacao: "DECOLAGEM"
    }
  ) {
    id
    matricula
    fabricante
    modelo
    tipo_veiculo
  }
}
```

### Using cURL (Command Line)

```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"mutation { createAeronave(aeronave: {matricula: \"TEST123\", tipo_veiculo: \"AVIAO\", fabricante: \"BOEING\"}) { id matricula fabricante } }"}'
```

### Using cURL with Variables:

```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation CreateAeronave($aeronave: AeronaveInput) { createAeronave(aeronave: $aeronave) { id matricula fabricante modelo } }",
    "variables": {
      "aeronave": {
        "id_ocorrencia_a": "39115",
        "matricula": "PTNQX",
        "operador_categoria": "PARTICULAR",
        "tipo_veiculo": "AVIAO",
        "fabricante": "NEIVA INDUSTRIA AERONAUTICA",
        "modelo": "EMB-711A",
        "motor_tipo": "PISTAO",
        "motor_quantidade": "MONOMOTOR",
        "assentos": "4",
        "ano_fabricacao": "1979",
        "pais_fabricante": "BRASIL",
        "registro_segmento": "PARTICULAR",
        "voo_origem": "BRIGADEIRO ARARIPE MACEDO",
        "voo_destino": "CORRENTINA",
        "fase_operacao": "DECOLAGEM"
      }
    }
  }'
```

#### Using JavaScript/Node.js:

```javascript
const createAeronave = async (aeronaveData) => {
  const response = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        mutation CreateAeronave($aeronave: AeronaveInput) {
          createAeronave(aeronave: $aeronave) {
            id
            matricula
            fabricante
            modelo
          }
        }
      `,
      variables: {
        aeronave: aeronaveData,
      },
    }),
  });

  const result = await response.json();
  return result.data.createAeronave;
};

// Usage
const newAeronave = await createAeronave({
  id_ocorrencia_a: "39115",
  matricula: "PTNQX",
  tipo_veiculo: "AVIAO",
  fabricante: "NEIVA INDUSTRIA AERONAUTICA",
  modelo: "EMB-711A",
});
```

---

## 2. Update Aeronave (Modify Existing Record)

### GraphQL Mutation:

```graphql
mutation UpdateAeronave {
  updateAeronave(
    id: "507f1f77bcf86cd799439011"
    aeronave: {
      matricula: "PTNQX-UPDATED"
      operador_categoria: "COMERCIAL"
      assentos: "6"
    }
  ) {
    id
    matricula
    operador_categoria
    assentos
  }
}
```

### Using Variables:

```graphql
mutation UpdateAeronave($id: String!, $aeronave: AeronaveInput!) {
  updateAeronave(id: $id, aeronave: $aeronave) {
    id
    matricula
    modelo
    fabricante
  }
}
```

Variables Panel in Playground:

```json
{
  "id": "690bf10f293f68001239e63f",
  "aeronave": {
    "matricula": "PTNQX-UPDATED",
    "assentos": "6"
  }
}
```

---

## 3. Delete Aeronave (Remove Record)

### GraphQL Mutation:

```graphql
mutation DeleteAeronave {
  deleteAeronave(id: "507f1f77bcf86cd799439011") {
    id
    matricula
    modelo
  }
}
```

### Using Variables:

```graphql
mutation DeleteAeronave($id: String!) {
  deleteAeronave(id: $id) {
    id
    matricula
  }
}
```

Variables Panel in Playground:

```json
{
  "id": "690bf10f293f68001239e63f"
}
```

---

## 🧪 Testing Mutations

### Option 1: GraphQL Playground (Recommended ⭐)

1. **Start your server**: `docker-compose up -d`
2. **Open browser**: http://localhost:4000/playground
3. **Paste the mutation** in the left panel
4. **Add variables** in the "QUERY VARIABLES" panel (bottom left)
5. **Click the Play button** ▶️
6. **View results** in the right panel

**Benefits**:

- ✅ Auto-completion for fields
- ✅ Schema documentation built-in
- ✅ Syntax highlighting
- ✅ Query history
- ✅ Easy variable management

### Option 2: Using cURL (Command Line)

```bash
# Create new aeronave
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"mutation { createAeronave(aeronave: {matricula: \"TEST123\", tipo_veiculo: \"AVIAO\", fabricante: \"BOEING\"}) { id matricula fabricante } }"}'

# Query all aeronaves to verify
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ aeronaves { id matricula tipo_veiculo fabricante } }"}'
```

### Option 3: Using Postman or Insomnia

1. **Create new POST request** to `http://localhost:4000/graphql`
2. **Set header**: `Content-Type: application/json`
3. **In body** (raw JSON):

```json
{
  "query": "mutation { createAeronave(aeronave: {matricula: \"TEST123\"}) { id matricula } }"
}
```

## Batch Insert Multiple Records

If you need to insert multiple records, you can call the mutation multiple times or create a batch mutation:

---

## 📦 Batch Insert Multiple Records

If you need to insert multiple records, you can create a batch mutation.

### Add to `typeDefs/mutation.js`:

```javascript
type Mutation {
   createAeronave(aeronave: AeronaveInput): Aeronave
   createMultipleAeronaves(aeronaves: [AeronaveInput]): [Aeronave]
   updateAeronave(id: String, aeronave: AeronaveInput): Aeronave
   deleteAeronave(id: String): Aeronave
}
```

### Add to `resolvers/AeronaveResolver.js`:

```javascript
async createMultipleAeronaves(_, { aeronaves }) {
   try {
      const savedAeronaves = await Aeronave.insertMany(aeronaves);
      console.log(`${savedAeronaves.length} aeronaves created`);
      return savedAeronaves;
   } catch (error) {
      console.error('Error creating multiple aeronaves:', error);
      throw new Error(`Failed to create aeronaves: ${error.message}`);
   }
}
```

### Usage in Playground:

```graphql
mutation CreateMultiple {
  createMultipleAeronaves(
    aeronaves: [
      {
        matricula: "ABC123"
        tipo_veiculo: "AVIAO"
        fabricante: "BOEING"
        modelo: "737"
      }
      {
        matricula: "DEF456"
        tipo_veiculo: "HELICOPTERO"
        fabricante: "AIRBUS"
        modelo: "H125"
      }
      {
        matricula: "GHI789"
        tipo_veiculo: "AVIAO"
        fabricante: "EMBRAER"
        modelo: "E195"
      }
    ]
  ) {
    id
    matricula
    tipo_veiculo
    fabricante
    modelo
  }
}
```

---

## ⚠️ Error Handling & Debugging

### Improved Resolver Features:

- ✅ **Async/await** for better error handling
- ✅ **Try-catch blocks** to catch and handle errors gracefully
- ✅ **Descriptive error messages** for easier debugging
- ✅ **Console logging** for server-side debugging
- ✅ **Validation checks** (e.g., record not found)
- ✅ **MongoDB authentication** with `authSource=admin`

### Common Errors & Solutions:

#### 1. Network Error in Playground

**Solution**: Use the correct URL

- ✅ GraphQL Playground: http://localhost:4000/playground
- ✅ GraphQL API: http://localhost:4000/graphql

#### 2. MongoDB Connection Failed

**Error**: `MongoServerError: Authentication failed`
**Solution**: Ensure connection string includes `authSource=admin`:

```javascript
const dbUri = `mongodb://${db.user}:${db.pass}@${db.host}/${db.name}?authSource=admin`;
```

#### 3. Record Not Found

**Error**: `Aeronave with id XXX not found`
**Solution**: Verify the ID exists by querying first:

```graphql
query {
  aeronaves {
    id
    matricula
  }
}
```

### View Server Logs:

```bash
# View all logs
docker logs app -f

# View last 50 lines
docker logs app --tail 50
```

---

## 🔍 Verify Data in MongoDB

### Option 1: Using Mongo Express (Web UI)

1. **Open**: http://localhost:8081
2. **Login**:
   - Username: `admin`
   - Password: `admin`
3. **Navigate**: `aero` database → `aeronaves` collection
4. **View/Edit**: Your data with a user-friendly interface

### Option 2: Using mongosh (Command Line)

```bash
# Connect to MongoDB container
docker exec -it mongo mongosh -u mongo -p mongo --authenticationDatabase admin

# Switch to aero database
use aero

# View all aeronaves
db.aeronaves.find().pretty()

# Count documents
db.aeronaves.countDocuments()

# Find specific aeronave
db.aeronaves.findOne({ matricula: "TEST123" })

# Exit mongosh
exit
```

---

## 📚 Complete Example Workflow

### 1. Start the Services

```bash
cd /home/engdataops/projects/graphql/aeronave
docker-compose up -d
```

### 2. Open GraphQL Playground

Navigate to: http://localhost:4000/playground

### 3. Create an Aeronave

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

### 4. Query All Aeronaves

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

### 5. Update the Aeronave

```graphql
mutation {
  updateAeronave(
    id: "YOUR_ID_FROM_PREVIOUS_QUERY"
    aeronave: { assentos: "106", modelo: "E190-E2" }
  ) {
    id
    matricula
    modelo
    assentos
  }
}
```

### 6. Verify in Mongo Express

Open http://localhost:8081 and check the `aeronaves` collection

---

## 🎯 Quick Reference

### Service URLs

| Service            | URL                              | Credentials |
| ------------------ | -------------------------------- | ----------- |
| GraphQL Playground | http://localhost:4000/playground | -           |
| GraphQL API        | http://localhost:4000/graphql    | -           |
| Mongo Express      | http://localhost:8081            | admin/admin |
| MongoDB            | mongodb://localhost:27017        | mongo/mongo |

### Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# View specific service logs
docker logs app -f

# Restart a service
docker-compose restart app

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Rebuild and restart
docker-compose up -d --build
```

### Useful GraphQL Queries

```graphql
# Get all aeronaves
query {
  aeronaves {
    id
    matricula
    fabricante
  }
}

# Get specific aeronave by ID
query {
  aeronave(id: "YOUR_ID") {
    id
    matricula
    fabricante
    modelo
  }
}

# Create aeronave
mutation {
  createAeronave(aeronave: { matricula: "TEST" }) {
    id
    matricula
  }
}

# Update aeronave
mutation {
  updateAeronave(id: "ID", aeronave: { matricula: "NEW" }) {
    id
  }
}

# Delete aeronave
mutation {
  deleteAeronave(id: "ID") {
    id
    matricula
  }
}
```

---

## 🚀 What's Been Improved

### Backend Architecture

- ✅ Switched from `apollo-server` to `apollo-server-express`
- ✅ Added Express.js for middleware support
- ✅ Integrated GraphQL Playground at `/playground`
- ✅ Proper MongoDB authentication with `authSource=admin`
- ✅ Enhanced error handling with async/await
- ✅ Better logging for debugging

### Docker Setup

- ✅ MongoDB 7.0 with persistent volumes
- ✅ Mongo Express for database management
- ✅ Health checks for service dependencies
- ✅ Proper networking between containers
- ✅ Environment variable configuration

### Developer Experience

- ✅ GraphQL Playground with auto-completion
- ✅ Clear error messages
- ✅ Comprehensive documentation
- ✅ Multiple testing options (Playground, cURL, Postman)
- ✅ Easy service management with Docker Compose

---

**Happy coding! 🎉**
