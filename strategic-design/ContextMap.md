# Context Mapping

## Overview
Context Mapping defines the relationships between bounded contexts in the pharmacy insurance claims domain. This map guides integration patterns and team boundaries.

## Bounded Contexts Identified

### 1. ClaimSubmission Context
**Responsibility:** Intake, validation, and initial processing of pharmacy claims.
**Team:** Pharmacy Operations & Integration
**Ubiquitous Language:**
- `Claim`, `Submission`, `Prescription`
- `Member`, `Pharmacy`, `Provider`
- `Validation`, `Intake`, `Routing`

### 2. Adjudication Context
**Responsibility:** Apply business rules to determine claim eligibility and payment.
**Team:** Business Rules & Compliance
**Ubiquitous Language:**
- `Adjudication`, `Coverage`, `Formulary`
- `Co-pay`, `Deductible`, `EOB`
- `Prior Authorization`, `Drug Utilization Review`

### 3. PaymentProcessing Context
**Responsibility:** Handle financial transactions and payment distribution.
**Team:** Finance & Accounting
**Ubiquitous Language:**
- `Payment`, `Remittance`, `Settlement`
- `EOB`, `Payment Advice`
- `Reconciliation`, `Disbursement`

### 4. MemberManagement Context
**Responsibility:** Manage member enrollment, profiles, and eligibility.
**Team:** Member Services
**Ubiquitous Language:**
- `Member`, `Enrollment`, `Eligibility`
- `Plan`, `Coverage`, `Dependent`
- `Verification`, `Profile`, `Account`

## Context Relationships

### Customer/Supplier Relationships
- **ClaimSubmission → Adjudication**
  - Customer: Adjudication Context
  - Supplier: ClaimSubmission Context
  - Integration: Claim data passed via API

- **Adjudication → PaymentProcessing**
  - Customer: PaymentProcessing Context
  - Supplier: Adjudication Context
  - Integration: Adjudication results with payment instructions

### Shared Kernel
- **Shared Identifiers:** `MemberId`, `DrugCode`, `PharmacyId`
  - Shared across: ClaimSubmission, Adjudication, MemberManagement
  - Maintained by: Architecture Governance Team

### Anti-Corruption Layer
- **External Systems Integration**
  - Pharmacy Management Systems
  - Payer Systems
  - Legacy Claim Systems
  - Pattern: Adapter pattern with translation layer

## Integration Patterns

### Synchronous Integration (Request/Response)
ClaimSubmitted → [API Gateway] → Adjudication
↓
[Validation]
↓
[Business Rules]
↓
[Payment Calculation]

text

### Asynchronous Integration (Event-Driven)
ClaimSubmitted → [Event Bus] → Multiple Consumers
↓ ↓
Adjudication Analytics
↓ ↓
PaymentProcessed → [Event Bus] → Audit & Reporting

text

## Team Structure Alignment

| Bounded Context | Team Size | Primary Skills |
|-----------------|-----------|----------------|
| ClaimSubmission | 6-8 | API Development, Integration |
| Adjudication | 8-10 | Business Rules, Compliance |
| PaymentProcessing | 4-6 | Financial Systems, Security |
| MemberManagement | 5-7 | Data Management, Eligibility |

## Success Metrics

### Technical Metrics
- Context coupling score (target: < 0.3)
- Integration point count (target: minimize)
- Contract stability (target: > 0.9)

### Business Metrics
- Cross-context defect rate (target: < 5%)
- Feature delivery velocity (target: +20% YoY)
- Business rule change impact (target: localized)
