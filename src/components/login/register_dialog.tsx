"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

const FormSchema = z.object({
  email: z.string().email(),
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(32, {
      message: "Username must be at least 32 characters.",
    }),
  password: z
    .string()
    .min(4, {
      message: "Password must be at least 2 characters.",
    })
    .max(127, {
      message: "Password must be at least 32 characters.",
    }),
});

const RegisterDialog: React.FC<Props> = ({ isOpen, setOpen }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    toast(values.username + " registered");
    setOpen(false);
  };
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className="bg-gray-100 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Register</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  className="bg-gray-500 hover:bg-gray-600"
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Login
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegisterDialog;
