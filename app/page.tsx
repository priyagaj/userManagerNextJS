import Image from "next/image";
import AddUser from "./components/AddUser";
import UserTable from "./components/UserTable";

export default function Home() {
  return (
    <>
    <header>
      <h1 className="py-3 text-center font-bold">User Manager</h1>
    </header>
    <main>
      <AddUser />
      <UserTable />
    </main>
    </>
  );
}
