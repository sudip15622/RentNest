import { z } from "zod";
import { InquiryStatus } from "../../../generated/prisma";

export const UpdateInquiryStatusSchema = z.object({
  status: z.enum([InquiryStatus.pending, InquiryStatus.responded, InquiryStatus.closed]),
});

export type UpdateInquiryStatusDto = z.infer<typeof UpdateInquiryStatusSchema>;
