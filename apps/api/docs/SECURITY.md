# Backend Security Guidelines (`apps/api`)

This document defines the backend security standards, threat models, and architectural controls enforced across the NestJS API and Prisma database layer.

---

## 🎯 Security Role & Responsibilities

The NestJS backend (`apps/api/`) is the authoritative boundary for business logic, data persistence, and authorization in AdaptEdu. As established in [AGENTS.md](AGENTS.md), client-side validation is purely for user experience—**all authorization, access control, and data sanitization must be strictly verified on the server**.

---

## 🛡️ Critical Threat Vectors & Invariants

### 1. Access Control & Authorization (IDOR Defenses)

- **Insecure Direct Object References (IDOR):**
  - Never trust resource IDs provided in route parameters (`:id`) or request bodies (e.g., `student_id`, `observation_id`, `classroom_id`) without verifying ownership.
  - Every service method and query must assert that the currently authenticated user (`req.user.id`) owns the resource or has authorized access (e.g., teacher assigned to that classroom).
  ```typescript
  // ❌ VULNERABLE: Direct access without ownership check
  async getStudentReport(studentId: string) {
    return this.prisma.student.findUnique({ where: { id: studentId } });
  }

  // ✅ SECURE: Verify authenticated teacher owns or has access to the student
  async getStudentReport(studentId: string, currentTeacherId: string) {
    const student = await this.prisma.student.findFirst({
      where: { id: studentId, teacherId: currentTeacherId },
    });
    if (!student) {
      throw new NotFoundException('Estudante não encontrado.');
    }
    return student;
  }
  ```

### 2. Parameter & Privilege Tampering (Mass Assignment)

- **Strict Payload Whitelisting:**
  - Never accept privilege flags (`role`, `isAdmin`), internal status fields, or unvalidated financial/quota values from client payloads.
  - Configure the global NestJS `ValidationPipe` with strict stripping and rejection of non-whitelisted properties:
  ```typescript
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  ```

### 3. Business Logic & Multi-Step Flow Enforcement

- **Server-Side State Verification:**
  - Do not allow clients to skip intermediate steps in multi-stage workflows (e.g., skipping screening questionnaires or submitting reports without accepting pedagogical disclaimers).
  - Verify preceding state transitions in the database or transactional session before executing downstream operations.

### 4. Authentication, Session Security & Rate Limiting

- **Rate Limiting (Brute-Force Protection):**
  - Protect authentication endpoints (`/auth/login`, `/auth/google/callback`, password recovery) with `@nestjs/throttler` to prevent automated brute-force and credential stuffing.
- **Server-Side Token Invalidation:**
  - Logout operations must not merely rely on the frontend clearing its browser cookie or storage.
  - Implement server-side session invalidation or token revocation (e.g., maintaining an active session store or token revocation blocklist).
- **Sensitive Data Exposure:**
  - Never return raw database models containing sensitive attributes (`passwordHash`, internal tokens, refresh secrets).
  - Use explicit Prisma `select` projections or DTO serialization (`@Exclude()`, `ClassSerializerInterceptor`).

### 5. Injection & Sanitization (SQLi & SSRF)

- **SQL Injection Prevention:**
  - Always utilize Prisma's strongly-typed parameterized queries.
  - Prohibit raw SQL string concatenation (`$queryRawUnsafe` with dynamic string interpolations). If raw SQL is indispensable, strictly use tagged template literals (`$queryRaw` with parameters).
- **Server-Side Request Forgery (SSRF):**
  - When fetching external URLs or dispatching webhooks, strictly validate protocol schemes (`https:` only), whitelist permitted domains, and explicitly reject loopback (`127.0.0.1`, `localhost`) and private RFC 1918 IP addresses (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `169.254.169.254`).

### 6. Configuration & Neglected Headers

- **CORS Hardening:**
  - Never configure wildcard origins (`*`) alongside `credentials: true`. Explicitly bind `origin` to trusted frontend domains (`FRONTEND_URL` environment variable).
- **Debug Mode & Error Masking:**
  - In production, ensure global exception filters intercept all unhandled exceptions (HTTP 500) to mask database errors, stack traces, and framework internals. Return user-friendly PT-BR error messages while logging full diagnostic traces to secure internal logging sinks.
- **Security Headers:**
  - Enforce standard HTTP protection headers via `helmet`:
  ```typescript
  import helmet from 'helmet';
  app.use(helmet());
  ```

### 7. Dependency Vulnerability Auditing

- **Continuous Audits:**
  - Continuously track installed npm dependencies against known CVE databases using `npm audit`.
  - Automated dependency audits are integrated into `.github/workflows/ci.yml`.
