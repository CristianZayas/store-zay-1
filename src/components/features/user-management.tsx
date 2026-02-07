"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { User, UserSchema } from "@/schemas/user.schema";
import { userService } from "@/services/user.service";

const formSchema = UserSchema.omit({ id: true });

export function UserManagement() {
  const { toast } = useToast();
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState<User | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const usersPerPage = 5;
  const [hasMore, setHasMore] = React.useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const fetchUsers = React.useCallback(async (page: number, append: boolean = false) => {
    setLoading(true);
    try {
      const fetchedUsers = await userService.getAll(page, usersPerPage);
      if (append) {
        setUsers((prevUsers) => [...prevUsers, ...fetchedUsers]);
      } else {
        setUsers(fetchedUsers);
      }
      setHasMore(fetchedUsers.length === usersPerPage);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch users.",
        variant: "destructive",
      });
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, [toast, usersPerPage]);

  React.useEffect(() => {
    fetchUsers(1, false);
  }, [fetchUsers]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchUsers(nextPage, true);
      return nextPage;
    });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (editingUser) {
        await userService.update(editingUser.id, values);
        toast({
          title: "Success",
          description: "User updated successfully.",
        });
      } else {
        await userService.create(values);
        toast({
          title: "Success",
          description: "User created successfully.",
        });
      }
      form.reset();
      setIsDialogOpen(false);
      setEditingUser(null);
      setCurrentPage(1); // Reset to first page after CUD operation
      fetchUsers(1, false); // Re-fetch first page
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${editingUser ? "update" : "create"} user.`,
        variant: "destructive",
      });
      console.error(`Failed to ${editingUser ? "update" : "create"} user:`, error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await userService.delete(id);
      toast({
        title: "Success",
        description: "User deleted successfully.",
      });
      setCurrentPage(1); // Reset to first page after delete
      fetchUsers(1, false); // Re-fetch first page
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user.",
        variant: "destructive",
      });
      console.error("Failed to delete user:", error);
    }
  };

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    form.reset({
      username: user.username,
      email: user.email,
      password: user.password, // Note: In a real app, you wouldn't pre-fill passwords for security.
    });
    setIsDialogOpen(true);
  };

  const handleNewUserClick = () => {
    setEditingUser(null);
    form.reset({
      username: "",
      email: "",
      password: "",
    });
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleNewUserClick}>Add New User</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
              <DialogDescription>
                {editingUser
                  ? "Make changes to the user profile here."
                  : "Fill in the details for the new user."}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" type="email" {...field} />
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
                        <Input placeholder="********" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">
                    {editingUser ? "Save Changes" : "Create User"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {loading && users.length === 0 ? (
        <div>Loading users...</div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {hasMore && (
            <div className="flex justify-center mt-4">
              <Button onClick={handleLoadMore} disabled={loading}>
                {loading ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
