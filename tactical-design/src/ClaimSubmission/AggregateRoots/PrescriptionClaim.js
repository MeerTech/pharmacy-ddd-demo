// AGGREGATE ROOT: PrescriptionClaim
// Transaction boundary for pharmacy claim processing
// Protects business invariants and encapsulates rules

class PrescriptionClaim {
  constructor(claimId, memberId, drugInfo) {
    // Aggregate identity
    this.id = claimId;
    
    // Value Objects
    this.memberId = memberId;    // MemberId value object
    this.drug = drugInfo;        // Drug value object
    
    // Aggregate state
    this.status = 'SUBMITTED';
    this.rejectionReason = null;
    this.coPay = null;
    
    // Domain Events for audit trail
    this._domainEvents = [];
  }
  
  // BUSINESS METHOD: Adjudicate claim
  // Demonstrates business rule encapsulation
  adjudicate(coverageResult, formularyRules) {
    // INVARIANT: Can only adjudicate submitted claims
    if (this.status !== 'SUBMITTED') {
      throw new Error('Business rule violation: Claim already processed');
    }
    
    // BUSINESS RULE 1: Member must have active coverage
    if (!coverageResult.isActive) {
      this._rejectWithEvent('NO_COVERAGE');
      return;
    }
    
    // BUSINESS RULE 2: Drug must be in formulary
    if (!formularyRules.isCovered(this.drug.code)) {
      this._rejectWithEvent('NOT_IN_FORMULARY');
      return;
    }
    
    // BUSINESS RULE 3: Apply co-pay based on coverage tier
    this._approveWithEvent(coverageResult.coPay);
  }
  
  // PRIVATE: Reject claim with domain event
  _rejectWithEvent(reason) {
    this.status = 'REJECTED';
    this.rejectionReason = reason;
    this._domainEvents.push({
      type: 'CLAIM_REJECTED',
      claimId: this.id,
      reason: reason,
      timestamp: new Date().toISOString()
    });
  }
  
  // PRIVATE: Approve claim with domain event
  _approveWithEvent(coPay) {
    this.status = 'APPROVED';
    this.coPay = coPay;
    this._domainEvents.push({
      type: 'CLAIM_APPROVED',
      claimId: this.id,
      coPay: coPay,
      timestamp: new Date().toISOString()
    });
  }
  
  // Get domain events for audit/processing
  getDomainEvents() {
    return [...this._domainEvents]; // Return copy to preserve immutability
  }
  
  // Clear events after they've been processed
  clearDomainEvents() {
    this._domainEvents = [];
  }
}

module.exports = { PrescriptionClaim };
