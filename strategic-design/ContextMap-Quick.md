# Context Mapping - Quick Reference

## Core Contexts
1. **ClaimSubmission** - Intake & validation
2. **Adjudication** - Business rules application  
3. **PaymentProcessing** - Financial transactions
4. **MemberManagement** - Member data & eligibility

## Key Relationships
┌─────────────────┐     ┌─────────────────┐
│  ClaimSubmission │────▶│   Adjudication   │
│  • Intake        │     │  • Rules Engine  │
│  • Validation    │     │  • Coverage Check│
└─────────────────┘     └─────────────────┘
         │                        │
         ▼                        ▼
┌─────────────────┐     ┌─────────────────┐
│ MemberManagement │     │ PaymentProcessing│
│  • Eligibility   │     │  • Payments      │
│  • Profiles      │     │  • EOB Generation│
└─────────────────┘     └─────────────────┘

## Integration Patterns
• **API Contracts** - Between ClaimSubmission & Adjudication
• **Domain Events** - For async communication  
• **Shared Kernel** - MemberId, DrugCode identifiers
• **Anti-Corruption** - For external system integration

## Team Alignment
Each bounded context = 1 autonomous team
Each team owns their domain model and data
Clear contracts between teams
Independent deployment capability
