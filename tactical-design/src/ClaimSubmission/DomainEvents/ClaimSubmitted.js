// DOMAIN EVENT: ClaimSubmitted
// Something meaningful happened in the business domain
// Used for audit trails, event sourcing, and integration

class ClaimSubmitted {
  constructor(claimId, memberId, drugCode, pharmacyId) {
    this.eventType = 'CLAIM_SUBMITTED';
    this.claimId = claimId;
    this.memberId = memberId;
    this.drugCode = drugCode;
    this.pharmacyId = pharmacyId;
    this.timestamp = new Date();
    
    // Metadata for event processing
    this.version = '1.0';
    this.source = 'PharmacyClaimSubmission';
    this.correlationId = this._generateCorrelationId();
  }
  
  // Generate unique correlation ID for tracing
  _generateCorrelationId() {
    return `corr-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  // Serialize for storage/transmission
  toJSON() {
    return {
      eventType: this.eventType,
      claimId: this.claimId,
      memberId: this.memberId,
      drugCode: this.drugCode,
      pharmacyId: this.pharmacyId,
      timestamp: this.timestamp.toISOString(),
      version: this.version,
      source: this.source,
      correlationId: this.correlationId
    };
  }
  
  // Factory method for creating from raw data
  static fromData(data) {
    const event = new ClaimSubmitted(
      data.claimId,
      data.memberId,
      data.drugCode,
      data.pharmacyId
    );
    
    // Override timestamp if provided
    if (data.timestamp) {
      event.timestamp = new Date(data.timestamp);
    }
    
    return event;
  }
}

module.exports = { ClaimSubmitted };
