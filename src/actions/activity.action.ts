import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";

// Create a new activity
export async function createActivity(data: {
	title: string;
	description: string;
	location: string;
	date: Date;
	organizer?: string;
	contact?: string;
	imageUrl?: string;
	distance?: string;
	latitude?: number;
	longitude?: number;
}) {
	try {
		const activity = await prisma.activity.create({
			data,
		});
		revalidatePath("/activities");
		return NextResponse.json(activity, { status: 201 });
	} catch (error: any) {
		console.error("Error creating activity:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// Get all activities
export async function getActivities() {
	try {
		const activities = await prisma.activity.findMany({
			orderBy: { date: "asc" },
		});
		return NextResponse.json(activities);
	} catch (error: any) {
		console.error("Error fetching activities:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// Get activity by ID
export async function getActivityById(id: string) {
	try {
		const activity = await prisma.activity.findUnique({
			where: { id },
		});
		if (!activity) {
			return NextResponse.json(
				{ error: "Activity not found" },
				{ status: 404 }
			);
		}
		return NextResponse.json(activity);
	} catch (error: any) {
		console.error("Error getting activity by id:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// Update an activity
export async function updateActivityById(
	id: string,
	data: Partial<{
		title: string;
		description: string;
		location: string;
		date: Date;
		organizer?: string;
		contact?: string;
		imageUrl?: string;
		distance?: string;
		latitude?: number;
		longitude?: number;
	}>
) {
	try {
		const activity = await prisma.activity.update({
			where: { id },
			data,
		});
		revalidatePath("/activities");
		return NextResponse.json(activity);
	} catch (error: any) {
		console.error("Error updating activity:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// Delete an activity
export async function deleteActivityById(id: string) {
	try {
		const activity = await prisma.activity.delete({
			where: { id },
		});
		revalidatePath("/activities");
		return NextResponse.json({ success: true });
	} catch (error: any) {
		console.error("Error deleting activity:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
