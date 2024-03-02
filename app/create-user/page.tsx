import CreateUserForm from "./components/create-user-form";

export default function CreateUser () {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-3xl font-bold">Create User</h1>
      <CreateUserForm />
    </main>
  );
}
