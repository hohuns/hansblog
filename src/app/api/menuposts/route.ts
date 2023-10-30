import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get("cat");
  const query = {
    take: 4,
    where: {
      ...(cat && { catSlug: cat }),
    },
  };

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany({
        ...query,
        orderBy: [
          {
            views: "desc",
          },
        ],
        include: { user: true },
      }),

      prisma.post.count({ where: query.where }),
    ]);
    return NextResponse.json(
      { status: "Success", data: { posts, count } },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { status: "Fail", message: "Database error", err },
      { status: 500 }
    );
  }
};
