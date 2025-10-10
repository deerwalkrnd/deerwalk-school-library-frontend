import { Paginated } from "@/core/lib/Pagination";
import { QuoteRequest, QuoteResponse } from "../entities/QuoteEntity";

export default interface IQuoteRepository {
  getQuotes(params?: any): Promise<Paginated<QuoteResponse>>;
  addQuote(payload: QuoteRequest): Promise<QuoteResponse>;
  //   updateQuote(payload: QuoteRequest): Promise<QuoteResponse>;
  //   getQuoteById(id: string): Promise<QuoteResponse>;
  deleteQuote(id: string): Promise<string>;
}
