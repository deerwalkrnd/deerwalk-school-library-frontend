import {
  UpdateBookRequest,
} from '../UpdateBookEntity';

describe('UpdateBookEntity', () => {
  const validUpdateData = {
    id: 'book-123',
    bookType: 'academic' as const,
    title: 'Advanced Mathematics',
    author: 'Dr. Jane Doe',
    publication: 'Academic Press',
    isbn: '978-1-234-56789-0',
    grade: 'Grade 11',
    genres: [1, 2, 3],
    copies: [
      { unique_identifier: 'ADV-MATH-001' },
      { unique_identifier: 'ADV-MATH-002' },
    ],
    coverImageUrl: 'https://example.com/updated-cover.jpg',
  };

  describe('UpdateBookRequest.create', () => {
    it('should create a valid update request with all fields', () => {
      const request = UpdateBookRequest.create(
        validUpdateData.id,
        validUpdateData.bookType,
        validUpdateData.title,
        validUpdateData.author,
        validUpdateData.publication,
        validUpdateData.isbn,
        validUpdateData.grade,
        validUpdateData.genres,
        validUpdateData.copies,
        validUpdateData.coverImageUrl,
      );

      expect(request.id).toBe(validUpdateData.id);
      expect(request.title.getValue()).toBe(validUpdateData.title);
      expect(request.author.getValue()).toBe(validUpdateData.author);
      expect(request.publication.getValue()).toBe(validUpdateData.publication);
      expect(request.isbn.getValue()).toBe(validUpdateData.isbn);
      expect(request.grade?.getValue()).toBe(validUpdateData.grade);
      expect(request.genres).toEqual(validUpdateData.genres);
      expect(request.coverImageUrl).toBe(validUpdateData.coverImageUrl);
    });

    it('should create update request without coverImageUrl', () => {
      const request = UpdateBookRequest.create(
        validUpdateData.id,
        validUpdateData.bookType,
        validUpdateData.title,
        validUpdateData.author,
        validUpdateData.publication,
        validUpdateData.isbn,
        validUpdateData.grade,
        validUpdateData.genres,
        validUpdateData.copies,
      );

      expect(request.coverImageUrl).toBeUndefined();
    });

    it('should create update request for non-academic book', () => {
      const request = UpdateBookRequest.create(
        'book-456',
        'non_academic',
        'Fiction Novel',
        'Author Name',
        'Publisher',
        '123-456',
        '', // Empty grade for non-academic
        [4, 5],
        [{ unique_identifier: 'FICTION-001' }],
      );

      expect(request.category.getValue()).toBe('NON_ACADEMIC');
      expect(request.grade).toBeNull();
    });

    it('should create update request for reference book', () => {
      const request = UpdateBookRequest.create(
        'ref-789',
        'reference',
        'Encyclopedia',
        'Editorial Board',
        'Reference Press',
        '978-9-876-54321-0',
        'All Grades',
        [],
        [{ unique_identifier: 'ENC-001' }],
        'encyclopedia-cover.jpg',
      );

      expect(request.category.getValue()).toBe('REFERENCE');
      expect(request.grade?.getValue()).toBe('All Grades');
    });

    it('should throw error for invalid title', () => {
      expect(() => UpdateBookRequest.create(
        validUpdateData.id,
        validUpdateData.bookType,
        '', // Invalid title
        validUpdateData.author,
        validUpdateData.publication,
        validUpdateData.isbn,
        validUpdateData.grade,
        validUpdateData.genres,
        validUpdateData.copies,
      )).toThrow('Book title is required');
    });

    it('should throw error for invalid author', () => {
      expect(() => UpdateBookRequest.create(
        validUpdateData.id,
        validUpdateData.bookType,
        validUpdateData.title,
        'X', // Too short
        validUpdateData.publication,
        validUpdateData.isbn,
        validUpdateData.grade,
        validUpdateData.genres,
        validUpdateData.copies,
      )).toThrow('Book author must be at least 2 characters');
    });

    it('should throw error for invalid publication', () => {
      expect(() => UpdateBookRequest.create(
        validUpdateData.id,
        validUpdateData.bookType,
        validUpdateData.title,
        validUpdateData.author,
        'P', // Too short
        validUpdateData.isbn,
        validUpdateData.grade,
        validUpdateData.genres,
        validUpdateData.copies,
      )).toThrow('Publication must be at least 2 characters');
    });

    it('should throw error for empty ISBN', () => {
      expect(() => UpdateBookRequest.create(
        validUpdateData.id,
        validUpdateData.bookType,
        validUpdateData.title,
        validUpdateData.author,
        validUpdateData.publication,
        '', // Empty ISBN
        validUpdateData.grade,
        validUpdateData.genres,
        validUpdateData.copies,
      )).toThrow('ISBN is required');
    });

    it('should throw error for academic book without grade', () => {
      expect(() => UpdateBookRequest.create(
        validUpdateData.id,
        'academic',
        validUpdateData.title,
        validUpdateData.author,
        validUpdateData.publication,
        validUpdateData.isbn,
        '', // Empty grade for academic
        validUpdateData.genres,
        validUpdateData.copies,
      )).toThrow('Grade is required for academic and reference books');
    });

    it('should throw error for empty copies', () => {
      expect(() => UpdateBookRequest.create(
        validUpdateData.id,
        validUpdateData.bookType,
        validUpdateData.title,
        validUpdateData.author,
        validUpdateData.publication,
        validUpdateData.isbn,
        validUpdateData.grade,
        validUpdateData.genres,
        [], // Empty copies
      )).toThrow('At least one book copy is required');
    });

    it('should accept update with single copy', () => {
      const request = UpdateBookRequest.create(
        validUpdateData.id,
        validUpdateData.bookType,
        validUpdateData.title,
        validUpdateData.author,
        validUpdateData.publication,
        validUpdateData.isbn,
        validUpdateData.grade,
        validUpdateData.genres,
        [{ unique_identifier: 'SINGLE-COPY' }],
      );

      expect(request.copies.getCopies().length).toBe(1);
    });

    it('should handle update with empty genres', () => {
      const request = UpdateBookRequest.create(
        validUpdateData.id,
        'academic',
        validUpdateData.title,
        validUpdateData.author,
        validUpdateData.publication,
        validUpdateData.isbn,
        validUpdateData.grade,
        [], // Empty genres
        validUpdateData.copies,
      );

      expect(request.genres).toEqual([]);
    });
  });

  describe('UpdateBookRequest.toJSON', () => {
    it('should convert update request to JSON with all fields', () => {
      const request = UpdateBookRequest.create(
        validUpdateData.id,
        validUpdateData.bookType,
        validUpdateData.title,
        validUpdateData.author,
        validUpdateData.publication,
        validUpdateData.isbn,
        validUpdateData.grade,
        validUpdateData.genres,
        validUpdateData.copies,
        validUpdateData.coverImageUrl,
      );

      const json = request.toJSON();

      expect(json).toEqual({
        id: validUpdateData.id,
        title: validUpdateData.title,
        author: validUpdateData.author,
        publication: validUpdateData.publication,
        isbn: validUpdateData.isbn,
        category: 'ACADEMIC',
        genres: validUpdateData.genres,
        grade: validUpdateData.grade,
        cover_image_url: validUpdateData.coverImageUrl,
        copies: [
          { unique_identifier: 'ADV-MATH-001' },
          { unique_identifier: 'ADV-MATH-002' },
        ],
      });
    });

    it('should convert update request with empty cover_image_url when not provided', () => {
      const request = UpdateBookRequest.create(
        validUpdateData.id,
        validUpdateData.bookType,
        validUpdateData.title,
        validUpdateData.author,
        validUpdateData.publication,
        validUpdateData.isbn,
        validUpdateData.grade,
        validUpdateData.genres,
        validUpdateData.copies,
      );

      const json = request.toJSON();

      expect(json.cover_image_url).toBe('');
    });

    it('should convert non-academic book with empty grade', () => {
      const request = UpdateBookRequest.create(
        'book-789',
        'non_academic',
        'Novel Title',
        'Novel Author',
        'Novel Publisher',
        '123-456-789',
        '', // No grade
        [1, 2],
        [{ unique_identifier: 'NOVEL-001' }],
      );

      const json = request.toJSON();

      expect(json.category).toBe('NON_ACADEMIC');
      expect(json.grade).toBe('');
    });

    it('should preserve all copy identifiers in JSON', () => {
      const multipleCopies = [
        { unique_identifier: 'COPY-A' },
        { unique_identifier: 'COPY-B' },
        { unique_identifier: 'COPY-C' },
      ];

      const request = UpdateBookRequest.create(
        validUpdateData.id,
        validUpdateData.bookType,
        validUpdateData.title,
        validUpdateData.author,
        validUpdateData.publication,
        validUpdateData.isbn,
        validUpdateData.grade,
        validUpdateData.genres,
        multipleCopies,
      );

      const json = request.toJSON();

      expect(json.copies).toEqual(multipleCopies);
      expect(json.copies.length).toBe(3);
    });

    it('should handle special characters in JSON conversion', () => {
      const request = UpdateBookRequest.create(
        'special-123',
        'academic',
        'Math & Science: A Comprehensive Guide',
        'Dr. O\'Brien & Prof. Smith',
        'Education Press, Inc.',
        '978-1-234-56789-0',
        'Grade 10-12',
        [1],
        [{ unique_identifier: 'SPEC-001' }],
        'https://example.com/cover?id=123&type=book',
      );

      const json = request.toJSON();

      expect(json.title).toContain('&');
      expect(json.author).toContain("O'Brien");
      expect(json.cover_image_url).toContain('?');
    });
  });

  describe('UpdateBookRequest properties', () => {
    it('should store id correctly', () => {
      const request = UpdateBookRequest.create(
        'test-id-123',
        validUpdateData.bookType,
        validUpdateData.title,
        validUpdateData.author,
        validUpdateData.publication,
        validUpdateData.isbn,
        validUpdateData.grade,
        validUpdateData.genres,
        validUpdateData.copies,
      );

      expect(request.id).toBe('test-id-123');
    });

    it('should maintain category type correctly', () => {
      const academicRequest = UpdateBookRequest.create(
        'id-1',
        'academic',
        validUpdateData.title,
        validUpdateData.author,
        validUpdateData.publication,
        validUpdateData.isbn,
        'Grade 10',
        [],
        validUpdateData.copies,
      );

      const nonAcademicRequest = UpdateBookRequest.create(
        'id-2',
        'non_academic',
        validUpdateData.title,
        validUpdateData.author,
        validUpdateData.publication,
        validUpdateData.isbn,
        '',
        [1],
        validUpdateData.copies,
      );

      expect(academicRequest.category.getValue()).toBe('ACADEMIC');
      expect(nonAcademicRequest.category.getValue()).toBe('NON_ACADEMIC');
    });

    it('should handle optional coverImageUrl correctly', () => {
      const withCover = UpdateBookRequest.create(
        validUpdateData.id,
        validUpdateData.bookType,
        validUpdateData.title,
        validUpdateData.author,
        validUpdateData.publication,
        validUpdateData.isbn,
        validUpdateData.grade,
        validUpdateData.genres,
        validUpdateData.copies,
        'cover.jpg',
      );

      const withoutCover = UpdateBookRequest.create(
        validUpdateData.id,
        validUpdateData.bookType,
        validUpdateData.title,
        validUpdateData.author,
        validUpdateData.publication,
        validUpdateData.isbn,
        validUpdateData.grade,
        validUpdateData.genres,
        validUpdateData.copies,
      );

      expect(withCover.coverImageUrl).toBe('cover.jpg');
      expect(withoutCover.coverImageUrl).toBeUndefined();
    });
  });
});