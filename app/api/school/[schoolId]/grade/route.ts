import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/database/connection';
import SchoolModel from '@/models/school/school';

// Get all grades for a school
export async function GET(req: Request, {params}: { params: { schoolId: string } }) {
  await connectToDatabase();
  const { schoolId } = await params;

  try {
    const school = await SchoolModel.findById(schoolId);
    if (!school) return NextResponse.json({ message: 'School not found' }, { status: 404 });

    return NextResponse.json(school.grades);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching grades', error }, { status: 500 });
  }
}

// Add a new grade to a school
export async function POST(req: Request, {params}: { params: { schoolId: string } }) {
  await connectToDatabase();
  const { schoolId } = await params;
  const body = await req.json();

  const { name } = body;

  if (!name) {
    return NextResponse.json({ message: 'Grade name is required' }, { status: 400 });
  }

  try {
    const school = await SchoolModel.findById(schoolId);
    if (!school) return NextResponse.json({ message: 'School not found' }, { status: 404 });

    school.grades.push({ name, products: [] });
    await school.save();

    return NextResponse.json({ message: 'Grade added successfully', grade: { name, products: [] } });
  } catch (error) {
    return NextResponse.json({ message: 'Error adding grade', error }, { status: 500 });
  }
}
