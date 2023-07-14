"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { DevTool } from "@hookform/devtools";
import { Textarea } from "@/components/ui/textarea";
import { Trash2Icon } from "lucide-react";
import { AXIOS_API } from "@/lib/axiosApi";
import { AxiosError } from "axios";

const AdminIndexPage = () => {
  const ExampleSchema = z.object({
    input: z.string(),
    output: z.string(),
  });

  const TagSchema = z.object({
    label: z.string(),
    value: z.string(),
  });

  const SolutionsSchema = z.object({
    solution: z.string(),
    upvote: z.number().default(0).optional(),
    downvote: z.number().default(0).optional(),
  });

  const ConstraintsSchema = z.object({
    constraint: z.string(),
  });

  const FormSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(2, {
      message: "Description must be at least 2 characters.",
    }),
    difficulty: z.enum(["Easy", "Medium", "Hard"]),
    tags: z.array(TagSchema),
    examples: z.array(ExampleSchema),
    solutions: z.array(SolutionsSchema),
    constraints: z.array(ConstraintsSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      difficulty: "Medium",
      tags: [{ label: "", value: "" }],
      constraints: [{ constraint: "" }],
      examples: [{ input: "", output: "" }],
      solutions: [{ solution: "", upvote: 0, downvote: 0 }],
    },
  });

  const tagsFieldArray = useFieldArray({ name: "tags", control });
  const examplesFieldArray = useFieldArray({ name: "examples", control });
  const solutionsFieldArray = useFieldArray({ name: "solutions", control });
  const constraintsFieldArray = useFieldArray({ name: "constraints", control });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    // const response = await fetch("http://localhost:4000/api/problem", {
    //   body: JSON.stringify(data),
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // const result = await response.json();
    // toast({ title: result });

    const response = await AXIOS_API.post("/problem", data)
      .then((res) => res.data)
      .then((data) =>
        toast({
          title: data?.message,
        })
      )
      .catch((err) => {
        console.error(err);
        if (err instanceof AxiosError) {
          toast({
            title: err?.response?.data?.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: err?.message,
            variant: "destructive",
          });
        }
      });
  };

  return (
    <main className="flex-1 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input type="text" id="title" {...register("title")} />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...register("description")} />
        </div>
        <div>
          <Tabs
            defaultValue={"Medium"}
            onValueChange={(value: string) => {
              setValue("difficulty", value as "Easy" | "Medium" | "Hard");
            }}
          >
            <>
              <Label htmlFor="difficulty" className="block mb-1">
                Difficulty
              </Label>
              <TabsList id="difficulty" className=" space-x-2">
                <TabsTrigger value="Easy" className="">
                  Easy
                </TabsTrigger>
                <TabsTrigger value="Medium" className="">
                  Medium
                </TabsTrigger>
                <TabsTrigger value="Hard" className="">
                  Hard
                </TabsTrigger>
              </TabsList>
            </>
          </Tabs>
        </div>
        <div className="">
          <Label htmlFor="tags">Tags</Label>

          <div className="">
            <div className="grid grid-cols-4 gap-x-10 gap-y-3 flex-1">
              {tagsFieldArray.fields.map(
                ({ id, label, value }, index, array) => {
                  return (
                    <div className="flex gap-4">
                      <Input
                        key={id}
                        type="text"
                        id="tags"
                        {...register(`tags.${index}.value`)}
                        className="w-full inline-block"
                      />
                      {array.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => tagsFieldArray.remove(index)}
                          variant={"outline"}
                          className="text-red-500"
                        >
                          <Trash2Icon />
                        </Button>
                      )}
                    </div>
                  );
                }
              )}
            </div>

            <Button
              type="button"
              onClick={() => {
                tagsFieldArray.append({
                  label: "",
                  value: "",
                });
              }}
              className="mt-3 border border-black/10"
              variant={"secondary"}
            >
              Add Tag
            </Button>
          </div>
        </div>

        <div>
          <Label>Constraints</Label>
          <div className="">
            <div className="grid gap-x-10 gap-y-3 flex-1">
              {constraintsFieldArray.fields.map(
                ({ id, constraint }, index, array) => {
                  return (
                    <div className="flex gap-4">
                      <Input
                        key={id}
                        type="text"
                        id="constraints"
                        {...register(`constraints.${index}.constraint`)}
                        className=""
                      />
                      {array.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => constraintsFieldArray.remove(index)}
                          variant={"outline"}
                          className="text-red-500"
                        >
                          <Trash2Icon />
                        </Button>
                      )}
                    </div>
                  );
                }
              )}
            </div>

            <Button
              type="button"
              onClick={() => {
                constraintsFieldArray.append({
                  constraint: "",
                });
              }}
              className="mt-3 border border-black/10"
              variant={"secondary"}
            >
              Add Constraints
            </Button>
          </div>
        </div>

        <div>
          <Label>Examples</Label>
          <div className="">
            <div className="grid gap-x-10 gap-y-3 flex-1">
              {examplesFieldArray.fields.map(({ id, input }, index, array) => {
                return (
                  <div className="flex gap-4">
                    <Label>Input</Label>
                    <Textarea
                      key={id}
                      id="examples"
                      {...register(`examples.${index}.input`)}
                      className=""
                    />
                    <Label>Output</Label>
                    <Textarea
                      key={id}
                      id="examples"
                      {...register(`examples.${index}.output`)}
                      className=""
                    />
                    {array.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => examplesFieldArray.remove(index)}
                        variant={"outline"}
                        className="text-red-500"
                      >
                        <Trash2Icon />
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>

            <Button
              type="button"
              onClick={() => {
                examplesFieldArray.append({
                  input: "",
                  output: "",
                });
              }}
              className="mt-3 border border-black/10"
              variant={"secondary"}
            >
              Add Examples
            </Button>
          </div>
        </div>

        <div>
          <Label>Solutions</Label>
          <div className="">
            <div className="grid gap-x-10 gap-y-3 flex-1">
              {solutionsFieldArray.fields.map(
                ({ id, solution }, index, array) => {
                  return (
                    <div className="flex gap-4">
                      <Textarea
                        key={id}
                        id="solutions"
                        {...register(`solutions.${index}.solution`)}
                        className=""
                      />
                      {array.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => solutionsFieldArray.remove(index)}
                          variant={"outline"}
                          className="text-red-500"
                        >
                          <Trash2Icon />
                        </Button>
                      )}
                    </div>
                  );
                }
              )}
            </div>

            <Button
              type="button"
              onClick={() => {
                solutionsFieldArray.append({
                  solution: "",
                  downvote: 0,
                  upvote: 0,
                });
              }}
              className="mt-3 border border-black/10"
              variant={"secondary"}
            >
              Add Solutions
            </Button>
          </div>
        </div>

        {/* <DevTool control={control} /> */}
        <Button>Submit</Button>
      </form>
    </main>
  );
};

export default AdminIndexPage;
