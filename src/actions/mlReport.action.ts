import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

// Create a new ML report
export async function createMLReport(data: {
	dataId: string;
	summary: string;
	negativeImpact: string;
	recommendations?: string;
	confidenceScore?: number;
	modelVersion?: string;
}) {
	try {
		const mlReport = await prisma.mLReport.create({
			data,
		});
		return NextResponse.json(mlReport, { status: 201 });
	} catch (error: any) {
		console.error("Error creating ML report:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// Get ML report by ID
export async function getMLReportById(id: string) {
	try {
		const mlReport = await prisma.mLReport.findUnique({
			where: { id },
			include: { environmentalData: true },
		});
		if (!mlReport) {
			return NextResponse.json(
				{ error: "ML Report not found" },
				{ status: 404 }
			);
		}
		return NextResponse.json(mlReport);
	} catch (error: any) {
		console.error("Error fetching ML report:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// Update ML Report
export async function updateMLReport(
	id: string,
	data: Partial<{
		summary: string;
		negativeImpact: string;
		recommendations?: string;
		confidenceScore?: number;
		modelVersion?: string;
	}>
) {
	try {
		const mlReport = await prisma.mLReport.update({
			where: { id },
			data,
		});
		return NextResponse.json(mlReport);
	} catch (error: any) {
		console.error("Error updating ML report:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// Delete ML Report
export async function deleteMLReport(id: string) {
	try {
		const mlReport = await prisma.mLReport.delete({
			where: { id },
		});
		return NextResponse.json(mlReport);
	} catch (error: any) {
		console.error("Error deleting ML report:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
