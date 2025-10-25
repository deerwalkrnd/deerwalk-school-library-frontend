import { ErrorMessages, ErrorCode } from '../ErrorCodes';

describe('ErrorCodes', () => {
  describe('ErrorMessages', () => {
    it('should contain all required error codes', () => {
      const requiredCodes: ErrorCode[] = [
        'token_expired',
        'invalid_token',
        'insufficient_permission',
        'invalid_fields',
        'unknown_error',
        'duplicate_entry',
        'not_found',
        'incomplete_profile',
      ];

      requiredCodes.forEach(code => {
        expect(ErrorMessages[code]).toBeDefined();
        expect(typeof ErrorMessages[code]).toBe('string');
        expect(ErrorMessages[code].length).toBeGreaterThan(0);
      });
    });

    it('should have descriptive messages for token errors', () => {
      expect(ErrorMessages.token_expired).toContain('expired');
      expect(ErrorMessages.token_expired).toContain('log in');
      expect(ErrorMessages.invalid_token).toContain('Invalid');
      expect(ErrorMessages.invalid_token).toContain('token');
    });

    it('should have descriptive message for permission errors', () => {
      expect(ErrorMessages.insufficient_permission).toContain('permission');
      expect(ErrorMessages.insufficient_permission).toContain('do not have');
    });

    it('should have descriptive message for validation errors', () => {
      expect(ErrorMessages.invalid_fields).toContain('invalid');
      expect(ErrorMessages.invalid_fields).toContain('fields');
    });

    it('should have descriptive message for unknown errors', () => {
      expect(ErrorMessages.unknown_error).toContain('unexpected');
      expect(ErrorMessages.unknown_error).toContain('error');
    });

    it('should have descriptive message for duplicate entry errors', () => {
      expect(ErrorMessages.duplicate_entry).toContain('exists');
      expect(ErrorMessages.duplicate_entry).toContain('already');
    });

    it('should have descriptive message for not found errors', () => {
      expect(ErrorMessages.not_found).toContain('not found');
      expect(ErrorMessages.not_found).toContain('resource');
    });

    it('should have descriptive message for incomplete profile errors', () => {
      expect(ErrorMessages.incomplete_profile).toContain('incomplete');
      expect(ErrorMessages.incomplete_profile).toContain('profile');
    });
  });

  describe('ErrorCode type', () => {
    it('should accept valid error codes', () => {
      const validCodes: ErrorCode[] = [
        'token_expired',
        'invalid_token',
        'insufficient_permission',
        'invalid_fields',
        'unknown_error',
        'duplicate_entry',
        'not_found',
        'incomplete_profile',
      ];

      validCodes.forEach(code => {
        const message = ErrorMessages[code];
        expect(message).toBeDefined();
      });
    });

    it('should provide user-friendly messages', () => {
      Object.values(ErrorMessages).forEach(message => {
        expect(message).toBeDefined();
        expect(message.length).toBeGreaterThan(10);
        expect(message).not.toContain('undefined');
        expect(message).not.toContain('null');
      });
    });
  });

  describe('message consistency', () => {
    it('should use consistent capitalization', () => {
      Object.values(ErrorMessages).forEach(message => {
        // First letter should be capitalized
        expect(message[0]).toBe(message[0].toUpperCase());
      });
    });

    it('should end with proper punctuation', () => {
      Object.values(ErrorMessages).forEach(message => {
        expect(message).toMatch(/\.$/);
      });
    });

    it('should be actionable where possible', () => {
      const actionableMessages = [
        ErrorMessages.token_expired,
        ErrorMessages.invalid_token,
        ErrorMessages.invalid_fields,
        ErrorMessages.duplicate_entry,
        ErrorMessages.incomplete_profile,
      ];

      actionableMessages.forEach(message => {
        const hasActionWords = 
          message.includes('Please') ||
          message.includes('try') ||
          message.includes('check') ||
          message.includes('update');
        expect(hasActionWords).toBe(true);
      });
    });
  });

  describe('error code usage', () => {
    it('should support lookup by error code', () => {
      const code: ErrorCode = 'not_found';
      const message = ErrorMessages[code];
      
      expect(message).toBe('The requested resource was not found.');
    });

    it('should support iteration over all error codes', () => {
      const allCodes = Object.keys(ErrorMessages);
      
      expect(allCodes.length).toBeGreaterThanOrEqual(8);
      allCodes.forEach(code => {
        expect(ErrorMessages[code as ErrorCode]).toBeDefined();
      });
    });
  });
});