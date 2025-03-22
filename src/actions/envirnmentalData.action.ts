import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";



//  Create new environmental data
export async function createEnvironmentalData(data: {
  location: string;
  latitude: number;
  longitude: number;
  aqi?: number;
  oxygenLevel?: number;
  otherMetrics?: any;
}) {
  try {
    const envData = await prisma.environmentalData.create({
      data,
    });
    return NextResponse.json(envData, { status: 201 });
  } catch (error: any) {
    console.error('Error creating environmental data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Get environmental data by location
export async function getEnvironmentalDataByLocation(location: string) {
  try {
    const envData = await prisma.environmentalData.findUnique({
      where: { location },
      include: { report: true },
    });
    if (!envData) {
      return NextResponse.json({ error: 'Environmental Data not found' }, { status: 404 });
    }
    return NextResponse.json(envData);
  } catch (error: any) {
    console.error('Error fetching environmental data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Get all environmental data
// export async function getAllEnvironmentalData() {
//   try {
//     const envData = await prisma.environmentalData.findMany();
//     return NextResponse.json(envData);
//   } catch (error: any) {
//     console.error('Error fetching all environmental data:', error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// Update environmental data
export async function updateEnvironmentalData(
  location: string,
  data: Partial<{
    latitude: number;
    longitude: number;
    aqi?: number;
    oxygenLevel?: number;
    otherMetrics?: any;
  }>,
) {
  try {
    const envData = await prisma.environmentalData.update({
      where: { location },
      data,
    });
    return NextResponse.json(envData);
  } catch (error: any) {
    console.error('Error updating environmental data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete environmental data
export async function deleteEnvironmentalDataByLocation(location: string) {
  try {
    const envData = await prisma.environmentalData.delete({
      where: { location },
    });
    return NextResponse.json(envData);
  } catch (error: any) {
    console.error('Error deleting environmental data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}