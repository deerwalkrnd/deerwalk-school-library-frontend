"use client";

import React, { useState } from "react";
import { Header } from "@/core/presentation/components/Header/Header";
import Books from "@/modules/BookPage/presentation/components/Books";

const page = () => {
  return (
    <div className="flex flex-col gap-20 px-6 md:px-15 lg:px-25 py-10 w-full">
      <Header title="Books" subtitle="Search, Add, Update or Delete Books" />
      <Books />
    </div>
  );
};

export default page;
