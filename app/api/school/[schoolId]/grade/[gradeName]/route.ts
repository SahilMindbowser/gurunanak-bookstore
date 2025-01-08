import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/database/connection';
import SchoolModel, { Grade } from '@/models/school/school';

// Get a specific grade
export async function GET(req: Request, context: { params: { schoolId: string; gradeName: string } }) {
  await connectToDatabase();
  const { schoolId, gradeName } = context.params;

  try {
    const school = await SchoolModel.findById(schoolId);
    if (!school) return NextResponse.json({ message: 'School not found' }, { status: 404 });

    const grade = school.grades.find((g: Grade) => g.name === gradeName);
    if (!grade) return NextResponse.json({ message: 'Grade not found' }, { status: 404 });

    return NextResponse.json(grade);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching grade', error }, { status: 500 });
  }
}

// Update a specific grade
export async function PUT(req: Request, context: { params: { schoolId: string; gradeName: string } }) {
  await connectToDatabase();
  const { schoolId, gradeName } = context.params;
  const body = await req.json();

  const { name } = body;

  if (!name) {
    return NextResponse.json({ message: 'Grade name is required' }, { status: 400 });
  }

  try {
    const school = await SchoolModel.findById(schoolId);
    if (!school) return NextResponse.json({ message: 'School not found' }, { status: 404 });

    const grade = school.grades.find((g: Grade) => g.name === gradeName);
    if (!grade) return NextResponse.json({ message: 'Grade not found' }, { status: 404 });

    grade.name = name;
    await school.save();

    return NextResponse.json({ message: 'Grade updated successfully', grade });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating grade', error }, { status: 500 });
  }
}

// Delete a specific grade
export async function DELETE(req: Request, context: { params: { schoolId: string; gradeName: string } }) {
  await connectToDatabase();
  const { schoolId, gradeName } = context.params;

  try {
    const school = await SchoolModel.findById(schoolId);
    if (!school) return NextResponse.json({ message: 'School not found' }, { status: 404 });

    const gradeIndex = school.grades.findIndex((g: Grade) => g.name === gradeName);
    if (gradeIndex === -1) return NextResponse.json({ message: 'Grade not found' }, { status: 404 });

    school.grades.splice(gradeIndex, 1);
    await school.save();

    return NextResponse.json({ message: 'Grade deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting grade', error }, { status: 500 });
  }
}
