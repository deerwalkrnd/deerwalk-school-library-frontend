import { Paginated } from "@/core/lib/Pagination";
import { EventRequest, EventResponse } from "../entities/EventEntity";

export default interface IEventRepository {
  getEvents(params?: any): Promise<Paginated<EventResponse>>;
  addEvent(payload: EventRequest): Promise<EventResponse>;
  //   updateEvent(payload: EventRequest): Promise<EventResponse>;
  getEventById(id: string): Promise<EventResponse>;
  getEventsByLatest(date: string): Promise<EventResponse[]>;
  deleteEvent(id: string): Promise<string>;
}
