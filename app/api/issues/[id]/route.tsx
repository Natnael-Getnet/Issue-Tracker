import { issueSchema, patchIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);

  const { title, description, user_id } = body;
  if (user_id) {
    const user = await prisma.user.findUnique({ where: { id: user_id } });

    if (!user)
      return NextResponse.json({ error: "User is not found" }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue)
    return NextResponse.json(
      { error: "Issue not found" },
      {
        status: 404,
      }
    );

  if (!validation.success)
    return NextResponse.json(validation.error.errors, {
      status: 400,
    });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: { title, description, user_id },
  });

  return NextResponse.json(updatedIssue, {
    status: 200,
  });
}

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

  if (!issue)
    return NextResponse.json(
      { error: "Issue not found" },
      {
        status: 404,
      }
    );

  await prisma.issue.delete({
    where: { id: parseInt(id) },
  });

  return NextResponse.json(
    {},
    {
      status: 200,
    }
  );
}
