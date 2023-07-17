"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useForm, useFieldArray } from "react-hook-form";
import TextEditor from "@/components/textEditor/TextEditor";
import { useState } from "react";
import { Tabs, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ExampleSchema = z.object({
  input: z.string(),
  output: z.string(),
});

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  tags: z.array(z.string()).optional(),
  examples: z.array(ExampleSchema).default([
    {
      input: "Hello",
      output: "KSOn",
    },
  ]),
  solutions: z.array(z.string()),
  constraints: z.array(z.string()),
});

export default function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  const { toast } = useToast();

  const [hideAllToolbar, setHideAllToolbar] = useState(false);

  const { append, remove, fields } = useFieldArray({
    name: "examples",
    control: form.control,
  });

  return (
    <main className="flex-1 py-3 px-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Question Title" {...field} />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Question Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty</FormLabel>
                <FormControl>
                  <div className="flex gap-3">
                    <div>
                      <label
                        htmlFor="Easy"
                        className={`${
                          field.value === "Easy"
                            ? "bg-primary text-white px-3 py-[9px] pb-[10px] rounded text-sm"
                            : "px-3 py-[9px] pb-[10px] rounded text-sm"
                        }`}
                      >
                        Easy
                      </label>
                      <input
                        onChange={(e) => {
                          field.onChange(
                            e.target.value as "Easy" | "Medium" | "Hard"
                          );
                        }}
                        className="opacity-0"
                        type="radio"
                        name="difficulty"
                        value={"Easy"}
                        id="Easy"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="Medium"
                        className={`${
                          field.value === "Medium"
                            ? "bg-primary text-white px-3 py-[9px] pb-[10px] rounded text-sm "
                            : "px-3 py-[9px] pb-[10px] rounded text-sm "
                        }`}
                      >
                        Medium
                      </label>
                      <input
                        onChange={(e) => {
                          field.onChange(
                            e.target.value as "Easy" | "Medium" | "Hard"
                          );
                        }}
                        className="opacity-0"
                        type="radio"
                        name="difficulty"
                        value={"Medium"}
                        id="Medium"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="Hard"
                        className={`${
                          field.value === "Hard"
                            ? "bg-primary text-white px-3 py-[9px] pb-[10px] rounded text-sm "
                            : "px-3 py-[9px] pb-[10px] rounded text-sm "
                        }`}
                      >
                        Hard
                      </label>
                      <input
                        onChange={(e) => {
                          field.onChange(
                            e.target.value as "Easy" | "Medium" | "Hard"
                          );
                        }}
                        className="opacity-0"
                        type="radio"
                        name="difficulty"
                        value={"Hard"}
                        id="Hard"
                      />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tag</FormLabel>
                <FormControl>
                  <Input placeholder="Tag" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="examples"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Examples</FormLabel>
                <FormControl>
                  <>
                    {fields.map(({ input, output, id }) => {
                      return <Textarea key={id} placeholder="Tag" />;
                    })}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <TextEditor hideToolbar={hideAllToolbar} />
    </main>
  );
}
