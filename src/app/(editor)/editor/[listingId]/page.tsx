import { notFound, redirect } from "next/navigation";
import { type Listing } from "@prisma/client";

import { api } from "~/trpc/server";
import { authOptions, getServerAuthSession } from "~/server/auth";

async function getPostForUser(listingId: Listing["id"]) {
  const data = await api.listing.listingByUser.query(listingId);
  return data;
}

interface EditorPageProps {
  params: { listingId: string };
}

export default async function EditorPage({ params }: EditorPageProps) {
  const session = await getServerAuthSession();
  const user = session?.user;

  if (!user) {
    redirect(authOptions?.pages?.signIn ?? "/login");
  }

  const post = await getPostForUser(params.listingId);

  if (!post) {
    notFound();
  }

  return <div>listing page</div>;
}
