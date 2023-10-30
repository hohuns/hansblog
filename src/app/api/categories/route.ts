import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // const categories = await prisma.category.findMany();
    const categories = await prisma.category.findMany();

    return NextResponse.json(
      { status: "Success", data: categories },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { status: "Fail", message: "Database error." },
      { status: 500 }
    );
  }
};
