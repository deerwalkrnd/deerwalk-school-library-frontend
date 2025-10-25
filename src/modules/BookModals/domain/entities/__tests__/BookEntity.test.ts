import {
  BookTitle,
  BookAuthor,
  BookISBN,
  BookPublication,
  BookCategory,
  BookGrade,
  BookCopy,
  BookCopies,
  CreateBookRequest,
} from '../BookEntity';

describe('BookEntity', () => {
  describe('BookTitle', () => {
    describe('create', () => {
      it('should create a valid book title', () => {
        const title = BookTitle.create('The Great Gatsby');
        expect(title.getValue()).toBe('The Great Gatsby');
      });

      it('should trim whitespace from title', () => {
        const title = BookTitle.create('  The Great Gatsby  ');
        expect(title.getValue()).toBe('The Great Gatsby');
      });

      it('should throw error for empty title', () => {
        expect(() => BookTitle.create('')).toThrow('Book title is required');
      });

      it('should throw error for whitespace-only title', () => {
        expect(() => BookTitle.create('   ')).toThrow('Book title is required');
      });

      it('should throw error for title less than 2 characters', () => {
        expect(() => BookTitle.create('A')).toThrow('Book title must be at least 2 characters');
      });

      it('should accept title with exactly 2 characters', () => {
        const title = BookTitle.create('Ab');
        expect(title.getValue()).toBe('Ab');
      });

      it('should throw error for title exceeding 200 characters', () => {
        const longTitle = 'a'.repeat(201);
        expect(() => BookTitle.create(longTitle)).toThrow('Book title cannot exceed 200 characters');
      });

      it('should accept title with exactly 200 characters', () => {
        const maxTitle = 'a'.repeat(200);
        const title = BookTitle.create(maxTitle);
        expect(title.getValue()).toBe(maxTitle);
      });

      it('should handle titles with special characters', () => {
        const title = BookTitle.create('Book: A Tale of Two Cities & More!');
        expect(title.getValue()).toBe('Book: A Tale of Two Cities & More!');
      });

      it('should handle titles with numbers', () => {
        const title = BookTitle.create('1984');
        expect(title.getValue()).toBe('1984');
      });

      it('should handle unicode characters', () => {
        const title = BookTitle.create('数学教科書 📚');
        expect(title.getValue()).toBe('数学教科书 📚');
      });
    });

    describe('getValue', () => {
      it('should return the stored title value', () => {
        const title = BookTitle.create('Test Title');
        expect(title.getValue()).toBe('Test Title');
      });
    });
  });

  describe('BookAuthor', () => {
    describe('create', () => {
      it('should create a valid book author', () => {
        const author = BookAuthor.create('J.K. Rowling');
        expect(author.getValue()).toBe('J.K. Rowling');
      });

      it('should trim whitespace from author', () => {
        const author = BookAuthor.create('  Stephen King  ');
        expect(author.getValue()).toBe('Stephen King');
      });

      it('should throw error for empty author', () => {
        expect(() => BookAuthor.create('')).toThrow('Book author is required');
      });

      it('should throw error for whitespace-only author', () => {
        expect(() => BookAuthor.create('   ')).toThrow('Book author is required');
      });

      it('should throw error for author less than 2 characters', () => {
        expect(() => BookAuthor.create('A')).toThrow('Book author must be at least 2 characters');
      });

      it('should accept author with exactly 2 characters', () => {
        const author = BookAuthor.create('AB');
        expect(author.getValue()).toBe('AB');
      });

      it('should throw error for author exceeding 100 characters', () => {
        const longAuthor = 'a'.repeat(101);
        expect(() => BookAuthor.create(longAuthor)).toThrow('Book author cannot exceed 100 characters');
      });

      it('should accept author with exactly 100 characters', () => {
        const maxAuthor = 'a'.repeat(100);
        const author = BookAuthor.create(maxAuthor);
        expect(author.getValue()).toBe(maxAuthor);
      });

      it('should handle author names with special characters', () => {
        const author = BookAuthor.create("O'Brien, Patrick");
        expect(author.getValue()).toBe("O'Brien, Patrick");
      });

      it('should handle multiple authors', () => {
        const author = BookAuthor.create('John Doe & Jane Smith');
        expect(author.getValue()).toBe('John Doe & Jane Smith');
      });
    });

    describe('getValue', () => {
      it('should return the stored author value', () => {
        const author = BookAuthor.create('Test Author');
        expect(author.getValue()).toBe('Test Author');
      });
    });
  });

  describe('BookISBN', () => {
    describe('create', () => {
      it('should create a valid ISBN', () => {
        const isbn = BookISBN.create('978-3-16-148410-0');
        expect(isbn.getValue()).toBe('978-3-16-148410-0');
      });

      it('should trim whitespace from ISBN', () => {
        const isbn = BookISBN.create('  978-3-16-148410-0  ');
        expect(isbn.getValue()).toBe('978-3-16-148410-0');
      });

      it('should throw error for empty ISBN', () => {
        expect(() => BookISBN.create('')).toThrow('ISBN is required');
      });

      it('should throw error for whitespace-only ISBN', () => {
        expect(() => BookISBN.create('   ')).toThrow('ISBN is required');
      });

      it('should accept ISBN-10 format', () => {
        const isbn = BookISBN.create('0-306-40615-2');
        expect(isbn.getValue()).toBe('0-306-40615-2');
      });

      it('should accept ISBN-13 format', () => {
        const isbn = BookISBN.create('978-0-306-40615-7');
        expect(isbn.getValue()).toBe('978-0-306-40615-7');
      });

      it('should accept ISBN without hyphens', () => {
        const isbn = BookISBN.create('9780306406157');
        expect(isbn.getValue()).toBe('9780306406157');
      });

      it('should accept alphanumeric ISBN', () => {
        const isbn = BookISBN.create('ISBN-123-ABC-456');
        expect(isbn.getValue()).toBe('ISBN-123-ABC-456');
      });
    });

    describe('getValue', () => {
      it('should return the stored ISBN value', () => {
        const isbn = BookISBN.create('978-3-16-148410-0');
        expect(isbn.getValue()).toBe('978-3-16-148410-0');
      });
    });
  });

  describe('BookPublication', () => {
    describe('create', () => {
      it('should create a valid publication', () => {
        const publication = BookPublication.create('Penguin Books');
        expect(publication.getValue()).toBe('Penguin Books');
      });

      it('should trim whitespace from publication', () => {
        const publication = BookPublication.create('  HarperCollins  ');
        expect(publication.getValue()).toBe('HarperCollins');
      });

      it('should throw error for empty publication', () => {
        expect(() => BookPublication.create('')).toThrow('Publication is required');
      });

      it('should throw error for whitespace-only publication', () => {
        expect(() => BookPublication.create('   ')).toThrow('Publication is required');
      });

      it('should throw error for publication less than 2 characters', () => {
        expect(() => BookPublication.create('A')).toThrow('Publication must be at least 2 characters');
      });

      it('should accept publication with exactly 2 characters', () => {
        const publication = BookPublication.create('AB');
        expect(publication.getValue()).toBe('AB');
      });

      it('should handle publication names with special characters', () => {
        const publication = BookPublication.create('O\'Reilly Media, Inc.');
        expect(publication.getValue()).toBe('O\'Reilly Media, Inc.');
      });

      it('should handle long publication names', () => {
        const publication = BookPublication.create('Random House Publishing Group');
        expect(publication.getValue()).toBe('Random House Publishing Group');
      });
    });

    describe('getValue', () => {
      it('should return the stored publication value', () => {
        const publication = BookPublication.create('Test Publisher');
        expect(publication.getValue()).toBe('Test Publisher');
      });
    });
  });

  describe('BookCategory', () => {
    describe('fromBookType', () => {
      it('should create ACADEMIC category from academic type', () => {
        const category = BookCategory.fromBookType('academic');
        expect(category.getValue()).toBe('ACADEMIC');
      });

      it('should create NON_ACADEMIC category from non_academic type', () => {
        const category = BookCategory.fromBookType('non_academic');
        expect(category.getValue()).toBe('NON_ACADEMIC');
      });

      it('should create REFERENCE category from reference type', () => {
        const category = BookCategory.fromBookType('reference');
        expect(category.getValue()).toBe('REFERENCE');
      });
    });

    describe('requiresGrade', () => {
      it('should return true for ACADEMIC category', () => {
        const category = BookCategory.fromBookType('academic');
        expect(category.requiresGrade()).toBe(true);
      });

      it('should return true for REFERENCE category', () => {
        const category = BookCategory.fromBookType('reference');
        expect(category.requiresGrade()).toBe(true);
      });

      it('should return false for NON_ACADEMIC category', () => {
        const category = BookCategory.fromBookType('non_academic');
        expect(category.requiresGrade()).toBe(false);
      });
    });

    describe('requiresGenres', () => {
      it('should return true for NON_ACADEMIC category', () => {
        const category = BookCategory.fromBookType('non_academic');
        expect(category.requiresGenres()).toBe(true);
      });

      it('should return false for ACADEMIC category', () => {
        const category = BookCategory.fromBookType('academic');
        expect(category.requiresGenres()).toBe(false);
      });

      it('should return false for REFERENCE category', () => {
        const category = BookCategory.fromBookType('reference');
        expect(category.requiresGenres()).toBe(false);
      });
    });

    describe('getValue', () => {
      it('should return ACADEMIC for academic type', () => {
        const category = BookCategory.fromBookType('academic');
        expect(category.getValue()).toBe('ACADEMIC');
      });

      it('should return NON_ACADEMIC for non_academic type', () => {
        const category = BookCategory.fromBookType('non_academic');
        expect(category.getValue()).toBe('NON_ACADEMIC');
      });

      it('should return REFERENCE for reference type', () => {
        const category = BookCategory.fromBookType('reference');
        expect(category.getValue()).toBe('REFERENCE');
      });
    });
  });

  describe('BookGrade', () => {
    describe('create', () => {
      it('should create a valid grade', () => {
        const grade = BookGrade.create('Grade 10');
        expect(grade.getValue()).toBe('Grade 10');
      });

      it('should trim whitespace from grade', () => {
        const grade = BookGrade.create('  Grade 12  ');
        expect(grade.getValue()).toBe('Grade 12');
      });

      it('should throw error for empty grade', () => {
        expect(() => BookGrade.create('')).toThrow('Grade is required for academic and reference books');
      });

      it('should throw error for whitespace-only grade', () => {
        expect(() => BookGrade.create('   ')).toThrow('Grade is required for academic and reference books');
      });

      it('should accept numeric grades', () => {
        const grade = BookGrade.create('10');
        expect(grade.getValue()).toBe('10');
      });

      it('should accept alphanumeric grades', () => {
        const grade = BookGrade.create('Class 5A');
        expect(grade.getValue()).toBe('Class 5A');
      });

      it('should accept grade ranges', () => {
        const grade = BookGrade.create('Grade 9-12');
        expect(grade.getValue()).toBe('Grade 9-12');
      });
    });

    describe('getValue', () => {
      it('should return the stored grade value', () => {
        const grade = BookGrade.create('Grade 8');
        expect(grade.getValue()).toBe('Grade 8');
      });
    });
  });

  describe('BookCopy', () => {
    describe('create', () => {
      it('should create a valid book copy', () => {
        const copy = BookCopy.create('BOOK-001');
        expect(copy.getUniqueIdentifier()).toBe('BOOK-001');
      });

      it('should trim whitespace from unique identifier', () => {
        const copy = BookCopy.create('  BOOK-002  ');
        expect(copy.getUniqueIdentifier()).toBe('BOOK-002');
      });

      it('should throw error for empty unique identifier', () => {
        expect(() => BookCopy.create('')).toThrow('Book copy unique identifier is required');
      });

      it('should throw error for whitespace-only unique identifier', () => {
        expect(() => BookCopy.create('   ')).toThrow('Book copy unique identifier is required');
      });

      it('should accept alphanumeric identifiers', () => {
        const copy = BookCopy.create('ABC123XYZ');
        expect(copy.getUniqueIdentifier()).toBe('ABC123XYZ');
      });

      it('should accept identifiers with special characters', () => {
        const copy = BookCopy.create('BOOK-2024-001');
        expect(copy.getUniqueIdentifier()).toBe('BOOK-2024-001');
      });
    });

    describe('getUniqueIdentifier', () => {
      it('should return the stored unique identifier', () => {
        const copy = BookCopy.create('TEST-001');
        expect(copy.getUniqueIdentifier()).toBe('TEST-001');
      });
    });
  });

  describe('BookCopies', () => {
    describe('create', () => {
      it('should create book copies from valid array', () => {
        const copies = BookCopies.create([
          { unique_identifier: 'COPY-001' },
          { unique_identifier: 'COPY-002' },
        ]);
        
        expect(copies.getCopies().length).toBe(2);
        expect(copies.getCopies()[0].getUniqueIdentifier()).toBe('COPY-001');
        expect(copies.getCopies()[1].getUniqueIdentifier()).toBe('COPY-002');
      });

      it('should throw error for empty copies array', () => {
        expect(() => BookCopies.create([])).toThrow('At least one book copy is required');
      });

      it('should throw error if any copy has invalid identifier', () => {
        expect(() => BookCopies.create([
          { unique_identifier: 'COPY-001' },
          { unique_identifier: '' },
        ])).toThrow('Book copy unique identifier is required');
      });

      it('should handle single copy', () => {
        const copies = BookCopies.create([{ unique_identifier: 'SINGLE-COPY' }]);
        expect(copies.getCopies().length).toBe(1);
        expect(copies.getCopies()[0].getUniqueIdentifier()).toBe('SINGLE-COPY');
      });

      it('should handle multiple copies', () => {
        const copyData = Array.from({ length: 5 }, (_, i) => ({
          unique_identifier: `COPY-${i + 1}`,
        }));
        
        const copies = BookCopies.create(copyData);
        expect(copies.getCopies().length).toBe(5);
      });

      it('should trim whitespace from all copy identifiers', () => {
        const copies = BookCopies.create([
          { unique_identifier: '  COPY-001  ' },
          { unique_identifier: '  COPY-002  ' },
        ]);
        
        expect(copies.getCopies()[0].getUniqueIdentifier()).toBe('COPY-001');
        expect(copies.getCopies()[1].getUniqueIdentifier()).toBe('COPY-002');
      });
    });

    describe('getCopies', () => {
      it('should return array of BookCopy instances', () => {
        const copies = BookCopies.create([
          { unique_identifier: 'COPY-001' },
        ]);
        
        const copiesArray = copies.getCopies();
        expect(Array.isArray(copiesArray)).toBe(true);
        expect(copiesArray[0]).toBeInstanceOf(BookCopy);
      });
    });

    describe('toJSON', () => {
      it('should convert copies to JSON format', () => {
        const copies = BookCopies.create([
          { unique_identifier: 'COPY-001' },
          { unique_identifier: 'COPY-002' },
        ]);
        
        const json = copies.toJSON();
        expect(json).toEqual([
          { unique_identifier: 'COPY-001' },
          { unique_identifier: 'COPY-002' },
        ]);
      });

      it('should return empty array for single copy', () => {
        const copies = BookCopies.create([{ unique_identifier: 'SINGLE' }]);
        const json = copies.toJSON();
        
        expect(json).toEqual([{ unique_identifier: 'SINGLE' }]);
      });
    });
  });

  describe('CreateBookRequest', () => {
    const validBookData = {
      bookType: 'academic' as const,
      title: 'Mathematics Grade 10',
      author: 'John Smith',
      publication: 'Education Press',
      isbn: '978-1-234-56789-0',
      grade: 'Grade 10',
      genres: [1, 2],
      coverImageUrl: 'https://example.com/cover.jpg',
      copies: [
        { unique_identifier: 'MATH-001' },
        { unique_identifier: 'MATH-002' },
      ],
    };

    describe('create', () => {
      it('should create a valid academic book request', () => {
        const request = CreateBookRequest.create(
          validBookData.bookType,
          validBookData.title,
          validBookData.author,
          validBookData.publication,
          validBookData.isbn,
          validBookData.grade,
          validBookData.genres,
          validBookData.coverImageUrl,
          validBookData.copies,
        );

        expect(request.title.getValue()).toBe(validBookData.title);
        expect(request.author.getValue()).toBe(validBookData.author);
        expect(request.publication.getValue()).toBe(validBookData.publication);
        expect(request.isbn.getValue()).toBe(validBookData.isbn);
        expect(request.grade?.getValue()).toBe(validBookData.grade);
        expect(request.genres).toEqual(validBookData.genres);
        expect(request.coverImageUrl).toBe(validBookData.coverImageUrl);
      });

      it('should create a valid non-academic book without grade', () => {
        const request = CreateBookRequest.create(
          'non_academic',
          'Harry Potter',
          'J.K. Rowling',
          'Bloomsbury',
          '978-0-7475-3269-9',
          '', // Empty grade for non-academic
          [3, 4, 5],
          'https://example.com/hp.jpg',
          [{ unique_identifier: 'HP-001' }],
        );

        expect(request.title.getValue()).toBe('Harry Potter');
        expect(request.grade).toBeNull();
        expect(request.genres).toEqual([3, 4, 5]);
      });

      it('should create a valid reference book with grade', () => {
        const request = CreateBookRequest.create(
          'reference',
          'Oxford Dictionary',
          'Oxford University Press',
          'Oxford',
          '978-0-19-861368-0',
          'All Grades',
          [],
          'https://example.com/dict.jpg',
          [{ unique_identifier: 'DICT-001' }],
        );

        expect(request.category.getValue()).toBe('REFERENCE');
        expect(request.grade?.getValue()).toBe('All Grades');
      });

      it('should throw error for invalid title', () => {
        expect(() => CreateBookRequest.create(
          validBookData.bookType,
          '', // Invalid title
          validBookData.author,
          validBookData.publication,
          validBookData.isbn,
          validBookData.grade,
          validBookData.genres,
          validBookData.coverImageUrl,
          validBookData.copies,
        )).toThrow('Book title is required');
      });

      it('should throw error for invalid author', () => {
        expect(() => CreateBookRequest.create(
          validBookData.bookType,
          validBookData.title,
          'A', // Invalid author (too short)
          validBookData.publication,
          validBookData.isbn,
          validBookData.grade,
          validBookData.genres,
          validBookData.coverImageUrl,
          validBookData.copies,
        )).toThrow('Book author must be at least 2 characters');
      });

      it('should throw error for academic book without grade', () => {
        expect(() => CreateBookRequest.create(
          'academic',
          validBookData.title,
          validBookData.author,
          validBookData.publication,
          validBookData.isbn,
          '', // Empty grade for academic book
          validBookData.genres,
          validBookData.coverImageUrl,
          validBookData.copies,
        )).toThrow('Grade is required for academic and reference books');
      });

      it('should throw error for empty copies', () => {
        expect(() => CreateBookRequest.create(
          validBookData.bookType,
          validBookData.title,
          validBookData.author,
          validBookData.publication,
          validBookData.isbn,
          validBookData.grade,
          validBookData.genres,
          validBookData.coverImageUrl,
          [], // Empty copies
        )).toThrow('At least one book copy is required');
      });

      it('should accept empty genres array', () => {
        const request = CreateBookRequest.create(
          'academic',
          validBookData.title,
          validBookData.author,
          validBookData.publication,
          validBookData.isbn,
          validBookData.grade,
          [], // Empty genres
          validBookData.coverImageUrl,
          validBookData.copies,
        );

        expect(request.genres).toEqual([]);
      });
    });

    describe('toJSON', () => {
      it('should convert academic book to JSON format', () => {
        const request = CreateBookRequest.create(
          validBookData.bookType,
          validBookData.title,
          validBookData.author,
          validBookData.publication,
          validBookData.isbn,
          validBookData.grade,
          validBookData.genres,
          validBookData.coverImageUrl,
          validBookData.copies,
        );

        const json = request.toJSON();

        expect(json).toEqual({
          title: validBookData.title,
          author: validBookData.author,
          publication: validBookData.publication,
          isbn: validBookData.isbn,
          category: 'ACADEMIC',
          genres: validBookData.genres,
          grade: validBookData.grade,
          cover_image_url: validBookData.coverImageUrl,
          copies: [
            { unique_identifier: 'MATH-001' },
            { unique_identifier: 'MATH-002' },
          ],
        });
      });

      it('should convert non-academic book to JSON with empty grade', () => {
        const request = CreateBookRequest.create(
          'non_academic',
          'Fiction Book',
          'Author Name',
          'Publisher',
          '123-456',
          '', // No grade for non-academic
          [1],
          'cover.jpg',
          [{ unique_identifier: 'COPY-1' }],
        );

        const json = request.toJSON();

        expect(json.grade).toBe('');
        expect(json.category).toBe('NON_ACADEMIC');
      });
    });
  });
});