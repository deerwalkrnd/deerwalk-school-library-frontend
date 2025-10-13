import { RepositoryError } from "@/core/lib/RepositoryError";
import { UseCaseError } from "@/core/lib/UseCaseError";
import IEventRepository from "../domain/repository/IeventRepository";
import { EventRequest, EventResponse } from "../domain/entities/EventEntity";
import { EventRepository } from "../infra/eventRepository";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { QueryKeys } from "@/core/lib/queryKeys";
import { Paginated } from "@/core/lib/Pagination";

export class GetEventsUseCase {
  constructor(private EventRepository: IEventRepository) {}
  async execute(params?: any): Promise<Paginated<EventResponse>> {
    try {
      return await this.EventRepository.getEvents(params);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to fetch events");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}
export class AddEventUseCase {
  constructor(private EventRepository: IEventRepository) {}
  async execute(payload: EventRequest): Promise<EventResponse> {
    try {
      return await this.EventRepository.addEvent(payload);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to add event");
      }
      throw new UseCaseError(`Unexpected error : ${error.message}`);
    }
  }
}
export class GetEventByIdUseCase {
  constructor(private EventRepository: IEventRepository) {}
  async execute(id: string): Promise<EventResponse> {
    try {
      return await this.EventRepository.getEventById(id);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to fetch event");
      }
      throw new UseCaseError(`Unexpected error: ${error.message}`);
    }
  }
}
export class GetEventsByLatestUseCase {
  constructor(private EventRepository: IEventRepository) {}
  async execute(date: string): Promise<EventResponse[]> {
    try {
      return await this.EventRepository.getEventsByLatest(date);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to fetch latest events");
      }
      throw new UseCaseError(`Unexpected error: ${error.message}`);
    }
  }
}
// export class UpdateEventUseCase {
//   constructor(private EventRepository: IEventRepository) {}
//     async execute(payload: EventRequest): Promise<EventResponse> {
//     try {
//       return await this.EventRepository.updateEvent(payload);
//     } catch (error: any) {
//       if (error instanceof RepositoryError) {
//         throw new RepositoryError("Failed to update event");
//       }
//         throw new UseCaseError(`Unexpected error: ${error.message}`);
//     }
//     }
// }
export class DeleteEventUseCase {
  constructor(private EventRepository: IEventRepository) {}
  async execute(id: string): Promise<string> {
    try {
      return await this.EventRepository.deleteEvent(id);
    } catch (error: any) {
      if (error instanceof RepositoryError) {
        throw new RepositoryError("Failed to delete event");
      }
      throw new UseCaseError(`Unexpected error: ${error.message}`);
    }
  }
}

// export const useGetEvents = (params?: any) => {
//   const eventRepository = new EventRepository();
//   const getEventsUseCase = new GetEventsUseCase(eventRepository);
//   return useQuery({
//     queryKey: [QueryKeys.EVENTS, params],
//     queryFn: () => getEventsUseCase.execute(params),
//     keepPreviousData: true,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   });
// };
