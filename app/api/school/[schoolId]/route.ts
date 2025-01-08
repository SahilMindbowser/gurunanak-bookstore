import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/database/connection';
import SchoolModel from '@/models/school/school';

// Handle GET request: Fetch a specific school
export async function GET(req: Request, { params }: { params: { schoolId: string } }) {
  await connectToDatabase();
  const { schoolId } = await params;

  try {
    const school = await SchoolModel.findById(schoolId);
    if (!school) return NextResponse.json({ message: 'School not found' }, { status: 404 });
    return NextResponse.json(school);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching school', error }, { status: 500 });
  }
}

// Handle PUT request: Update a specific school name
export async function PUT(req: Request, { params }: { params: { schoolId: string } }) {
  await connectToDatabase();
  const { schoolId } = await params;
  const body = await req.json();

  const { name } = body;
  if (!name) {
    return NextResponse.json({ message: 'School name is required' }, { status: 400 });
  }

  try {
    const school = await SchoolModel.findByIdAndUpdate(schoolId, { name }, { new: true });
    if (!school) return NextResponse.json({ message: 'School not found' }, { status: 404 });
    return NextResponse.json(school);
  } catch (error) {
    return NextResponse.json({ message: 'Error updating school', error }, { status: 500 });
  }
}

// Handle DELETE request: Delete a specific school
export async function DELETE(req: Request, { params }: { params: { schoolId: string } }) {
  await connectToDatabase();
  const { schoolId } = await params;

  try {
    const school = await SchoolModel.findByIdAndDelete(schoolId);
    if (!school) return NextResponse.json({ message: 'School not found' }, { status: 404 });
    return NextResponse.json({ message: 'School deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting school', error }, { status: 500 });
  }
}
