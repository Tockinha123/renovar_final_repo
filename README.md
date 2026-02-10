# Re:Novar - Sistema de Monitoramento e Prevenção da Ludopatia

## 📋 Sobre o Projeto

O **Re:Novar** é uma plataforma de saúde digital focada no monitoramento e prevenção da ludopatia (vício em jogos de azar e apostas). O sistema utiliza dados comportamentais para identificar riscos, gerar alertas e apoiar o autocuidado do usuário através de ferramentas práticas e educacionais.

### 🎯 Principais Funcionalidades

- **Dashboard Personalizado**: Visualização de métricas como dias sem apostar, economia acumulada, tempo salvo e nível de risco
- **Sistema de Score com 6 Pilares**: Cálculo de pontuação baseado em abstinência, streak, situação financeira, fissura, engajamento e prevenção
- **Avaliações Diárias e Mensais**: Check-ins para acompanhamento do progresso e identificação de padrões
- **Registro de Apostas**: Funcionalidade para registrar recaídas de forma consciente
- **Recursos Educacionais**: Biblioteca de vídeos sobre vícios, mitos, efeitos na saúde e estratégias de recuperação
- **Emergência**: Acesso rápido a ferramentas de intervenção como meditação guiada e contato com CVV
- **Relatórios Mensais**: Geração automática de relatórios em PDF para compartilhamento com profissionais de saúde
- **Mapa de Centros de Tratamento**: Localização de profissionais especializados

---

## 🏗️ Arquitetura

| Componente | Tecnologia | Descrição |
|------------|------------|-----------|
| **Frontend** | React + TypeScript + Vite | Interface web responsiva |
| **Backend** | Java 21 + Spring Boot 4 | API REST com autenticação JWT |
| **Banco de Dados** | PostgreSQL 18 | Armazenamento de dados |
| **Storage** | MinIO (S3-compatible) | Armazenamento de relatórios PDF |
| **Proxy** | Nginx | Roteamento e load balancing |

---

## 🛠️ Tecnologias Utilizadas

### Frontend (renovarWeb)

- **React 18** com **TypeScript**
- **Vite** como bundler
- **TanStack Router** para roteamento
- **TanStack Query** para gerenciamento de estado servidor
- **Tailwind CSS** para estilização
- **React Hook Form** + **Zod** para formulários e validação
- **Recharts** para gráficos
- **Leaflet** para mapas interativos

### Backend (renovarAPI)

- **Java 21** com **Spring Boot 4.0.2**
- **Spring Security** com autenticação **JWT**
- **Spring Data JPA** + **Hibernate**
- **Flyway** para migrações de banco
- **MinIO Client** para storage S3
- **Flying Saucer** para geração de PDFs
- **Springdoc OpenAPI** para documentação da API

---

## 🚀 Como Executar

### Pré-requisitos

- Docker e Docker Compose instalados
- Git

### Configuração

1. Clone o repositório:

```bash
git clone <repository-url>
cd Renovar_Final
```

2. Configure as variáveis de ambiente copiando o arquivo de exemplo:

```bash
cp .env.example .env
```

3. Edite o arquivo `.env` com suas configurações:

```env
# Database
DB_NAME=postgres
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_PORT=5432

# JWT
JWT_SECRET=sua_chave_secreta_jwt
JWT_EXPIRATION_SEC=7200

# MinIO
MINIO_USER=seu_usuario_minio
MINIO_PASSWORD=sua_senha_minio
MINIO_BUCKET_REPORT=renovar-app-reports

# Frontend
VITE_API_BASE_URL=http://localhost/api/v1/
```

### Execução com Docker

```bash
docker compose up -d --build
```

A aplicação estará disponível em:

| Serviço | URL |
|---------|-----|
| **Frontend** | http://localhost |
| **API** | http://localhost/api/v1 |
| **Documentação da API** | http://localhost/api/scalar/docs |
| **MinIO Console** | http://localhost:9001 |

### Execução Local (Desenvolvimento)

#### Backend

```bash
cd renovarAPI
./mvnw spring-boot:run
```

#### Frontend

```bash
cd renovarWeb
npm install
npm run dev
```

---

## 📁 Estrutura do Projeto

```
.
├── compose.yaml              # Configuração Docker Compose
├── nginx.conf                # Configuração do proxy Nginx
├── .env.example              # Exemplo de variáveis de ambiente
│
├── renovarAPI/               # Backend Spring Boot
│   ├── src/main/java/com/tocka/renovarAPI/
│   │   ├── assessment/       # Avaliações diárias/mensais
│   │   ├── bets/             # Registro de apostas
│   │   ├── infra/            # Configurações e segurança
│   │   ├── metrics/          # Métricas do paciente
│   │   ├── patient/          # Dados do paciente
│   │   ├── report/           # Geração de relatórios PDF
│   │   ├── score/            # Cálculo dos 6 pilares
│   │   └── user/             # Autenticação e usuários
│   └── src/main/resources/
│       └── application.yaml  # Configurações da aplicação
│
└── renovarWeb/               # Frontend React
    └── src/
        ├── app/              # Rotas (TanStack Router)
        ├── components/       # Componentes reutilizáveis
        ├── context/          # Contextos React
        ├── hooks/            # Custom hooks
        ├── modals/           # Componentes de modal
        ├── pages/            # Páginas da aplicação
        ├── services/         # Serviços HTTP
        └── utils/            # Utilitários
```

---

## 🔐 Autenticação

O sistema utiliza autenticação baseada em **JWT (JSON Web Token)**:

1. O usuário se registra ou faz login através dos endpoints de autenticação
2. Um token JWT é retornado e armazenado em cookie seguro
3. Todas as requisições subsequentes incluem o token no header `Authorization: Bearer {token}`
4. Tokens expiram conforme configurado em `JWT_EXPIRATION_SEC`

---

## 📊 Sistema de Score

O score é calculado através de **6 pilares** (máximo 1000 pontos):

| Pilar | Peso | Descrição |
|-------|------|-----------|
| P1 - Abstinência | 290 | Dias limpos nos últimos 30 dias |
| P2 - Streak | 240 | Sequência ininterrupta sem apostar |
| P3 - Financeiro | 210 | Gravidade/ausência de apostas |
| P4 - Fissura | 120 | Nível de vontade de apostar |
| P5 - Engajamento | 80 | Check-ins nos últimos 7 dias |
| P6 - Prevenção | 60 | Reservado para funcionalidades futuras |

### Níveis de Risco

| Score | Nível |
|-------|-------|
| ≥ 701 | 🟢 Excelente |
| 501–700 | 🟢 Bom |
| 301–500 | 🟡 Regular |
| ≤ 300 | 🔴 Alto Risco |

---

## 📱 Principais Telas

| Rota | Descrição |
|------|-----------|
| `/login` | Autenticação de usuários |
| `/register` | Cadastro de novos pacientes |
| `/dashboard` | Painel principal com métricas |
| `/dashboard/calendar` | Avaliações diárias e mensais |
| `/dashboard/documents` | Recursos educacionais |
| `/dashboard/analytics` | Análises e relatórios |

---

## 🆘 Recursos de Emergência

O sistema oferece acesso rápido a recursos de apoio:

- **CVV (Centro de Valorização da Vida)**: Telefone 188 (24h) e chat online
- **Meditação Guiada**: Vídeos para momentos de crise
- **Informações sobre Efeitos Colaterais**: Conscientização sobre os impactos do vício

---

## 📄 Licença

Este projeto foi desenvolvido como trabalho acadêmico/finalidade educacional.

