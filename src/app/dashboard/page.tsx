import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignOutButton from "./components/sign-out-button";

const Dashboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect("/authentication")
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        {session?.user.name} <br />
        {session?.user.email}
      </p>

      <SignOutButton />
    </div>
  );
};

export default Dashboard;
