import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
  Baby,
  UserRound,
} from "lucide-react";
import { Button } from "~/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/_components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "~/_components/ui/table";
import { DashboardShell } from "~/_components/shell";
import { DashboardHeader } from "~/_components/header";
import AllStays from "~/app/_components/AllStays";
import ReservationsTable from "~/app/_components/ReservationsTable";
import AllReservationNumber, {
  ResidentsAdults,
  ResidentsBaby,
  TotalRevenue,
} from "~/app/_components/Numbers";
import ActiveStays from "~/app/_components/Numbers";

export default async function Reservations() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Reservations"
        text="Manage and accept Reservations  ."
      />
      <div className="flex w-full flex-col">
        <main className="flex flex-1 flex-col gap-4  md:gap-8 ">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card x-chunk="dashboard-01-chunk-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  DZD
                  <TotalRevenue />
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Residents</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-row justify-around">
                  <div className="flex flex-row items-center gap-1 ">
                    <Baby />
                    <ResidentsBaby />
                  </div>
                  <div className="flex flex-row items-center gap-1 ">
                    <UserRound />
                    <ResidentsAdults />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Stays
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <AllReservationNumber />
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Stays
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <ActiveStays />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Stays</CardTitle>
                  <CardDescription>
                    Recent Stays from your Listings.
                  </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                  <Link href="#">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <ReservationsTable />
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-5">
              <CardHeader>
                <CardTitle>Active Stays</CardTitle>
              </CardHeader>
              <CardContent>
                <AllStays />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </DashboardShell>
  );
}
