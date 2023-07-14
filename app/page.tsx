import { AXIOS_API } from "@/lib/axiosApi";
import Link from "next/link";

export default async function Home() {
  const response = await AXIOS_API.get("/problem");

  return (
    <main>
      <h1 className="text-xl text-center mt-5">Leetcode</h1>

      {response?.data?.problems?.map((problem: any, index: number) => {
        return (
          <div>
            {index + 1}).
            <Link href={`/problem/${problem?._id}`}>{problem?.title}</Link>
          </div>
        );
      })}
    </main>
  );
}
