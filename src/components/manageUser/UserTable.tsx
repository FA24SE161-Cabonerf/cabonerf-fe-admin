import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil } from 'lucide-react';
import SkeletonTable from "@/components/sketeton/SkeletonTable";
import { User } from "@/types/userListType";
import { Switch } from "@/components/ui/switch";

interface UserTableProps {
  users: User[] | undefined;
  onEdit: (id: string) => void;
  onToggleStatus: (id: string, newStatus: boolean) => void;
  isLoading: boolean;
}

const UserTable = ({
  users,
  onEdit,
  onToggleStatus,
  isLoading,
}: UserTableProps) => {
  const renderIcon = (iconUrl: string | null) => {
    if (!iconUrl) {
      return <span className="w-5 h-5 bg-gray-200 rounded-full"></span>;
    }
    if (iconUrl.startsWith('<svg')) {
      return <span dangerouslySetInnerHTML={{ __html: iconUrl }} />;
    } else {
      return <img src={iconUrl} alt="Icon" className="w-5 h-5 object-contain" />;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Full Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Bio</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      {isLoading ? (
        <SkeletonTable columns={6} rows={5} />
      ) : (
        <TableBody>
          {users && users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 flex items-center justify-center mr-3">
                      {renderIcon(user.profilePictureUrl)}
                    </div>
                    <span>{user.fullName}</span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone || '-'}</TableCell>
                <TableCell>{user.bio || '-'}</TableCell>
                <TableCell>  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.status
                        ? "bg-slate-800 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {user.status ? "active" : "Inactive"}
                  </span></TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(user.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Switch
                      checked={user.status}
                      onCheckedChange={(checked) => onToggleStatus(user.id, checked)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      )}
    </Table>
  );
};

export default UserTable;