import { cn, getHeader } from '../utils';

describe('utils', () => {
  describe('cn (classNames utility)', () => {
    it('should combine multiple class names', () => {
      const result = cn('class1', 'class2', 'class3');
      expect(result).toContain('class1');
      expect(result).toContain('class2');
      expect(result).toContain('class3');
    });

    it('should handle conditional classes', () => {
      const result = cn('base', true && 'truthy', false && 'falsy');
      expect(result).toContain('base');
      expect(result).toContain('truthy');
      expect(result).not.toContain('falsy');
    });

    it('should handle undefined and null values', () => {
      const result = cn('base', undefined, null, 'end');
      expect(result).toContain('base');
      expect(result).toContain('end');
    });

    it('should merge Tailwind classes correctly', () => {
      // Testing Tailwind merge functionality
      const result = cn('px-2', 'px-4');
      // Should keep only the last px- class
      expect(result).toBe('px-4');
    });

    it('should handle empty input', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('should handle objects with boolean values', () => {
      const result = cn({
        'active': true,
        'disabled': false,
        'visible': true,
      });
      expect(result).toContain('active');
      expect(result).toContain('visible');
      expect(result).not.toContain('disabled');
    });

    it('should handle arrays of classes', () => {
      const result = cn(['class1', 'class2'], 'class3');
      expect(result).toContain('class1');
      expect(result).toContain('class2');
      expect(result).toContain('class3');
    });

    it('should handle complex Tailwind combinations', () => {
      const result = cn(
        'bg-blue-500',
        'hover:bg-blue-600',
        'dark:bg-blue-700',
        'text-white'
      );
      expect(result).toContain('bg-blue-500');
      expect(result).toContain('hover:bg-blue-600');
      expect(result).toContain('dark:bg-blue-700');
      expect(result).toContain('text-white');
    });
  });

  describe('getHeader', () => {
    it('should extract authorization header from request', () => {
      const mockRequest = {
        headers: {
          get: jest.fn((key: string) => {
            if (key === 'authorization') {
              return 'Bearer test-token-123';
            }
            return null;
          }),
        },
      } as unknown as Request;

      const result = getHeader(mockRequest);
      expect(result).toBe('Bearer test-token-123');
      expect(mockRequest.headers.get).toHaveBeenCalledWith('authorization');
    });

    it('should throw error when authorization header is missing', () => {
      const mockRequest = {
        headers: {
          get: jest.fn(() => null),
        },
      } as unknown as Request;

      expect(() => getHeader(mockRequest)).toThrow('User token not found');
    });

    it('should handle different token formats', () => {
      const testCases = [
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        'Token abc123',
        'Basic YWxhZGRpbjpvcGVuc2VzYW1l',
      ];

      testCases.forEach(token => {
        const mockRequest = {
          headers: {
            get: jest.fn((key: string) => {
              if (key === 'authorization') {
                return token;
              }
              return null;
            }),
          },
        } as unknown as Request;

        const result = getHeader(mockRequest);
        expect(result).toBe(token);
      });
    });

    it('should throw error for empty authorization header', () => {
      const mockRequest = {
        headers: {
          get: jest.fn((key: string) => {
            if (key === 'authorization') {
              return '';
            }
            return null;
          }),
        },
      } as unknown as Request;

      expect(() => getHeader(mockRequest)).toThrow('User token not found');
    });

    it('should be case-sensitive for header name', () => {
      const mockRequest = {
        headers: {
          get: jest.fn((key: string) => {
            if (key === 'authorization') {
              return 'Bearer token';
            }
            return null;
          }),
        },
      } as unknown as Request;

      const result = getHeader(mockRequest);
      expect(result).toBe('Bearer token');
      expect(mockRequest.headers.get).toHaveBeenCalledWith('authorization');
    });
  });
});