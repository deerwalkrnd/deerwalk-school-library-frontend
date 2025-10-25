import { BusinessLogicError } from '../BusinessLogicError';

describe('BusinessLogicError', () => {
  describe('constructor', () => {
    it('should create an error with default values', () => {
      const error = new BusinessLogicError();
      
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(BusinessLogicError);
      expect(error.name).toBe('BusinessLogicError');
      expect(error.message).toBe('');
      expect(error.statusCode).toBeUndefined();
    });

    it('should create an error with a custom message', () => {
      const message = 'Invalid business logic operation';
      const error = new BusinessLogicError(message);
      
      expect(error.message).toBe(message);
      expect(error.name).toBe('BusinessLogicError');
      expect(error.statusCode).toBeUndefined();
    });

    it('should create an error with message and status code', () => {
      const message = 'Forbidden operation';
      const statusCode = 403;
      const error = new BusinessLogicError(message, statusCode);
      
      expect(error.message).toBe(message);
      expect(error.statusCode).toBe(statusCode);
      expect(error.name).toBe('BusinessLogicError');
    });

    it('should create an error with only status code', () => {
      const statusCode = 500;
      const error = new BusinessLogicError(undefined, statusCode);
      
      expect(error.message).toBe('');
      expect(error.statusCode).toBe(statusCode);
    });

    it('should preserve error stack trace', () => {
      const error = new BusinessLogicError('Test error');
      
      expect(error.stack).toBeDefined();
      expect(error.stack).toContain('BusinessLogicError');
    });
  });

  describe('error handling scenarios', () => {
    it('should be catchable in try-catch blocks', () => {
      expect(() => {
        throw new BusinessLogicError('Test error', 400);
      }).toThrow(BusinessLogicError);
    });

    it('should allow checking error type in catch blocks', () => {
      try {
        throw new BusinessLogicError('Business logic failed', 422);
      } catch (error) {
        expect(error).toBeInstanceOf(BusinessLogicError);
        if (error instanceof BusinessLogicError) {
          expect(error.statusCode).toBe(422);
        }
      }
    });

    it('should support common HTTP status codes', () => {
      const testCases = [
        { code: 400, description: 'Bad Request' },
        { code: 401, description: 'Unauthorized' },
        { code: 403, description: 'Forbidden' },
        { code: 404, description: 'Not Found' },
        { code: 409, description: 'Conflict' },
        { code: 422, description: 'Unprocessable Entity' },
        { code: 500, description: 'Internal Server Error' },
      ];

      testCases.forEach(({ code, description }) => {
        const error = new BusinessLogicError(description, code);
        expect(error.statusCode).toBe(code);
        expect(error.message).toBe(description);
      });
    });
  });

  describe('error message scenarios', () => {
    it('should handle empty string messages', () => {
      const error = new BusinessLogicError('', 400);
      expect(error.message).toBe('');
    });

    it('should handle long error messages', () => {
      const longMessage = 'This is a very long error message '.repeat(10);
      const error = new BusinessLogicError(longMessage, 400);
      expect(error.message).toBe(longMessage);
    });

    it('should handle special characters in messages', () => {
      const specialMessage = 'Error: Invalid input <script>alert("xss")</script>';
      const error = new BusinessLogicError(specialMessage, 400);
      expect(error.message).toBe(specialMessage);
    });

    it('should handle unicode characters', () => {
      const unicodeMessage = 'Error: 用户名无效 🚫';
      const error = new BusinessLogicError(unicodeMessage, 400);
      expect(error.message).toBe(unicodeMessage);
    });
  });
});