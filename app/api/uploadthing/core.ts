import { createUploadthing } from "uploadthing/next";
const f = createUploadthing();

export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  productImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 4 },
  }).onUploadComplete(async ({ metadata, file }: any) => {
    console.log("file url", file.url);
  }),
  pdfUploader: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 4 },
  }).onUploadComplete(async ({ metadata, file }: any) => {
    console.log("file url", file.url);
  }),
  videoUploader: f({ video: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ metadata, file }: any) => {
      console.log("file url", file.url);
    }
  ),
};
