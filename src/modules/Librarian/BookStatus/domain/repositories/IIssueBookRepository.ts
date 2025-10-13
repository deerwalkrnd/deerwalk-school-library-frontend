import { Paginated } from "@/core/lib/Pagination";

export default interface IissueRepository {
  getIssues(params?: any): Promise<Paginated<any>>;
  issueBook(payload: any): Promise<any>;
  deleteIssue(id: any): Promise<any>;
}
