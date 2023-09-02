import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const page_str = request.nextUrl.searchParams.get("page");
    const limit_str = request.nextUrl.searchParams.get("limit");

    const page = page_str ? parseInt(page_str, 10) : 1;
    const limit = limit_str ? parseInt(limit_str, 10) : 10;
    const skip = (page - 1) * limit;

    const reports = await prisma.report.findMany({
        take: limit,
        skip: skip,
        orderBy: [
            {
                report_state: "desc"
            }
        ]
    });

    const count = await prisma.report.aggregate({
        _count: {
            report_id: true
        }
    });

    let json_response = {
        status: "success",
        results: count._count.report_id,
        reports,
    };

    return NextResponse.json(json_response);
}
