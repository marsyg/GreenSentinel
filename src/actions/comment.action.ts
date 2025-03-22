import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";


// Create a new comment
export async function createComment(data: { userId: string; postId: string; text: string }) {
  try {
    // const { userId } = auth();
    // if (!userId) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }
    const comment = await prisma.comment.create({
      data: {
        userId,
        postId,
        text,
      },
    });
    revalidatePath(`/community/${data.postId}`);
    return NextResponse.json(comment, { status: 201 });
  } catch (error: any) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Get comments for a post
export async function getCommentsByPostId(postId: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: { user: true },
      orderBy: { createdAt: 'asc' },
    });
    return NextResponse.json(comments);
  } catch (error: any) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update Comment
export async function updateComment(id: string, data: Partial<{ text: string }>) {
  try {
    // const { userId } = auth();
    // const comment = await prisma.comment.findUnique({ where: { id } });
    // if (!comment) {
    //   return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    // }
    // if (comment.userId !== userId) {  // <-   Authorization
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    // }
    const updatedComment = await prisma.comment.update({
      where: { id },
      data,
    });
    return NextResponse.json(updatedComment);
  } catch (error: any) {
    console.error('Error updating comment:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete a comment
export async function deleteComment(id: string) {
  try {
    // const { userId } = auth();
    // const comment = await prisma.comment.findUnique({ where: { id } });
    // if (!comment) {
    //   return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    // }
    // if (comment.userId !== userId) {  // <-   Authorization
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    // }
    const deletedComment = await prisma.comment.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting comment:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
