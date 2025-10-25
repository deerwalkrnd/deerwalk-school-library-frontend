import { RepositoryError } from '../RepositoryError';

describe('RepositoryError', () => {
  describe('constructor', () => {
    it('should create an error with default values', () => {
      const error = new RepositoryError();
      
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(RepositoryError);
      expect(error.message).toBe('');
      expect(error.statusCode).toBeUndefined();
    });

    it('should create an error with a custom message', () => {
      const message = 'Database connection failed';
      const error = new RepositoryError(message);
      
      expect(error.message).toBe(message);
      expect(error.statusCode).toBeUndefined();
    });

    it('should create an error with message and status code', () => {
      const message = 'Resource not found in database';
      const statusCode = 404;
      const error = new RepositoryError(message, statusCode);
      
      expect(error.message).toBe(message);
      expect(error.statusCode).toBe(statusCode);
    });

    it('should preserve error stack trace', () => {
      const error = new RepositoryError('Test repository error');
      
      expect(error.stack).toBeDefined();
      expect(error.stack).toContain('RepositoryError');
    });
  });

  describe('database error scenarios', () => {
    it('should handle connection errors', () => {
      const error = new RepositoryError('Connection timeout', 503);
      expect(error.message).toBe('Connection timeout');
      expect(error.statusCode).toBe(503);
    });

    it('should handle query errors', () => {
      const error = new RepositoryError('Invalid SQL query', 500);
      expect(error.message).toBe('Invalid SQL query');
      expect(error.statusCode).toBe(500);
    });

    it('should handle not found errors', () => {
      const error = new RepositoryError('Record not found', 404);
      expect(error.message).toBe('Record not found');
      expect(error.statusCode).toBe(404);
    });

    it('should handle duplicate entry errors', () => {
      const error = new RepositoryError('Duplicate key violation', 409);
      expect(error.message).toBe('Duplicate key violation');
      expect(error.statusCode).toBe(409);
    });
  });

  describe('network error scenarios', () => {
    it('should handle network errors', () => {
      const error = new RepositoryError('Network Error');
      expect(error.message).toBe('Network Error');
    });

    it('should handle timeout errors', () => {
      const error = new RepositoryError('Request timeout', 408);
      expect(error.message).toBe('Request timeout');
      expect(error.statusCode).toBe(408);
    });

    it('should handle API response errors', () => {
      const error = new RepositoryError('API returned 500', 500);
      expect(error.message).toBe('API returned 500');
      expect(error.statusCode).toBe(500);
    });
  });

  describe('error propagation', () => {
    it('should be rethrowable', () => {
      const originalError = new RepositoryError('Original error', 500);
      
      expect(() => {
        throw originalError;
      }).toThrow(RepositoryError);
    });

    it('should be distinguishable from other error types', () => {
      const repoError = new RepositoryError('Repository error');
      const genericError = new Error('Generic error');
      
      expect(repoError).toBeInstanceOf(RepositoryError);
      expect(genericError).not.toBeInstanceOf(RepositoryError);
    });
  });
});