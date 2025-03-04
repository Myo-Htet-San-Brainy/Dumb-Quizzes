import client from "@/app/lib/mongodb";
import { type NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(
  req: NextRequest,
  { params }: { params: { quizId: string } }
) {
  try {
    const { quizId } = params;

    // Validate quizId format
    if (!quizId || !ObjectId.isValid(quizId)) {
      return NextResponse.json(
        { error: "Invalid or missing quiz ID." },
        { status: 400 }
      );
    }

    const QuizDb = client.db("Quiz");
    const quizCollection = QuizDb.collection("quiz");

    // Convert quizId to ObjectId
    const filter = { _id: new ObjectId(quizId) };
    const quiz = await quizCollection.findOne(filter);

    // If no quiz found, return 404
    if (!quiz) {
      return NextResponse.json(
        { error: "No quiz found with the given ID." },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: quiz }, { status: 200 });
  } catch (error) {
    console.error("Error fetching quiz:", error);

    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}
