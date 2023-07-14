import React from "react";
import { AXIOS_API } from "@/lib/axiosApi";
import { z } from "zod";
import { FormType } from "@/types/problem";
import Difficulty from "@/components/smallComponents/Difficulty";
import { ThumbsUpIcon, ThumbsDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CodePlayground from "@/components/CodePlayground";
import ShowHTML from "@/components/smallComponents/ShowHTML";

const Problem = async ({
  params: { problemId },
}: {
  params: { problemId: string };
}) => {
  const response = await AXIOS_API.get(`/problem/${problemId}`)
    .then((res) => res?.data)
    .catch((error) => error?.response?.data?.message);

  const problem = response?.problem;

  if (!problem) {
    return <section>{JSON.stringify(response)}</section>;
  }

  return (
    <main className="grid grid-cols-2 gap-10">
      <section className="px-5 py-3 space-y-5">
        <h1 className="text-2xl font-semibold mb-2">{problem?.title}</h1>

        <div className="flex items-center gap-2">
          <Difficulty difficulty={problem?.difficulty} />
          <Button variant={"ghost"}>
            <span>
              <ThumbsUpIcon className="fill-green-400 relative bottom-[2px]" />
            </span>
            <span className="ml-1">{problem?.reaction?.like}</span>
          </Button>
          <Button variant={"ghost"}>
            <span>
              <ThumbsDownIcon className="fill-yellow-400 relative top-[2px]" />
            </span>
            <span className="ml-1">{problem?.reaction?.dislike}</span>
          </Button>
        </div>

        <div>
          <ShowHTML plainText={problem?.description} height="h-fit" />
        </div>

        <section>
          {problem?.examples?.map(
            (example: { input: string; output: string }, index: number) => {
              return (
                <div className="mb-3">
                  <p>Example {index + 1}:</p>
                  <div className="bg-slate-100 px-2 py-2 rounded-md">
                    {/* <pre>
                      <code>Input: {example.input}</code>
                    </pre> */}

                    <ShowHTML plainText={"Input: " + example.input} />
                    {/* <pre>
                      <code>Output: {example.output}</code>
                    </pre> */}
                    <ShowHTML plainText={"Output: " + example.output} />
                  </div>
                </div>
              );
            }
          )}
        </section>

        <section>
          <h3>Constraints:</h3>
          <ul className="list-disc list-outside ml-5 space-y-2">
            {problem?.constraints?.map(
              ({ constraint }: { constraint: string }) => {
                return (
                  <li>
                    <ShowHTML plainText={constraint} />
                  </li>
                );
              }
            )}
          </ul>
        </section>
      </section>
      <section className="">
        {/* <pre className="mt-2 rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(response, null, 4)}
          </code>
        </pre> */}
        <CodePlayground />
      </section>
    </main>
  );
};

export default Problem;
