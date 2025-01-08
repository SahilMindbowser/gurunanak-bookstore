import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/database/connection';
import SchoolModel from '@/models/school/school';

// Handle GET request: Fetch all schools
export async function GET() {
  await connectToDatabase();
  try {
    const schools = await SchoolModel.find({});
    return NextResponse.json(schools);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching schools', error }, { status: 500 });
  }
}

// Handle POST request: Add a new school
export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();

  const { name } = body;
  if (!name) {
    return NextResponse.json({ message: 'School name is required' }, { status: 400 });
  }

  try {
    const school = new SchoolModel({ name, grades: [] });
    await school.save();
    return NextResponse.json(school, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating school', error }, { status: 500 });
  }
}
