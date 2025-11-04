"use client";
import { DataTable } from "@/core/presentation/components/DataTable/DataTable";
import React, { useState, useMemo } from "react";
import { createEventColumns } from "./EventColumns";
import { ScrollArea } from "@/core/presentation/components/ui/scroll-area";
import Button from "@/core/presentation/components/Button/Button";
import { CirclePlus, Search } from "lucide-react";
import { Input } from "@/core/presentation/components/ui/input";
import { getEvents } from "../../application/eventUseCase";
import { TableSkeleton } from "@/core/presentation/components/DataTable/TableSkeleton";
import { AddEventModal } from "./AddEvent";
import { EditEventModal } from "./EditEvent";
import { EventResponse } from "../../domain/entities/EventEntity";
import { DeleteEventModal } from "./DeleteEvent";
import DatePicker from "@/core/presentation/components/date-picker/date-picker";
import Pagination from "@/core/presentation/components/pagination/Pagination";
import { Button as ApplyButton } from "@/core/presentation/components/ui/button";
import { Label } from "@/core/presentation/components/ui/label";

const EventTable = () => {
  const [AddEventOpen, setAddEventOpen] = useState(false);
  const [EditEventOpen, setEditEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventResponse | null>(
    null,
  );
  const [DeleteEventOpen, setDeleteEventOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [appliedStartDate, setAppliedStartDate] = useState<Date | undefined>();
  const [appliedEndDate, setAppliedEndDate] = useState<Date | undefined>();

  const { data, isLoading, isError, error } = getEvents({ page });

  const realData = data?.items ?? [];
  const currentPage = data?.page ?? 1;
  const totalPages = currentPage + 10;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = data?.hasNextPage;

  const handleEdit = (event: any) => {
    setSelectedEvent(event);
    setEditEventOpen(true);
  };

  const handleDelete = (event: any) => {
    setSelectedEvent(event);
    setDeleteEventOpen(true);
  };

  const columns = useMemo(
    () => createEventColumns(handleEdit, handleDelete),
    [handleEdit, handleDelete],
  );

  const filteredData = useMemo(() => {
    if (!realData || !Array.isArray(realData)) return [];

    const parseDate = (v?: string) => {
      if (!v) return null;
      const candidate = v.includes(" ") ? v.replace(" ", "T") : v;
      const d = new Date(candidate);
      return Number.isNaN(d.getTime()) ? null : d;
    };

    return realData.filter((event) => {
      const matchesSearch =
        searchTerm === "" ||
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());

      const d = parseDate(event.event_date);
      const withinDateRange =
        (!startDate || (d && d >= startDate)) &&
        (!endDate || (d && d <= endDate));

      return matchesSearch && withinDateRange;
    });
  }, [realData, searchTerm, appliedStartDate, appliedEndDate]);

  const handleApply = () => {
    setAppliedStartDate(startDate);
    setAppliedEndDate(endDate);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (isError) {
    return (
      <div className="w-full flex justify-center items-center py-8">
        <div className="text-center text-red-500">
          Error loading events: {error?.message || "Unknown error"}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-row sm:flex-row gap-8 flex-1">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 rounded-md"
            />
          </div>
        </div>
        <div className="flex gap-5">
          <Button
            className="flex flex-row gap-2 justify-center items-center"
            onClick={() => setAddEventOpen(true)}
          >
            <CirclePlus />
            Add Event
          </Button>
          <AddEventModal open={AddEventOpen} onOpenChange={setAddEventOpen} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 lg:items-end items-start">
        <div className="flex flex-col gap-2">
          <Label>Start Date</Label>
          <DatePicker selected={startDate} onSelect={setStartDate} />
        </div>

        <div className="flex flex-col gap-2">
          <Label>End Date</Label>
          <DatePicker selected={endDate} onSelect={setEndDate} />
        </div>

        <ApplyButton
          type="button"
          onClick={handleApply}
          className="bg-white hover:bg-gray-50 text-black font-bold shadow-md px-12 border"
        >
          Apply
        </ApplyButton>
      </div>

      <ScrollArea className="rounded-md h-[54vh] w-full min-w-[500px]">
        <DataTable
          data={filteredData}
          columns={columns}
          enableSelection={false}
          enableFiltering={false}
          enablePagination={false}
        />
      </ScrollArea>
      {selectedEvent && (
        <EditEventModal
          event={selectedEvent}
          open={EditEventOpen}
          onOpenChange={setEditEventOpen}
        />
      )}
      {selectedEvent && (
        <DeleteEventModal
          id={selectedEvent?.id}
          open={DeleteEventOpen}
          onOpenChange={setDeleteEventOpen}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        onPageChange={setPage}
      />
    </div>
  );
};

export default EventTable;
