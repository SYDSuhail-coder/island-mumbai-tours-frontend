// import { NextResponse } from "next/server";
// export async function GET(req, { params }) {

//     const { slug } = await params;
//     const response = await fetch(
//         `${process.env.Get_Toures_Section_Slug}/${slug}`, {
//         method: "GET",
//         cache: "no-store",
//         headers: {
//             "x-api-key": "IsMuTo@2026Xk9$mQ3zP!rL7vN"
//         }
//     }
//     );

//     const data = await response.json();
//     return NextResponse.json(data);

// }

import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { slug } = await params;

  const endpoints = [
    process.env.Get_Toures_Section_Slug,
    process.env.Get_Walking_Tours_Slug,
    process.env.Get_Private_Tours_Slug,
  ];

  const results = await Promise.allSettled(
    endpoints.map((url) =>
      fetch(`${url}/${slug}`, {
        method: "GET",
        cache: "no-store",
        headers: {
          "x-api-key": "IsMuTo@2026Xk9$mQ3zP!rL7vN",
        },
      })
    )
  );

  for (const result of results) {
    if (result.status === "fulfilled" && result.value.ok) {
      const data = await result.value.json();
      if (data?.result?.data) {
        return NextResponse.json(data);
      }
    }
  }

  return NextResponse.json({ result: { data: null } });
}