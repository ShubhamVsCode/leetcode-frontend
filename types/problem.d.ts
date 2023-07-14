import { z } from "zod";

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

const FormType = z.infer<typeof FormSchema>