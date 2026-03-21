# Vaultr

Vaultr is a secure, modern file-sharing and storage platform designed for simplicity and speed. It allows users to securely upload files, manage access with expiration dates and download limits, and monitor system health through integrated observability tools.

## 🚀 Key Features

- **Secure File Sharing**: Upload files with customizable expiration times and maximum download counts.
- **Unified Dashboard**: Manage your shared links and track download statistics in real-time.
- **Seamless Authentication**: Fast and secure login powered by Better Auth and GitHub OAuth.
- **S3-Compatible Storage**: Flexible file handling using MinIO for scalable storage solutions.
- **System Observability**: Built-in monitoring with Prometheus and Grafana to track performance and usage.

## 🛠️ Tech Stack

### Frontend & Framework
- **[Next.js 16](https://nextjs.org/)**: React framework for building performant web applications.
- **[React 19](https://react.dev/)**: The latest in UI component development.
- **[Tailwind CSS 4](https://tailwindcss.com/)**: Utility-first styling for a modern, responsive interface.
- **[Radix UI](https://www.radix-ui.com/)**: Unstyled, accessible UI primitives.

### Backend & Database
- **[Drizzle ORM](https://orm.drizzle.team/)**: Type-safe TypeScript ORM for interacting with PostgreSQL.
- **[PostgreSQL](https://www.postgresql.org/)**: Robust relational database for managing metadata and users.
- **[Better Auth](https://www.better-auth.com/)**: Comprehensive authentication for modern web apps.
- **[MinIO](https://min.io/)**: High-performance, S3-compatible object storage.

### Infrastructure & DevOps
- **[Bun](https://bun.sh/)**: Extremely fast JavaScript runtime and package manager.
- **[Docker](https://www.docker.com/)**: Containerization for easy deployment and local service management.
- **[Prometheus](https://prometheus.io/)**: Open-source systems monitoring and alerting toolkit.
- **[Grafana](https://grafana.com/)**: The open observability platform for visualizing metrics.

## ⚙️ Getting Started

1. **Install Dependencies**:
   ```bash
   bun install
   ```

2. **Launch Services**:
   ```bash
   docker-compose up -d
   ```

3. **Setup Database**:
   ```bash
   bun db:push
   ```

4. **Run Development Server**:
   ```bash
   bun dev
   ```
