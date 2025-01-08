import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/database/connection';
import SchoolModel, { Grade } from '@/models/school/school';

// Get all products of a school and grade
export async function GET(
  req: Request,
  {params}: { params: { schoolId: string; gradeName: string } }
) {
  const { schoolId, gradeName } = await params;

  try {
    await connectToDatabase();
    const school = await SchoolModel.findById(schoolId);

    if (!school) {
      return NextResponse.json({ message: 'School not found' }, { status: 404 });
    }

    const grade = school.grades.find((g:Grade) => g.name === gradeName);

    if (!grade) {
      return NextResponse.json({ message: 'Grade not found' }, { status: 404 });
    }

    return NextResponse.json({ products: grade.products });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching products', error }, { status: 500 });
  }
}

// Add a new product to a grade
export async function POST(
  req: Request,
  {params}: { params: { schoolId: string; gradeName: string } }
) {
  const { schoolId, gradeName } = await params;
  const body = await req.json();

  const { id, title, price, description, image, shippingPolicy, returnPolicy } = body;

  if (!id || !title || !price || !image) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const school = await SchoolModel.findById(schoolId);

    if (!school) {
      return NextResponse.json({ message: 'School not found' }, { status: 404 });
    }

    const grade = school.grades.find((g:Grade) => g.name === gradeName);

    if (!grade) {
      return NextResponse.json({ message: 'Grade not found' }, { status: 404 });
    }

    grade.products.push({ id, title, price, description, image, shippingPolicy, returnPolicy });
    await school.save();

    return NextResponse.json({ message: 'Product added successfully', grade });
  } catch (error) {
    return NextResponse.json({ message: 'Error adding product', error }, { status: 500 });
  }
}
