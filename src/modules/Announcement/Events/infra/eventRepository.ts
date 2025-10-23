import { getCookie } from "@/core/presentation/contexts/AuthContext";
import IEventRepository from "../domain/repository/IeventRepository";
import { EventRequest, EventResponse } from "../domain/entities/EventEntity";
import { RepositoryError } from "@/core/lib/RepositoryError";
import { Paginated } from "@/core/lib/Pagination";

export class EventRepository implements IEventRepository {
  token = getCookie("authToken");
  private readonly API_URL = {
    EVENTS: "/api/events",
    UPDATE_EVENTS: (id: number) => `/api/events/${id}`,
    DELETE_EVENTS: (id: number) => `/api/events/${id}`,
  };
  async getEvents(params?: {
    page?: number;
    limit?: number;
  }): Promise<Paginated<EventResponse>> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) {
        queryParams.append("page", params.page.toString());
      }
      if (params?.limit) {
        queryParams.append("limit", params.limit.toString());
      }
      const url = `${this.API_URL.EVENTS}${queryParams.toString() ? `/?${queryParams.toString()}` : ""}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new RepositoryError("Failed to fetch events", response.status);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw console.error(error);
      }
      throw new RepositoryError("Network error");
    }
  }
  async getEventById(id: string): Promise<EventResponse> {
    try {
      const response = await fetch(`${this.API_URL.EVENTS}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new RepositoryError("Failed to fetch event", response.status);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw console.error(error);
      }
      throw new RepositoryError("Network error");
    }
  }
  async getEventsByLatest(date: string): Promise<EventResponse[]> {
    try {
      const response = await fetch(`${this.API_URL.EVENTS}/latest/${date}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new RepositoryError(
          "Failed to fetch latest events",
          response.status,
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw console.error(error);
      }
      throw new RepositoryError("Network error");
    }
  }
  async addEvent(payload: EventRequest): Promise<EventResponse> {
    try {
      const response = await fetch(this.API_URL.EVENTS, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new RepositoryError("Failed to add event", response.status);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw console.error(error);
      }
      throw new RepositoryError("Network error");
    }
  }
  async updateEvent(payload: EventRequest): Promise<EventResponse> {
    try {
      const response = await fetch(this.API_URL.UPDATE_EVENTS(payload.id!), {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new RepositoryError("Failed to update event", response.status);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw console.error(error);
      }
      throw new RepositoryError("Network error");
    }
  }
  async deleteEvent(id: number): Promise<string> {
    try {
      const response = await fetch(this.API_URL.DELETE_EVENTS(id), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new RepositoryError("Failed to delete event", response.status);
      }
      return "Event deleted successfully";
    } catch (error) {
      if (error instanceof RepositoryError) {
        throw console.error(error);
      }
      throw new RepositoryError("Network error");
    }
  }
}
