import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";

// GET SINGLE POST
export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const { slug } = params;

  try {
    const post = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      include: { user: true },
    });

    return NextResponse.json(
      { status: "Success", data: post },
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

export const DELETE = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  const session = await getAuthSession();
  const { slug } = params;
  const loggedInUserEmail = session?.user?.email;
  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
  });
  const writeEmail = post?.userEmail;

  if (loggedInUserEmail === writeEmail) {
    try {
      const post = await prisma.post.delete({
        where: { slug },
      });

      return NextResponse.json(
        { status: "Success", data: post },
        { status: 200 }
      );
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { status: "Fail", message: "Database error", err },
        { status: 500 }
      );
    }
  } else if (loggedInUserEmail !== writeEmail) {
    return NextResponse.json(
      {
        status: "Fail",
        message: "Delete failed, You are not writer of this post.",
      },
      { status: 401 }
    );
  }
};
