import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { NextResponse } from "next/server";

// Create a new report
export async function createReport(data: {
  userId: string;
  type: string;
  location: string;
  latitude?: number;
  longitude?: number;
  description: string;
  imageUrl?: string;
  severity: string;
}) {
  try {
    // const { userId } = auth();
    // if (!userId) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const report = await prisma.report.create({
      data: {
        userId,
        type,
        location,
        latitude,
        longitude,
        description,
        imageUrl,
        severity,
      },
    });
    revalidatePath('/reports');
    return NextResponse.json(report, { status: 201 });
  } catch (error: any) {
    console.error('Error creating report:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Get all reports
// export async function getReports() {
//   try {
//     const reports = await prisma.report.findMany({
//       include: { user: true },
//       orderBy: { createdAt: 'desc' },
//     });
//     return NextResponse.json(reports);
//   } catch (error: any) {
//     console.error('Error fetching reports:', error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// Get a single report by ID
export async function getReportById(id: string) {
  try {
    const report = await prisma.report.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }
    return NextResponse.json(report);
  } catch (error: any) {
    console.error('Error fetching report by ID:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update a report
export async function updateReport(
  id: string,
  data: Partial<{
    type: string;
    location: string;
    latitude?: number;
    longitude?: number;
    description: string;
    imageUrl?: string;
    severity: string;
    status: string;
  }>,
) {
  try {
    // const { userId } = auth();
    // const report = await prisma.report.findUnique({ where: { id } });
    // if (!report) {
    //   return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    // }
    // if (report.userId !== userId) {  //  <- Authorization logic
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    // }

    const updatedReport = await prisma.report.update({
      where: { id },
      data,
    });
    revalidatePath('/reports');
    return NextResponse.json(updatedReport);
  } catch (error: any) {
    console.error('Error updating report:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete a report
export async function deleteReport(id: string) {
  try {
    // const { userId } = auth();
    // const report = await prisma.report.findUnique({ where: { id } });
    // if (!report) {
    //   return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    // }
    // if (report.userId !== userId) { // <-  Authorization
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    // }

    const deletedReport = await prisma.report.delete({
      where: { id },
    });
    revalidatePath('/reports');
    return NextResponse.json(deletedReport);
  } catch (error: any) {
    console.error('Error deleting report:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
