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
import { useState } from "react";
import RegisterDialog from "./register_dialog";
import { toast } from "sonner";
import { useAuthStore } from "@/store/user";
import { AuthApiFactory, Configuration } from "@/api";
import { API_HOST_BASEPATH } from "@/api/global";

interface Props {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

const FormSchema = z.object({
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
      message: "Password must be at least 4 characters.",
    })
    .max(127, {
      message: "Password must be at least 127 characters.",
    }),
});

const LoginDialog: React.FC<Props> = ({ isOpen, setOpen }) => {
  const [isOpenRegisterDialog, setOpenRegisterDialog] = useState(false);
  const { setAuth } = useAuthStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    const config = new Configuration({
      basePath: API_HOST_BASEPATH,
    });
    AuthApiFactory(config)
      .signinPost({
        username: values.username,
        password: values.password,
      })
      .then((response) => {
        setAuth({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });

        toast("logged in");
        setOpen(false);
      })
      .catch((e) => {
        console.log(e);
        toast("failed to logged in");
      });
  };
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className="bg-gray-100 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <div>
                <p>Dont have an account?</p>
                <a
                  className="font-semibold text-blue-600"
                  href="#"
                  onClick={() => {
                    setOpen(false);
                    setOpenRegisterDialog(true);
                  }}
                >
                  Sign up
                </a>
              </div>
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
      <RegisterDialog
        isOpen={isOpenRegisterDialog}
        setOpen={setOpenRegisterDialog}
      />
    </div>
  );
};

export default LoginDialog;
