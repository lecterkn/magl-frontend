"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CategoryApiFactory, Configuration, StoryApiFactory } from "@/api";
import { API_HOST_BASEPATH } from "@/api/global";
import { useAuthStore } from "@/store/user";
import { toast } from "sonner";

const FormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Titile must be at least 2 characters.",
    })
    .max(64, {
      message: "Titile must be at least 64 characters.",
    }),
  episode: z
    .string()
    .min(2, {
      message: "Episode must be at least 1 characters.",
    })
    .max(32, {
      message: "Episode must be at least 32 characters.",
    }),
  description: z.string().max(1000, {
    message: "Description must be at least 1000 characters.",
  }),
  categoryId: z.string(),
  imageFile: z
    .instanceof(File)
    .refine(
      (file) => {
        !file || ["image/png", "image/jpeg", "image/jpg"].includes(file.type);
      },
      { message: "Invalid image file type" },
    )
    .nullish(),
});

const fetchCategories = (
  setCategories: (categories: CategoryModel[] | null) => void,
) => {
  const config = new Configuration({
    basePath: API_HOST_BASEPATH,
  });
  CategoryApiFactory(config)
    .categoriesGet()
    .then((response) => {
      const categories: CategoryModel[] = [];
      response.data.list.map((category) => {
        categories.push({
          id: category.id,
          name: category.name,
        });
      });
      setCategories(categories);
    })
    .catch(() => {
      setCategories([]);
    });
};

function AddStoryForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      episode: "",
      description: "",
    },
  });
  const { auth } = useAuthStore();
  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    if (!API_HOST_BASEPATH) {
      console.log("API_HOST_BASEPATH is not set");
      return;
    }
    if (!auth?.accessToken) {
      console.log("accessToken is not set");
      return;
    }
    const config = new Configuration({
      basePath: API_HOST_BASEPATH,
      apiKey: "Bearer " + auth.accessToken,
    });
    StoryApiFactory(config)
      .storiesPost(
        values.categoryId,
        values.title,
        values.episode,
        values.description,
        values.imageFile ?? undefined,
      )
      .then((response) => {
        if (response.status == 204) {
          toast("success to add story");
          form.reset();
        } else {
          toast("failed to add story");
        }
      })
      .catch(() => {
        toast("failed to add story");
      });
  };
  const [categories, setCategories] = useState<CategoryModel[] | null>(null);
  if (!categories) {
    fetchCategories(setCategories);
  }

  return (
    <div className="container mx-auto w-full max-w-2xl bg-white p-6 sm:p-8 rounded-xl shadow-lg">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
        Add Story
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Blue Archive" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="episode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Episode</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Episode1-Chapter2" {...field} />
                </FormControl>
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
                  <Textarea
                    className="w-full"
                    placeholder="Brief summary of the episode or story arc..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      if (event.target.files && event.target.files.length > 0) {
                        const selectedFile = event.target.files[0];
                        field.value = selectedFile;
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end pt-4">
            <button className="text-white px-4 py-2 rounded-md transition-colors bg-blue-700 hover:bg-blue-800">
              Submit
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default AddStoryForm;
