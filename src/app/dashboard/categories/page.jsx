"use client";
import { useActionState, useEffect, useState } from "react";
import { instance } from "@/api";
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
import { createCategory } from "@/app/actions/category";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "@mosespace/toast";

export default function CategoriesPage() {
  const [state, action, isPending] = useActionState(createCategory, undefined);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    instance.get("/categories").then((response) => {
      setCategories(response.data);
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      fetchCategories();
    }
    if (state?.errors) {
      toast.error(state.errors.name);
    }
  }, [state]);

  const fetchCategories = async () => {
    const response = await instance.get("/categories");
    setCategories(response.data);
  };

  return (
    <div className="w-full">
      {/* <Headline
        title="Categories"
        link="/dashboard/categories/create-category"
        linkText="Create Category"
      /> */}
      <div className="flex flex-row justify-between align-middle items-center">
        <h1 className="text-2xl font-bold">Categories</h1>
        {/* Create Category Dialog */}
        <Dialog>
          <DialogTrigger className="hover:cursor-pointer hover:bg-accent p-4 rounded-xl">
            Create Category
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a Category</DialogTitle>
              <DialogDescription>
                <form action={action} className="space-y-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <label htmlFor="name">
                      <p>Name</p>
                    </label>
                    <Input label="Name" type="text" name="name" />
                    <p className="text-red-500">
                      {state?.errors?.name && <p>{state.errors.name}</p>}
                    </p>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <label htmlFor="description">
                      <h2>Description</h2>
                    </label>
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
          <Table>
            <TableCaption>A list of your Categories</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">
                  {categories.length}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
