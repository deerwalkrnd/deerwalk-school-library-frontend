import { UseCaseError } from '../UseCaseError';

describe('UseCaseError', () => {
  describe('constructor', () => {
    it('should create an error with default values', () => {
      const error = new UseCaseError();
      
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(UseCaseError);
      expect(error.name).toBe('UseCaseError');
      expect(error.message).toBe('');
      expect(error.statusCode).toBeUndefined();
    });

    it('should create an error with a custom message', () => {
      const message = 'Use case execution failed';
      const error = new UseCaseError(message);
      
      expect(error.message).toBe(message);
      expect(error.name).toBe('UseCaseError');
      expect(error.statusCode).toBeUndefined();
    });

    it('should create an error with message and status code', () => {
      const message = 'Invalid input parameters';
      const statusCode = 422;
      const error = new UseCaseError(message, statusCode);
      
      expect(error.message).toBe(message);
      expect(error.statusCode).toBe(statusCode);
      expect(error.name).toBe('UseCaseError');
    });

    it('should preserve error stack trace', () => {
      const error = new UseCaseError('Test use case error');
      
      expect(error.stack).toBeDefined();
      expect(error.stack).toContain('UseCaseError');
    });
  });

  describe('use case execution scenarios', () => {
    it('should handle validation failures', () => {
      const error = new UseCaseError('Input validation failed', 400);
      expect(error.message).toBe('Input validation failed');
      expect(error.statusCode).toBe(400);
    });

    it('should handle business rule violations', () => {
      const error = new UseCaseError('Business rule violated', 422);
      expect(error.message).toBe('Business rule violated');
      expect(error.statusCode).toBe(422);
    });

    it('should handle permission errors', () => {
      const error = new UseCaseError('Insufficient permissions', 403);
      expect(error.message).toBe('Insufficient permissions');
      expect(error.statusCode).toBe(403);
    });

    it('should handle unexpected errors with descriptive messages', () => {
      const originalError = new Error('Original error');
      const error = new UseCaseError(`Unexpected error : ${originalError.message}`);
      
      expect(error.message).toContain('Unexpected error');
      expect(error.message).toContain('Original error');
    });
  });

  describe('error wrapping', () => {
    it('should wrap repository errors', () => {
      const repoErrorMsg = 'Database connection failed';
      const error = new UseCaseError(`Failed to fetch data: ${repoErrorMsg}`, 500);
      
      expect(error.message).toContain('Failed to fetch data');
      expect(error.message).toContain(repoErrorMsg);
    });

    it('should provide context for errors', () => {
      const error = new UseCaseError('Use case: GetUserById - User not found', 404);
      
      expect(error.message).toContain('GetUserById');
      expect(error.message).toContain('User not found');
    });
  });

  describe('error type checking', () => {
    it('should be distinguishable from other error types', () => {
      const useCaseError = new UseCaseError('Use case error');
      const genericError = new Error('Generic error');
      
      expect(useCaseError).toBeInstanceOf(UseCaseError);
      expect(genericError).not.toBeInstanceOf(UseCaseError);
    });

    it('should allow type checking in catch blocks', () => {
      try {
        throw new UseCaseError('Test error', 500);
      } catch (error) {
        expect(error).toBeInstanceOf(UseCaseError);
        if (error instanceof UseCaseError) {
          expect(error.statusCode).toBe(500);
          expect(error.name).toBe('UseCaseError');
        }
      }
    });
  });
});