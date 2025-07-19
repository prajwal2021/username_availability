import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Username from '@/models/Username';

// Check username availability
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json(
        { error: 'Username parameter is required' },
        { status: 400 }
      );
    }

    await connectDB();
    const existingUsername = await Username.findOne({ username: username.toLowerCase() });

    return NextResponse.json({
      username,
      available: !existingUsername
    });

  } catch (error) {
    console.error('Error checking username:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Create new username
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username } = body;

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    await connectDB();
    
    // Check if username already exists
    const existingUsername = await Username.findOne({ username: username.toLowerCase() });
    if (existingUsername) {
      return NextResponse.json(
        { error: 'Username is already taken' },
        { status: 409 }
      );
    }

    // Create new username
    const newUsername = await Username.create({ 
      username: username.toLowerCase() 
    });

    return NextResponse.json(newUsername, { status: 201 });

  } catch (error) {
    console.error('Error creating username:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 