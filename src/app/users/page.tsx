import { UserManagement } from "@/components/features/user-management";

export default function UsersPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Gestión de Usuarios</h1>
      <UserManagement />
    </div>
  );
}