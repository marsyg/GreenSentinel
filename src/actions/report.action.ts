import prisma from "@/lib/prisma";

export const report = async (id: string) => {
    const report = await prisma.report.create({
        data: {
            postId: id,
        },
    });