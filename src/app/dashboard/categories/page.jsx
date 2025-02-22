"use client";
import { useActionState, useEffect, useState } from "react";
import { instance } from "@/api";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-menubar";
import { createCategory } from "@/app/actions/category";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function CategoriesPage() {
  const [state, action, isPending] = useActionState(createCategory, undefined);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    instance.get("/categories").then((response) => {
      setCategories(response.data);
      console.log(response.data);
    });
  }, []);

  const fetchCategories = async () => {
    const response = await instance.get("/categories");
    setCategories(response.data);
  }

  return (
    <div className="w-full">
      {/* <Headline
        title="Categories"
        link="/dashboard/categories/create-category"
        linkText="Create Category"
      /> */}
      <div className="flex flex-row justify-between align-middle items-center">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Dialog>
          <DialogTrigger>
            <Button>Create Category</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a Category</DialogTitle>
              <DialogDescription>
                <form action={action} className="space-y-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="name">
                      <h2>Name</h2>
                    </Label>
                    <Input label="Name" type="text" name="name" />
                    <p className="text-red-500">
                      {state?.errors?.name && <p>{state.errors.name}</p>}
                    </p>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="description">
                      <h2>Description</h2>
                    </Label>
                    <Input label="Description" type="text" name="description" />
                    <p className="text-red-500">
                      {state?.errors?.description && (
                        <p>{state.errors.description}</p>
                      )}
                    </p>
                  </div>
                  <p>
                    {state?.message && (
                      <Alert>
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Warning</AlertTitle>
                        <AlertDescription>{state.message}</AlertDescription>
                      </Alert>
                    )}
                  </p>
                  <Button disabled={isPending}>
                    {isPending ? "Creating..." : "Create"}
                  </Button>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-row justify-start align-middle p-4 flex-wrap gap-2">
        {categories.length === 0 ? (
          <div>No categories available.</div>
        ) : (
          categories.map((category) => (
            <Card key={category.id} className="w-1/4">
              <CardHeader>
                <CardTitle>House Name</CardTitle>
                <CardDescription>{category.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{category.description}</p>
              </CardContent>
              <CardFooter>
                <div className="w-full flex flex-row justify-start align-middle text-sm gap-2">
                  <TrashIcon className="size-4 hover:cursor-pointer" />
                  <PencilIcon className="size-4 hover:cursor-pointer" />
                </div>
              </CardFooter>
            </Card>

            // <div
            //   key={category.id}
            //   className="flex flex-col justify-between align-middle bg-blue-950 text-white p-2 rounded-lg w-1/4 gap-4"
            // >
            //   <h2 className="text-white text-2xl font-bold capitalize">
            //     {category.name}
            //   </h2>
            //   <p className="text-sm">{category.description}</p>
            //   <div className="flex flex-row justify-end align-middle">
            //     <div className="w-full flex flex-row justify-end align-middle text-sm gap-2">
            //       <TrashIcon className="size-4 text-red-400 hover:cursor-pointer" />
            //       <PencilIcon className="size-4 text-green-400 hover:cursor-pointer" />
            //     </div>
            //   </div>
            // </div>
          ))
        )}
      </div>
    </div>
  );
}
