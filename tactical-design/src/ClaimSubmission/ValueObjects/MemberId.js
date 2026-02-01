// VALUE OBJECT: MemberId
// Immutable, no identity, equality by value
// Enforces business rules for member ID format

class MemberId {
  constructor(value) {
    // BUSINESS RULE: Validate format on creation
    if (!this._isValidFormat(value)) {
      throw new Error(`Invalid member ID format: ${value}. Expected: P-12345-01`);
    }
    
    // Value objects are immutable
    this._value = value;
    Object.freeze(this); // Prevent modification
  }
  
  // BUSINESS RULE: Format must be P-12345-01
  _isValidFormat(id) {
    const pattern = /^P-\d{5}-\d{2}$/;
    return pattern.test(id);
  }
  
  // VALUE OBJECTS compare by value, not reference
  equals(other) {
    if (!(other instanceof MemberId)) {
      return false;
    }
    return this._value === other._value;
  }
  
  // String representation
  toString() {
    return this._value;
  }
  
  // Getter preserves immutability
  get value() {
    return this._value;
  }
  
  // BUSINESS RULE: Extract member tier from ID
  getTier() {
    // Example: P-12345-01 -> tier is "01"
    return this._value.split('-')[2];
  }
}

module.exports = { MemberId };
