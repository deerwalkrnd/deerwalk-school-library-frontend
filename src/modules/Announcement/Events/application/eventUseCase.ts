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

export const getEvents = (params?: { page?: number; limit?: number }) => {
  const eventRepository = new EventRepository();
  const useCase = new GetEventsUseCase(eventRepository);
  return useQuery({
    queryKey: [QueryKeys.EVENTS, params?.page, params?.limit],
    queryFn: () => useCase.execute(params),
    retry: 3,
  });
};

export const getEventById = (id: string) => {
  const eventRepository = new EventRepository();
  const useCase = new GetEventByIdUseCase(eventRepository);

  return useQuery({
    queryKey: [QueryKeys.EVENTS, id],
    queryFn: () => useCase.execute(id),
    retry: 2,
  });
};

export const getEventsByLatest = (date: string) => {
  const eventRepository = new EventRepository();
  const useCase = new GetEventsByLatestUseCase(eventRepository);

  return useQuery({
    queryKey: [QueryKeys.EVENTS, "latest", date],
    queryFn: () => useCase.execute(date),
    retry: 2,
  });
};

export const addEvent = (queryClient: QueryClient) => {
  const eventRepository = new EventRepository();
  const useCase = new AddEventUseCase(eventRepository);

  return useMutation({
    mutationFn: (payload: EventRequest) => useCase.execute(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.EVENTS] });
    },
  });
};

// export const updateEvent = (queryClient: QueryClient) => {
//   const eventRepository = new EventRepository();
//   const useCase = new UpdateEventUseCase(eventRepository);

//   return useMutation({
//     mutationFn: (payload: EventRequest) => useCase.execute(payload),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: [QueryKeys.EVENTS] });
//     },
//   });
// };

export const deleteEvent = (queryClient: QueryClient) => {
  const eventRepository = new EventRepository();
  const useCase = new DeleteEventUseCase(eventRepository);
  return useMutation({
    mutationFn: (id: string) => useCase.execute(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.EVENTS] });
    },
  });
};
