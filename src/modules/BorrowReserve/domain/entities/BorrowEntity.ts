export interface BorrowRequest {
  times_renewable: number;
  fine_enabled: boolean;
  due_date: string;
  user_uuid: string;
}


export interface RenewRequest {
  new_due_date: string;
  fine_collected: number;
}

export interface ReturnRequest {
  fine_paid: boolean;
  returned_date: string;
  remark: string;
}
