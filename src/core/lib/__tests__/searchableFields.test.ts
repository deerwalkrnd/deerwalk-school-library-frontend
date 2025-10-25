import {
  TABLE_FIELD_MAPPINGS,
  getSearchableFieldsForTable,
  getDefaultSearchableField,
  createSearchableFieldsFromColumns,
  getSearchableFieldsFromColumns,
  TableType,
} from '../searchableFields';

describe('searchableFields', () => {
  describe('TABLE_FIELD_MAPPINGS', () => {
    it('should contain all required table types', () => {
      const requiredTables: TableType[] = [
        'books',
        'users',
        'issueBooks',
        'returnBooks',
        'overdues',
        'feedback',
      ];

      requiredTables.forEach(table => {
        expect(TABLE_FIELD_MAPPINGS[table]).toBeDefined();
        expect(Array.isArray(TABLE_FIELD_MAPPINGS[table])).toBe(true);
        expect(TABLE_FIELD_MAPPINGS[table].length).toBeGreaterThan(0);
      });
    });

    it('should have valid field structure for books', () => {
      const bookFields = TABLE_FIELD_MAPPINGS.books;
      
      expect(bookFields).toContainEqual({ value: 'title', label: 'Book Title' });
      expect(bookFields).toContainEqual({ value: 'author', label: 'Author' });
      expect(bookFields).toContainEqual({ value: 'publication', label: 'Publication' });
      expect(bookFields).toContainEqual({ value: 'isbn', label: 'ISBN' });
      expect(bookFields).toContainEqual({ value: 'category', label: 'Category' });
      expect(bookFields).toContainEqual({ value: 'grade', label: 'Grade' });
      expect(bookFields).toContainEqual({ value: 'genre', label: 'Genre' });
    });

    it('should have valid field structure for users', () => {
      const userFields = TABLE_FIELD_MAPPINGS.users;
      
      expect(userFields).toContainEqual({ value: 'name', label: 'Student Name' });
      expect(userFields).toContainEqual({ value: 'roll_number', label: 'Roll Number' });
      expect(userFields).toContainEqual({ value: 'graduating_year', label: 'Graduating Year' });
      expect(userFields).toContainEqual({ value: 'email', label: 'Email' });
      expect(userFields).toContainEqual({ value: 'role', label: 'Role' });
    });

    it('should have valid field structure for issueBooks', () => {
      const issueBookFields = TABLE_FIELD_MAPPINGS.issueBooks;
      
      expect(issueBookFields.some(f => f.value === 'book_title')).toBe(true);
      expect(issueBookFields.some(f => f.value === 'student_name')).toBe(true);
      expect(issueBookFields.some(f => f.value === 'borrowed_date')).toBe(true);
    });

    it('should have valid field structure for returnBooks', () => {
      const returnBookFields = TABLE_FIELD_MAPPINGS.returnBooks;
      
      expect(returnBookFields.some(f => f.value === 'book_title')).toBe(true);
      expect(returnBookFields.some(f => f.value === 'student_name')).toBe(true);
      expect(returnBookFields.some(f => f.value === 'returned_date')).toBe(true);
      expect(returnBookFields.some(f => f.value === 'fine')).toBe(true);
    });

    it('should have valid field structure for overdues', () => {
      const overdueFields = TABLE_FIELD_MAPPINGS.overdues;
      
      expect(overdueFields.some(f => f.value === 'due_date')).toBe(true);
      expect(overdueFields.some(f => f.value === 'overdue_days')).toBe(true);
    });

    it('should have valid field structure for feedback', () => {
      const feedbackFields = TABLE_FIELD_MAPPINGS.feedback;
      
      expect(feedbackFields.some(f => f.value === 'name')).toBe(true);
    });
  });

  describe('getSearchableFieldsForTable', () => {
    it('should return correct fields for books table', () => {
      const fields = getSearchableFieldsForTable('books');
      
      expect(fields.length).toBe(7);
      expect(fields).toEqual(TABLE_FIELD_MAPPINGS.books);
    });

    it('should return correct fields for users table', () => {
      const fields = getSearchableFieldsForTable('users');
      
      expect(fields.length).toBe(5);
      expect(fields).toEqual(TABLE_FIELD_MAPPINGS.users);
    });

    it('should return array for all valid table types', () => {
      const tableTypes: TableType[] = [
        'books',
        'users',
        'issueBooks',
        'returnBooks',
        'overdues',
        'feedback',
      ];

      tableTypes.forEach(tableType => {
        const fields = getSearchableFieldsForTable(tableType);
        expect(Array.isArray(fields)).toBe(true);
        expect(fields.length).toBeGreaterThan(0);
      });
    });

    it('should return empty array for undefined table type', () => {
      const fields = getSearchableFieldsForTable('nonexistent' as TableType);
      expect(fields).toEqual([]);
    });

    it('should return new array instance each time', () => {
      const fields1 = getSearchableFieldsForTable('books');
      const fields2 = getSearchableFieldsForTable('books');
      
      expect(fields1).toEqual(fields2);
      expect(fields1).not.toBe(fields2); // Different instances
    });
  });

  describe('getDefaultSearchableField', () => {
    it('should return first field value for books', () => {
      const defaultField = getDefaultSearchableField('books');
      expect(defaultField).toBe('title');
    });

    it('should return first field value for users', () => {
      const defaultField = getDefaultSearchableField('users');
      expect(defaultField).toBe('name');
    });

    it('should return first field value for issueBooks', () => {
      const defaultField = getDefaultSearchableField('issueBooks');
      expect(defaultField).toBe('book_title');
    });

    it('should return first field value for returnBooks', () => {
      const defaultField = getDefaultSearchableField('returnBooks');
      expect(defaultField).toBe('book_title');
    });

    it('should return first field value for overdues', () => {
      const defaultField = getDefaultSearchableField('overdues');
      expect(defaultField).toBe('book_title');
    });

    it('should return first field value for feedback', () => {
      const defaultField = getDefaultSearchableField('feedback');
      expect(defaultField).toBe('name');
    });
  });

  describe('createSearchableFieldsFromColumns', () => {
    it('should create searchable fields from column definitions', () => {
      const columns = [
        { accessorKey: 'name', header: 'Name' },
        { accessorKey: 'email', header: 'Email' },
        { accessorKey: 'role', header: 'Role' },
      ];

      const fields = createSearchableFieldsFromColumns(columns);

      expect(fields).toEqual([
        { value: 'name', label: 'Name' },
        { value: 'email', label: 'Email' },
        { value: 'role', label: 'Role' },
      ]);
    });

    it('should filter out id column', () => {
      const columns = [
        { accessorKey: 'id', header: 'ID' },
        { accessorKey: 'name', header: 'Name' },
        { accessorKey: 'email', header: 'Email' },
      ];

      const fields = createSearchableFieldsFromColumns(columns);

      expect(fields).toEqual([
        { value: 'name', label: 'Name' },
        { value: 'email', label: 'Email' },
      ]);
      expect(fields.some(f => f.value === 'id')).toBe(false);
    });

    it('should filter out action column', () => {
      const columns = [
        { accessorKey: 'name', header: 'Name' },
        { accessorKey: 'action', header: 'Actions' },
      ];

      const fields = createSearchableFieldsFromColumns(columns);

      expect(fields).toEqual([{ value: 'name', label: 'Name' }]);
      expect(fields.some(f => f.value === 'action')).toBe(false);
    });

    it('should filter out sn column', () => {
      const columns = [
        { accessorKey: 'sn', header: 'S.N.' },
        { accessorKey: 'name', header: 'Name' },
      ];

      const fields = createSearchableFieldsFromColumns(columns);

      expect(fields).toEqual([{ value: 'name', label: 'Name' }]);
      expect(fields.some(f => f.value === 'sn')).toBe(false);
    });

    it('should skip columns without accessorKey', () => {
      const columns = [
        { accessorKey: 'name', header: 'Name' },
        { header: 'Custom Column' },
      ];

      const fields = createSearchableFieldsFromColumns(columns);

      expect(fields).toEqual([{ value: 'name', label: 'Name' }]);
      expect(fields.length).toBe(1);
    });

    it('should handle function headers by using accessorKey as label', () => {
      const columns = [
        { accessorKey: 'name', header: (props: any) => 'Name' },
        { accessorKey: 'email', header: 'Email' },
      ];

      const fields = createSearchableFieldsFromColumns(columns);

      expect(fields).toEqual([
        { value: 'name', label: 'name' },
        { value: 'email', label: 'Email' },
      ]);
    });

    it('should return empty array for empty columns', () => {
      const fields = createSearchableFieldsFromColumns([]);
      expect(fields).toEqual([]);
    });

    it('should handle mixed column types', () => {
      const columns = [
        { accessorKey: 'id', header: 'ID' },
        { accessorKey: 'name', header: 'Name' },
        { header: 'Custom' },
        { accessorKey: 'action', header: 'Action' },
        { accessorKey: 'email', header: (props: any) => 'Email' },
      ];

      const fields = createSearchableFieldsFromColumns(columns);

      expect(fields).toEqual([
        { value: 'name', label: 'Name' },
        { value: 'email', label: 'email' },
      ]);
    });
  });

  describe('getSearchableFieldsFromColumns', () => {
    it('should call createColumnsFn and create searchable fields', () => {
      const createColumnsFn = jest.fn(() => [
        { accessorKey: 'name', header: 'Name' },
        { accessorKey: 'email', header: 'Email' },
      ]);

      const fields = getSearchableFieldsFromColumns(createColumnsFn);

      expect(createColumnsFn).toHaveBeenCalled();
      expect(fields).toEqual([
        { value: 'name', label: 'Name' },
        { value: 'email', label: 'Email' },
      ]);
    });

    it('should handle columns function with arguments', () => {
      const createColumnsFn = jest.fn((...args: any[]) => [
        { accessorKey: 'title', header: 'Title' },
      ]);

      const fields = getSearchableFieldsFromColumns(createColumnsFn);

      expect(fields).toEqual([{ value: 'title', label: 'Title' }]);
    });

    it('should return empty array if createColumnsFn returns empty array', () => {
      const createColumnsFn = jest.fn(() => []);

      const fields = getSearchableFieldsFromColumns(createColumnsFn);

      expect(fields).toEqual([]);
    });
  });

  describe('field value and label consistency', () => {
    it('should have unique values within each table type', () => {
      Object.keys(TABLE_FIELD_MAPPINGS).forEach(tableType => {
        const fields = TABLE_FIELD_MAPPINGS[tableType as TableType];
        const values = fields.map(f => f.value);
        const uniqueValues = new Set(values);
        
        expect(uniqueValues.size).toBe(values.length);
      });
    });

    it('should have non-empty labels for all fields', () => {
      Object.keys(TABLE_FIELD_MAPPINGS).forEach(tableType => {
        const fields = TABLE_FIELD_MAPPINGS[tableType as TableType];
        
        fields.forEach(field => {
          expect(field.label).toBeDefined();
          expect(field.label.length).toBeGreaterThan(0);
        });
      });
    });

    it('should use snake_case for field values', () => {
      Object.keys(TABLE_FIELD_MAPPINGS).forEach(tableType => {
        const fields = TABLE_FIELD_MAPPINGS[tableType as TableType];
        
        fields.forEach(field => {
          // Check if value contains only lowercase letters, numbers, and underscores
          expect(field.value).toMatch(/^[a-z0-9_]+$/);
        });
      });
    });
  });
});