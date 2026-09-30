import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Post from "@/models/Post";

export const GET = async (request, { params }) => {
  const id = (await params).id;

  try {
    await connectDB();

    const post = await Post.findById(id);

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = await params;

  try {
    await connectDB();

    await Post.findByIdAndDelete(id);

    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
