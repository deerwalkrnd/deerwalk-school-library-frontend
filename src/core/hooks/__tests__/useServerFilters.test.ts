import { renderHook, act } from '@testing-library/react';
import { useServerFilters } from '../useServerFilters';

describe('useServerFilters', () => {
  describe('initialization', () => {
    it('should initialize with default values', () => {
      const { result } = renderHook(() => useServerFilters());

      expect(result.current.filters).toEqual({
        search: '',
        searchableField: undefined,
        startDate: null,
        endDate: null,
      });
      expect(result.current.params).toEqual({});
      expect(result.current.version).toBe(0);
    });
  });

  describe('setFilters', () => {
    it('should update filters without applying them', () => {
      const { result } = renderHook(() => useServerFilters());

      act(() => {
        result.current.setFilters({
          search: 'test query',
          searchableField: 'title',
          startDate: null,
          endDate: null,
        });
      });

      expect(result.current.filters.search).toBe('test query');
      expect(result.current.filters.searchableField).toBe('title');
      expect(result.current.params).toEqual({}); // Params not updated until apply
      expect(result.current.version).toBe(0);
    });

    it('should update search field', () => {
      const { result } = renderHook(() => useServerFilters());

      act(() => {
        result.current.setFilters({
          ...result.current.filters,
          search: 'mathematics',
        });
      });

      expect(result.current.filters.search).toBe('mathematics');
    });

    it('should update searchableField', () => {
      const { result } = renderHook(() => useServerFilters());

      act(() => {
        result.current.setFilters({
          ...result.current.filters,
          searchableField: 'author',
        });
      });

      expect(result.current.filters.searchableField).toBe('author');
    });

    it('should update date range', () => {
      const { result } = renderHook(() => useServerFilters());
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-12-31');

      act(() => {
        result.current.setFilters({
          ...result.current.filters,
          startDate,
          endDate,
        });
      });

      expect(result.current.filters.startDate).toBe(startDate);
      expect(result.current.filters.endDate).toBe(endDate);
    });
  });

  describe('apply', () => {
    it('should apply filters with search and searchable field', () => {
      const { result } = renderHook(() => useServerFilters());

      act(() => {
        result.current.setFilters({
          search: 'test query',
          searchableField: 'title',
          startDate: null,
          endDate: null,
        });
      });

      act(() => {
        result.current.apply();
      });

      expect(result.current.params).toEqual({
        searchable_value: 'test query',
        searchable_field: 'title',
      });
      expect(result.current.version).toBe(1);
    });

    it('should trim whitespace from search value', () => {
      const { result } = renderHook(() => useServerFilters());

      act(() => {
        result.current.setFilters({
          search: '  test query  ',
          searchableField: 'title',
          startDate: null,
          endDate: null,
        });
      });

      act(() => {
        result.current.apply();
      });

      expect(result.current.params.searchable_value).toBe('test query');
    });

    it('should default searchable_field to "name" when search has value but no field specified', () => {
      const { result } = renderHook(() => useServerFilters());

      act(() => {
        result.current.setFilters({
          search: 'test',
          searchableField: undefined,
          startDate: null,
          endDate: null,
        });
      });

      act(() => {
        result.current.apply();
      });

      expect(result.current.params.searchable_field).toBe('name');
    });

    it('should not include search params when search is empty', () => {
      const { result } = renderHook(() => useServerFilters());

      act(() => {
        result.current.setFilters({
          search: '',
          searchableField: 'title',
          startDate: null,
          endDate: null,
        });
      });

      act(() => {
        result.current.apply();
      });

      expect(result.current.params.searchable_value).toBeUndefined();
      expect(result.current.params.searchable_field).toBeUndefined();
    });

    it('should not include search params when search is whitespace only', () => {
      const { result } = renderHook(() => useServerFilters());

      act(() => {
        result.current.setFilters({
          search: '   ',
          searchableField: 'title',
          startDate: null,
          endDate: null,
        });
      });

      act(() => {
        result.current.apply();
      });

      expect(result.current.params.searchable_value).toBeUndefined();
      expect(result.current.params.searchable_field).toBeUndefined();
    });

    it('should apply date range filters', () => {
      const { result } = renderHook(() => useServerFilters());
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-12-31');

      act(() => {
        result.current.setFilters({
          search: '',
          searchableField: undefined,
          startDate,
          endDate,
        });
      });

      act(() => {
        result.current.apply();
      });

      expect(result.current.params.start_date).toBe('2024-01-01');
      expect(result.current.params.end_date).toBe('2024-12-31');
    });

    it('should apply only start date when end date is null', () => {
      const { result } = renderHook(() => useServerFilters());
      const startDate = new Date('2024-01-01');

      act(() => {
        result.current.setFilters({
          search: '',
          searchableField: undefined,
          startDate,
          endDate: null,
        });
      });

      act(() => {
        result.current.apply();
      });

      expect(result.current.params.start_date).toBe('2024-01-01');
      expect(result.current.params.end_date).toBeUndefined();
    });

    it('should handle end date before start date by ignoring end date', () => {
      const { result } = renderHook(() => useServerFilters());
      const startDate = new Date('2024-12-31');
      const endDate = new Date('2024-01-01'); // Before start date

      act(() => {
        result.current.setFilters({
          search: '',
          searchableField: undefined,
          startDate,
          endDate,
        });
      });

      act(() => {
        result.current.apply();
      });

      expect(result.current.params.start_date).toBe('2024-12-31');
      expect(result.current.params.end_date).toBeUndefined();
    });

    it('should apply all filters together', () => {
      const { result } = renderHook(() => useServerFilters());
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-12-31');

      act(() => {
        result.current.setFilters({
          search: 'mathematics',
          searchableField: 'title',
          startDate,
          endDate,
        });
      });

      act(() => {
        result.current.apply();
      });

      expect(result.current.params).toEqual({
        searchable_value: 'mathematics',
        searchable_field: 'title',
        start_date: '2024-01-01',
        end_date: '2024-12-31',
      });
    });

    it('should increment version on each apply', () => {
      const { result } = renderHook(() => useServerFilters());

      expect(result.current.version).toBe(0);

      act(() => {
        result.current.apply();
      });

      expect(result.current.version).toBe(1);

      act(() => {
        result.current.apply();
      });

      expect(result.current.version).toBe(2);
    });

    it('should maintain params reference when applied without changes', () => {
      const { result } = renderHook(() => useServerFilters());

      act(() => {
        result.current.setFilters({
          search: 'test',
          searchableField: 'title',
          startDate: null,
          endDate: null,
        });
      });

      act(() => {
        result.current.apply();
      });

      const firstParams = result.current.params;

      act(() => {
        result.current.apply();
      });

      // Version changes but params structure remains same
      expect(result.current.version).toBe(2);
      expect(result.current.params).toEqual(firstParams);
    });
  });

  describe('date formatting', () => {
    it('should format dates as YYYY-MM-DD', () => {
      const { result } = renderHook(() => useServerFilters());
      const testDate = new Date('2024-06-15T10:30:00');

      act(() => {
        result.current.setFilters({
          search: '',
          searchableField: undefined,
          startDate: testDate,
          endDate: null,
        });
      });

      act(() => {
        result.current.apply();
      });

      expect(result.current.params.start_date).toBe('2024-06-15');
    });

    it('should handle date at beginning of year', () => {
      const { result } = renderHook(() => useServerFilters());
      const testDate = new Date('2024-01-01');

      act(() => {
        result.current.setFilters({
          search: '',
          searchableField: undefined,
          startDate: testDate,
          endDate: null,
        });
      });

      act(() => {
        result.current.apply();
      });

      expect(result.current.params.start_date).toBe('2024-01-01');
    });

    it('should handle date at end of year', () => {
      const { result } = renderHook(() => useServerFilters());
      const testDate = new Date('2024-12-31');

      act(() => {
        result.current.setFilters({
          search: '',
          searchableField: undefined,
          startDate: testDate,
          endDate: null,
        });
      });

      act(() => {
        result.current.apply();
      });

      expect(result.current.params.start_date).toBe('2024-12-31');
    });
  });

  describe('complex scenarios', () => {
    it('should clear previous filters when applying new empty filters', () => {
      const { result } = renderHook(() => useServerFilters());

      // Apply initial filters
      act(() => {
        result.current.setFilters({
          search: 'test',
          searchableField: 'title',
          startDate: new Date('2024-01-01'),
          endDate: new Date('2024-12-31'),
        });
      });

      act(() => {
        result.current.apply();
      });

      expect(Object.keys(result.current.params).length).toBeGreaterThan(0);

      // Clear filters
      act(() => {
        result.current.setFilters({
          search: '',
          searchableField: undefined,
          startDate: null,
          endDate: null,
        });
      });

      act(() => {
        result.current.apply();
      });

      expect(result.current.params).toEqual({});
    });

    it('should handle multiple consecutive applies', () => {
      const { result } = renderHook(() => useServerFilters());

      act(() => {
        result.current.setFilters({
          search: 'first',
          searchableField: 'title',
          startDate: null,
          endDate: null,
        });
      });

      act(() => {
        result.current.apply();
      });

      const firstVersion = result.current.version;
      const firstParams = result.current.params;

      act(() => {
        result.current.setFilters({
          ...result.current.filters,
          search: 'second',
        });
      });

      act(() => {
        result.current.apply();
      });

      expect(result.current.version).toBe(firstVersion + 1);
      expect(result.current.params.searchable_value).toBe('second');
      expect(result.current.params.searchable_value).not.toBe(firstParams.searchable_value);
    });
  });
});