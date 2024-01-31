import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface Book {
  etag: string;
  id: string;
  volumeInfo: {
    title: string;
    authors: [string];
    categories: [string];
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
  };
}

interface BooksContextType {
  books: Book[];
  setBooks: Dispatch<SetStateAction<Book[]>>;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

interface BooksProviderProps {
  children: ReactNode;
}

export const BooksProvider: React.FC<BooksProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);

  const contextValue: BooksContextType = {
    books,
    setBooks,
  };

  return (
    <BooksContext.Provider value={contextValue}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooksContext = (): BooksContextType => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useBooksContext must be used within a BooksProvider");
  }
  return context;
};
