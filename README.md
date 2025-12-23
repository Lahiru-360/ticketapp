# Internal Ticket Management System

A modern, role-based ticket management application designed as an internal support system for technology companies. This system streamlines the process of creating, assigning, tracking, and resolving technical support tickets with clear role-based workflows.

## Overview

This ticketing system provides a unified platform for managing internal technical support requests. It enables employees to create tickets for technical issues, support teams to resolve them efficiently, and administrators to oversee the entire process. The system implements a three-tier role model (Admin, Tech Support, User) with distinct responsibilities and workflows.

## Key Features

- **Role-Based Access Control (RBAC)** - Three user roles with specific permissions and workflows
- **Real-Time Dashboard** - Live statistics, priority alerts, and ticket overview
- **Ticket Management** - Create, edit, assign, and track tickets with priority levels
- **Assignment System** - Admins can assign tickets to technical support staff
- **Status Tracking** - Tickets progress through states: Open → In Progress → Closed
- **Priority Levels** - High, Medium, and Low priority classification
- **Role-Specific Views** - Users see only relevant tickets and actions
- **User Management** - Admin panel for managing users and their roles

## User Roles & Responsibilities

### Admin

**Responsibilities:**

- User account management (create, edit users)
- View all tickets in the system
- Assign tickets to technical support staff
- Monitor system-wide ticket metrics
- Delete tickets when necessary
- Access dashboard with complete system overview

**Permissions:**

- Full read/write access to all tickets
- Can assign tickets to Tech Support users
- Can delete any ticket
- Access user management interface
- View all system statistics and reports

### Tech Support

**Responsibilities:**

- View and manage assigned tickets
- Update ticket status (Open → In Progress → Closed)
- Provide technical solutions and track progress
- Monitor their workload dashboard
- Prioritize high-priority tickets

**Permissions:**

- View all tickets in the system
- Edit only the status of assigned tickets
- Cannot delete tickets
- Cannot create new tickets
- View assigned tickets in dedicated dashboard
- Cannot assign tickets to other users

### User (Regular Employee)

**Responsibilities:**

- Create support tickets for technical issues
- Provide detailed descriptions of problems
- Track their own submitted tickets
- Update ticket description if needed
- Delete their own tickets if no longer needed

**Permissions:**

- Create new tickets
- View only their own created tickets
- Edit their own tickets (except status)
- Delete their own tickets
- Cannot assign tickets
- Cannot view other users' tickets

## Workflows

### User Workflow (Creating a Support Request)

```
1. User logs in to dashboard
2. Navigates to "Tickets" → "New Ticket"
3. Creates ticket with:
   - Title (required)
   - Description (required)
   - Priority level: Low/Medium/High (required)
4. Ticket status automatically set to "Open"
5. User can view ticket in "My Tickets" page
6. User can edit ticket details or delete if needed
7. Ticket awaits assignment by Admin
```

### Admin Workflow (Assignment & Oversight)

```
1. Admin logs in to dashboard
2. Views all tickets across system
3. Reviews unassigned tickets (indicated by gray user icon)
4. Opens ticket detail
5. Assigns ticket to appropriate Tech Support staff member
6. Monitors dashboard for:
   - Total ticket count
   - Open vs In Progress vs Closed distribution
   - High-priority open tickets alert
7. Can delete tickets if necessary
8. Manages users and their roles
```

### Tech Support Workflow (Resolving Tickets)

```
1. Tech Support staff logs in to dashboard
2. Navigates to "My Tickets" to view assigned tickets
3. Reviews ticket details and description
4. Updates ticket status:
   - "Open" → "In Progress" (when starting work)
   - "In Progress" → "Closed" (when resolved)
5. Cannot edit ticket description or title
6. Can only modify status to track progress
7. Dashboard shows their assigned ticket count
8. High-priority tickets highlighted in priority alert
```

## Dashboard Features

### Statistics Cards

- **Total Tickets** - Count of all tickets in system
- **Open Tickets** - Tickets awaiting assignment or action
- **In Progress** - Tickets currently being worked on
- **Closed Tickets** - Resolved tickets

### High Priority Alert

- Displays count of high-priority open tickets
- Visible to Admin and Tech Support only
- Helps prioritize critical issues

### Visual Analytics

- Status distribution chart (color-coded bars)
- Recent ticket activity list
- Quick access to key metrics

### Role-Specific Navigation

- Dynamic navigation based on user role
- Users see: Dashboard, Tickets, My Tickets, Logout
- Tech: Dashboard, Tickets, My Tickets, Logout
- Admin: Dashboard, Tickets, Users, Logout

## Technology Stack

### Frontend

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality UI components
- **React Hook Form** - Efficient form management
- **Zod** - Runtime schema validation
- **Recharts** - Data visualization

### Backend

- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Database access layer
- **NextAuth.js** - Authentication & authorization
- **bcryptjs** - Password hashing

### Database

- **MySQL** - Relational database
- **Prisma Migrations** - Schema management

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MySQL database

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ticketapp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/ticketapp"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**

   ```bash
   npx prisma migrate dev
   ```

5. **Seed demo data (optional)**
   Create a seed script or manually add users through the application

6. **Start the development server**

   ```bash
   npm run dev
   ```

7. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
ticketapp/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── tickets/
│   │   └── users/
│   ├── tickets/
│   ├── tech-tickets/
│   ├── my-tickets/
│   ├── users/
│   └── page.tsx (Dashboard)
├── components/
│   ├── ui/
│   ├── TicketForm.tsx
│   ├── AssignTicket.tsx
│   ├── DashChart.tsx
│   ├── PriorityAlert.tsx
│   └── [other components]
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── types/
│   └── next-auth.d.ts
├── ValidationSchemas/
│   ├── tickets.ts
│   └── users.ts
└── package.json
```

## Security Considerations

- **Authentication**: Credentials-based authentication with bcrypt password hashing
- **Authorization**: Role-based access control enforced at API and component level
- **Session Management**: JWT tokens with secure session handling
- **Field-Level Security**: Forms enforce role-based field editing at both client and API levels
- **Data Isolation**: Users can only access data relevant to their role

## API Endpoints

### Tickets

- `GET /api/tickets` - Get all tickets (paginated)
- `POST /api/tickets` - Create new ticket (Users only)
- `GET /api/tickets/[id]` - Get ticket details
- `PUT /api/tickets/[id]` - Update ticket (role-restricted)
- `DELETE /api/tickets/[id]` - Delete ticket (Admins and creators)

### Users

- `GET /api/users` - Get all users (Admins only)
- `POST /api/users` - Create new user (Admins only)
- `GET /api/users/[id]` - Get user details (Admins only)
- `PUT /api/users/[id]` - Update user (Admins only)

### Authentication

- `POST /api/auth/login` - Custom login endpoint
- `POST /api/auth/[...nextauth]` - NextAuth handler

## Future Enhancements

- Email notifications for ticket updates
- Ticket search and advanced filtering
- Ticket categorization and tagging
- SLA (Service Level Agreement) tracking
- Activity logs and audit trails
- Ticket templates for common issues
- Knowledge base integration
- Mobile app support

## Contributing

This is a demonstration project for internal company use. For modifications or contributions, please contact the developer.

**Author:** Lahiru Hettiarachchi (Developer)
