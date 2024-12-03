"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AgentDashboard() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedParticipants: Participant[] = JSON.parse(
      localStorage.getItem("participants") || "[]"
    );
    const storedUser = JSON.parse(localStorage.getItem("userData") || "null");
    setParticipants(storedParticipants);
    setUser(storedUser);
    setLoading(false);
  }, []);

  const EmptyState = () => (
    <div className="text-center py-10">
      <p className="text-gray-500 text-lg">No participants registered yet</p>
      <p className="text-gray-400 text-sm mt-1">
        Participants will appear here once they register
      </p>
    </div>
  );

  const LoadingState = () => (
    <div className="flex justify-center items-center py-10">
      <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
    </div>
  );

  return (
    <div className="py-8 px-4 w-full max-w-7xl mx-auto space-y-8 h-full ">
      <Card className=" h-full">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-black text-white">
                {user?.email?.substring(0, 2).toUpperCase() || "AN"}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {user?.fullName || "Agent Name"}
              </CardTitle>
              <p className="text-gray-600">
                {user?.email || "agent@example.com"}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Participants
            </h3>

            {loading ? (
              <LoadingState />
            ) : participants.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="rounded-lg border border-gray-200">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold">Name</TableHead>
                      <TableHead className="font-semibold">Email</TableHead>
                      <TableHead className="font-semibold">
                        Phone Number
                      </TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">
                        Check-in Time
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {participants.map((participant, index) => (
                      <TableRow key={index}>
                        <TableCell>{participant.name}</TableCell>
                        <TableCell>{participant.email}</TableCell>
                        <TableCell>{participant.phoneNumber}</TableCell>
                        <TableCell>{participant.checkinStatus}</TableCell>
                        <TableCell>{participant.checkinTime || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
