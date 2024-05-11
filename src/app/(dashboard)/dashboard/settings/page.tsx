import { redirect } from "next/navigation";

import { DashboardHeader } from "~/_components/header";
import { DashboardShell } from "~/_components/shell";
import UserNameForm from "~/_components/UserNameForm";
import { authOptions, getServerAuthSession } from "~/server/auth";

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
};

export default async function SettingsPage() {
  const session = await getServerAuthSession();
  const user = session?.user;

  if (!user) {
    redirect(authOptions?.pages?.signIn ?? "/login");
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="grid gap-10">
        <UserNameForm user={{ id: user.id, name: user.name ?? "" }} />
      </div>
    </DashboardShell>
  );
}
