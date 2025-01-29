import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req) {
  try {
    const body = await req.json()
    const result = await prisma.testResult.create({
      data: {
        name: body.name,
        score: body.score,
        totalQuestions: body.totalQuestions,
      }
    })
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const results = await prisma.testResult.findMany({
      orderBy: {
        timestamp: 'desc'
      }
    })
    return NextResponse.json(results)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}