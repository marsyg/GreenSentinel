import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Create a new post
export async function createPost(data: {
	userId: string;
	title: string;
	content: string;
    imageUrl?: string;
}) {
	try {
		// const { userId } = auth();
		// if (!userId) {
		//   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		// }
		const post = await prisma.post.create({
			data: {
				userId,
				title,
				content,
                imageUrl
			},
		});
		revalidatePath("/community");
		return NextResponse.json(post, { status: 201 });
	} catch (error: any) {
		console.error("Error creating post:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// Get all posts
export async function getAllPosts() {
	try {
		const posts = await prisma.post.findMany({
			include: { user: true, comments: true },
			orderBy: { createdAt: "desc" },
		});
		return NextResponse.json(posts);
	} catch (error: any) {
		console.error("Error fetching posts:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// Get a single post by ID
export async function getPostById(id: string) {
	try {
		const post = await prisma.post.findUnique({
			where: { id },
			include: { user: true, comments: { include: { user: true } } },
		});
		if (!post) {
			return NextResponse.json({ error: "Post not found" }, { status: 404 });
		}
		return NextResponse.json(post);
	} catch (error: any) {
		console.error("Error fetching post by ID:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// Update a post
export async function updatePost(
	id: string,
	data: Partial<{ title: string; content: string; imageUrl?: string }>
) {
	try {
		// const { userId } = auth();
		// const post = await prisma.post.findUnique({ where: { id } });
		// if (!post) {
		//   return NextResponse.json({ error: 'Post not found' }, { status: 404 });
		// }
		// if (post.userId !== userId) {  //  <-  Authorization
		//   return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
		// }
		const updatedPost = await prisma.post.update({
			where: { id },
			data,
		});
		revalidatePath("/community");
		return NextResponse.json(updatedPost);
	} catch (error: any) {
		console.error("Error updating post:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}

// Delete a post
export async function deletePost(id: string) {
	try {
		// const { userId } = auth();
		// const post = await prisma.post.findUnique({ where: { id } });
		// if (!post) {
		//   return NextResponse.json({ error: 'Post not found' }, { status: 404 });
		// }
		// if (post.userId !== userId) {  // <-   Authorization
		//   return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
		// }
		const deletedPost = await prisma.post.delete({
			where: { id },
		});
		revalidatePath("/community");
		return NextResponse.json({ success: true });
	} catch (error: any) {
		console.error("Error deleting post:", error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
