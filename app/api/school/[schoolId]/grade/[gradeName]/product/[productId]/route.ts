import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/database/connection';
import SchoolModel, { Grade, Product } from '@/models/school/school';

// Get a specific product
export async function GET(
  req: Request,
  {params}: { params: { schoolId: string; gradeName: string; productId: string } }
) {
  const { schoolId, gradeName, productId } = await params;

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

    const product = grade.products.find((p:Product) => p.id === Number(productId));

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching product', error }, { status: 500 });
  }
}

// Update a specific product
export async function PUT(
  req: Request,
  {params}: { params: { schoolId: string; gradeName: string; productId: string } }
) {
  const { schoolId, gradeName, productId } = await params;
  const updates = await req.json();

  try {
    await connectToDatabase();
    const school = await SchoolModel.findById(schoolId);

    if (!school) {
      return NextResponse.json({ message: 'School not found' }, { status: 404 });
    }

    const grade = school.grades.find((g: Grade) => g.name === gradeName);

    if (!grade) {
      return NextResponse.json({ message: 'Grade not found' }, { status: 404 });
    }

    const product = grade.products.find((p: Product) => p.id === Number(productId));

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    Object.assign(product, updates);
    await school.save();

    return NextResponse.json({ message: 'Product updated successfully', product });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating product', error }, { status: 500 });
  }
}

// Delete a specific product
export async function DELETE(
  req: Request,
  {params}: { params: { schoolId: string; gradeName: string; productId: string } }
) {
  const { schoolId, gradeName, productId } = await params;

  try {
    await connectToDatabase();
    const school = await SchoolModel.findById(schoolId);

    if (!school) {
      return NextResponse.json({ message: 'School not found' }, { status: 404 });
    }

    const grade = school.grades.find((g: Grade) => g.name === gradeName);

    if (!grade) {
      return NextResponse.json({ message: 'Grade not found' }, { status: 404 });
    }

    const productIndex = grade.products.findIndex((p: Product) => p.id === Number(productId));

    if (productIndex === -1) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    grade.products.splice(productIndex, 1);
    await school.save();

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting product', error }, { status: 500 });
  }
}
