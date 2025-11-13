import { getCookie } from "@/core/presentation/contexts/AuthContext";
import { useToast } from "@/core/hooks/useToast";

export const UPLOAD_TYPES = [
  "BOOK_COVER",
  "PROFILE_IMAGE",
  "EVENT_BANNER",
] as const;

export type UploadType = (typeof UPLOAD_TYPES)[number];

export interface UploadMediaOptions {
  type?: UploadType;
  endpoint?: string;
  fieldName?: string;
  authToken?: string | null;
  signal?: AbortSignal;
}

const DEFAULT_ENDPOINT = "/api/upload";
const DEFAULT_FIELD = "file";
const DEFAULT_TYPE: UploadType = "BOOK_COVER";

const UPLOAD_LABEL: Record<UploadType, string> = {
  BOOK_COVER: "book cover",
  PROFILE_IMAGE: "profile image",
  EVENT_BANNER: "event banner",
};

const pickUrlFromResponse = (payload: any): string | undefined => {
  if (!payload || typeof payload !== "object") return undefined;
  return payload.url;
};

export async function uploadMediaFile(
  file: File,
  options: UploadMediaOptions = {},
): Promise<string> {
  if (!file) {
    throw new Error("A valid file must be provided for upload");
  }

  const {
    type = DEFAULT_TYPE,
    endpoint = DEFAULT_ENDPOINT,
    fieldName = DEFAULT_FIELD,
    authToken = getCookie("authToken"),
    signal,
  } = options;

  if (!authToken) {
    throw new Error("User token not found");
  }

  const label = UPLOAD_LABEL[type] ?? "file";
  useToast("info", `Uploading image...`);

  const formData = new FormData();
  formData.append(fieldName, file);

  const separator = endpoint.includes("?") ? "&" : "?";
  const requestUrl = `${endpoint}${separator}type=${encodeURIComponent(type)}`;

  const response = await fetch(requestUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: formData,
    signal,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(
      `Upload failed: ${response.status} ${
        errorText || response.statusText || "Unknown error"
      }`,
    );
  }

  const data = await response.json().catch(() => ({}));
  const uploadedUrl = pickUrlFromResponse(data);

  if (!uploadedUrl) {
    throw new Error("Upload succeeded but no file URL was returned");
  }

  return uploadedUrl;
}
