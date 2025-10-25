import { QueryKeys } from '../queryKeys';

describe('QueryKeys', () => {
  it('should contain all required query keys', () => {
    const requiredKeys = [
      'LOGIN',
      'STUDENTDASHBOARD',
      'LIBRARIANDASHBOARD',
      'FEEDBACKS',
      'USERS',
      'QUOTES',
      'EVENTS',
      'ANNOUNCEMENTS',
      'ISSUES',
      'RECOMMENDATIONS',
      'STUDENTPROFILE',
      'BOOKS',
      'GENRES',
      'BOOKMARKS',
      'REVIEWS',
      'BORROWBOOKS',
      'AVAILABLECOPIES',
    ];

    requiredKeys.forEach(key => {
      expect(QueryKeys).toHaveProperty(key);
      expect(typeof QueryKeys[key as keyof typeof QueryKeys]).toBe('string');
    });
  });

  it('should have unique values for all keys', () => {
    const values = Object.values(QueryKeys);
    const uniqueValues = new Set(values);
    
    expect(uniqueValues.size).toBe(values.length);
  });

  it('should use kebab-case for query key values', () => {
    Object.values(QueryKeys).forEach(value => {
      // Allow lowercase letters, numbers, and hyphens
      expect(value).toMatch(/^[a-z0-9-]+$/);
    });
  });

  it('should map LOGIN to correct value', () => {
    expect(QueryKeys.LOGIN).toBe('login');
  });

  it('should map STUDENTDASHBOARD to correct value', () => {
    expect(QueryKeys.STUDENTDASHBOARD).toBe('student-dashboard');
  });

  it('should map LIBRARIANDASHBOARD to correct value', () => {
    expect(QueryKeys.LIBRARIANDASHBOARD).toBe('librarian-dashboard');
  });

  it('should map FEEDBACKS to correct value', () => {
    expect(QueryKeys.FEEDBACKS).toBe('feedbacks');
  });

  it('should map USERS to correct value', () => {
    expect(QueryKeys.USERS).toBe('users');
  });

  it('should map QUOTES to correct value', () => {
    expect(QueryKeys.QUOTES).toBe('quotes');
  });

  it('should map EVENTS to correct value', () => {
    expect(QueryKeys.EVENTS).toBe('events');
  });

  it('should map ANNOUNCEMENTS to correct value', () => {
    expect(QueryKeys.ANNOUNCEMENTS).toBe('announcements');
  });

  it('should map ISSUES to correct value', () => {
    expect(QueryKeys.ISSUES).toBe('issue-book');
  });

  it('should map RECOMMENDATIONS to correct value', () => {
    expect(QueryKeys.RECOMMENDATIONS).toBe('recommendations');
  });

  it('should map STUDENTPROFILE to correct value', () => {
    expect(QueryKeys.STUDENTPROFILE).toBe('student-profile');
  });

  it('should map BOOKS to correct value', () => {
    expect(QueryKeys.BOOKS).toBe('books');
  });

  it('should map GENRES to correct value', () => {
    expect(QueryKeys.GENRES).toBe('genre');
  });

  it('should map BOOKMARKS to correct value', () => {
    expect(QueryKeys.BOOKMARKS).toBe('bookmark');
  });

  it('should map REVIEWS to correct value', () => {
    expect(QueryKeys.REVIEWS).toBe('reviews');
  });

  it('should map BORROWBOOKS to correct value', () => {
    expect(QueryKeys.BORROWBOOKS).toBe('book-borrow');
  });

  it('should map AVAILABLECOPIES to correct value', () => {
    expect(QueryKeys.AVAILABLECOPIES).toBe('available-book-copies');
  });

  describe('key naming conventions', () => {
    it('should use SCREAMING_SNAKE_CASE for key names', () => {
      const keys = Object.keys(QueryKeys);
      
      keys.forEach(key => {
        expect(key).toMatch(/^[A-Z][A-Z0-9_]*$/);
      });
    });

    it('should not contain spaces in values', () => {
      Object.values(QueryKeys).forEach(value => {
        expect(value).not.toContain(' ');
      });
    });
  });

  describe('usage scenarios', () => {
    it('should be usable as query keys in TanStack Query', () => {
      // Simulate usage in useQuery
      const queryKey = [QueryKeys.BOOKS];
      expect(queryKey).toEqual(['books']);
    });

    it('should be usable with parameters', () => {
      const bookId = 123;
      const queryKey = [QueryKeys.BOOKS, bookId];
      expect(queryKey).toEqual(['books', 123]);
    });

    it('should support nested query keys', () => {
      const userId = '456';
      const queryKey = [QueryKeys.STUDENTPROFILE, userId, QueryKeys.BOOKMARKS];
      expect(queryKey).toEqual(['student-profile', '456', 'bookmark']);
    });
  });

  describe('immutability', () => {
    it('should not allow modification of query key values', () => {
      const originalValue = QueryKeys.LOGIN;
      
      // Attempting to modify (this will fail in strict mode)
      expect(() => {
        (QueryKeys as any).LOGIN = 'modified';
      }).toThrow();
      
      expect(QueryKeys.LOGIN).toBe(originalValue);
    });
  });
});