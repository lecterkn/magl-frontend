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
import { CategoryApiFactory, Configuration } from "@/api";
import { API_HOST_BASEPATH } from "@/api/global";
import { useAuthStore } from "@/store/user";
import { toast } from "sonner";

const FormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(64, {
      message: "Name must be at least 64 characters.",
    }),
  description: z.string().max(1000, {
    message: "Description must be at least 1000 characters.",
  }),
  imageFile: z
    .instanceof(File)
    .refine(
      (file) => {
        if (!file) {
          return true;
        }
        return ["image/png", "image/jpeg", "image/jpg"].includes(file.type);
      },
      { message: "Invalid image file type" },
    )
    .nullish(),
});

function AddCategoryForm() {
  const auth = useAuthStore((state) => state.auth);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    if (!auth) {
      toast("authorization error");
      return;
    }
    const config = new Configuration({
      basePath: API_HOST_BASEPATH,
      apiKey: "Bearer " + auth.accessToken,
    });
    CategoryApiFactory(config)
      .categoriesPost(
        values.name,
        values.description,
        values.imageFile ?? undefined,
      )
      .then(() => {
        toast("success to add category");
        form.reset();
      })
      .catch(() => {
        toast("failed to add category");
      });
  };

  return (
    <div className="container mx-auto w-full max-w-2xl bg-white p-6 sm:p-8 rounded-xl shadow-lg">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
        Add Category
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Blue Archive" {...field} />
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

export default AddCategoryForm;
