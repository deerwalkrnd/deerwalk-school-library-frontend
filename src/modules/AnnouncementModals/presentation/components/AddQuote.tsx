"use client";

import { useState, useEffect } from "react";
import type React from "react";
import { CircleX } from "lucide-react";

interface AddQuoteModalprops {
  open: boolean;
  onOpenchange: (open: boolean) => void;
}

// export function AddQuoteModal
