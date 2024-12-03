"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import SubmitButton from "../SubmitButton";

export default function RegistrationForm() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const participants: Participant[] = JSON.parse(
      localStorage.getItem("participants") || "[]"
    );
    const newParticipant: Participant = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      phone,
      address,
      phoneNumber: phone,
      checkinStatus: "pending",
      checkinTime: "2:00",
    };
    participants.push(newParticipant as Participant);
    localStorage.setItem("participants", JSON.stringify(participants));
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold text-center text-gray-800">
          Event Registration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:border-black focus:ring-black"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:border-black focus:ring-black"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700"
            >
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:border-black focus:ring-black"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="address"
              className="text-sm font-medium text-gray-700"
            >
              Address
            </Label>
            <Input
              id="address"
              type="text"
              placeholder="Enter your full address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:border-black focus:ring-black"
            />
          </div>
          <SubmitButton
            loadingtext="registering..."
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white py-2  mt-2 transition-colors rounded-xl"
          >
            Register
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
}
