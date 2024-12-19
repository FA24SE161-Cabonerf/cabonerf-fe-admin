import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useUsersToInvite,
  useInviteUsersToOrganization,
} from "@/api/manageOrganization";
import { toast } from "@/hooks/use-toast";
import Pagination from "@/components/pagination/Pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const formSchema = z.object({
  userIds: z
    .array(z.string())
    .min(1, "Please select at least one user to invite"),
});

type FormData = z.infer<typeof formSchema>;

interface InviteUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizationId: string;
  currentUserId: string;
}

const InviteUsersModal = ({
  isOpen,
  onClose,
  organizationId,
  currentUserId,
}: InviteUsersModalProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { data: usersData, error } = useUsersToInvite(
    page,
    pageSize,
    searchKeyword
  );
  const inviteUsersMutation = useInviteUsersToOrganization();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userIds: [],
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset();
      setSearchKeyword("");
      setPage(1);
    }
  }, [isOpen, form]);

  const handleSubmit = async (values: FormData) => {
    try {
      await inviteUsersMutation.mutateAsync({
        request: { userIds: values.userIds, organizationId },
        userId: currentUserId,
      });
      toast({
        title: "Success",
        description: "Users invited successfully.",
      });
      onClose();
    } catch (error) {
      console.error("Failed to invite users:", error);
      toast({
        title: "Error",
        description: `${error}`,
        variant: "destructive",
      });
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Invite Users to Organization</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 flex-grow overflow-hidden flex flex-col"
          >
            <ScrollArea className="flex-grow pr-4">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="userIds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Users</FormLabel>
                      <div className="mb-2">
                        <Input
                          placeholder="Search users"
                          value={searchKeyword}
                          onChange={(e) => {
                            setSearchKeyword(e.target.value);
                            setPage(1);
                          }}
                        />
                      </div>
                      <ScrollArea className="h-[300px] border rounded-md">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[50px]">Select</TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead>Email</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {usersData?.users.map((user) => (
                              <TableRow key={user.id}>
                                <TableCell>
                                  <Checkbox
                                    checked={field.value.includes(user.id)}
                                    onCheckedChange={(checked) => {
                                      const updatedValue = checked
                                        ? [...field.value, user.id]
                                        : field.value.filter(
                                            (id) => id !== user.id
                                          );
                                      field.onChange(updatedValue);
                                    }}
                                  />
                                </TableCell>
                                <TableCell className="flex items-center gap-4">
                                  <Avatar>
                                    <AvatarImage src={user.profilePictureUrl} />
                                    <AvatarFallback>
                                      {user.fullName
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  {user.fullName}
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      {error instanceof Error
                        ? error.message
                        : "An unknown error occurred"}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </ScrollArea>
            <Pagination
              page={page}
              pageSize={pageSize}
              totalPages={usersData?.totalPage || 1}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
            <DialogFooter className="mt-4">
              <Button type="submit" disabled={inviteUsersMutation.isPending}>
                {inviteUsersMutation.isPending ? "Inviting..." : "Invite Users"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteUsersModal;
