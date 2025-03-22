import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function createUser(
    data:{
        id :string;
        name :string;
        email : string;
    }
) {
    try {
        const user = await prisma.user.create({
            data,
        });
        return NextResponse.json(user);
    } catch (error: any) {
        console.error("Error creating user:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function getUserById(userId: string) {
	try {

		// const { userId } = auth();  // Get user ID from Clerk
		// if (!userId) {
		//   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		// }
		
        if (!userId || userId.trim() === '') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
			where: { id: userId },
		});
		return NextResponse.json(user);
	} catch (error: any) {
		console.error("Error fetching user:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

export async function updateUser(userId: string, data: Partial<{ name: string; email: string }>) {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data,
        })
        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function deleteUserById(userId: string) {
    try {
        const deletedUser = await prisma.user.delete({
            where: { id: userId },
        });
        return NextResponse.json(deletedUser);
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}