"use client";

import { QRCodeCanvas } from "qrcode.react";
import { Copy, Check } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
//import { usePathname } from "next/navigation";
//import { useRouter } from "next/navigation";

export default function AgentPage() {
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [baseUrl, setBaseUrl] = useState("");
  const [qrSize, setQrSize] = useState(360);

  // Update the agent link to use the dynamic base URL
  const agentLink: string = user
    ? `${baseUrl}/register?id=${user?.inviteCode}`
    : "";

  useEffect(() => {
    // Get base URL on component mount
    if (typeof window !== "undefined") {
      const protocol = window.location.protocol;
      const hostname = window.location.hostname;
      const port = window.location.port;
      const base = `${protocol}//${hostname}${port ? `:${port}` : ""}`;
      setBaseUrl(base);
    }

    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const updateQrSize = () => {
      setQrSize(window.innerWidth < 640 ? 260 : 360);
    };

    // Set initial size
    updateQrSize();

    // Add resize listener
    window.addEventListener("resize", updateQrSize);

    return () => window.removeEventListener("resize", updateQrSize);
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(agentLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="min-h-full h-full w-full py-[2rem] lg:py-[3rem]  max-w-7xl">
      <div className=" px-4 font-bold text-xl text-stone-900">
        Agent Profile
      </div>
      <div className="max-w-7xl w-full mx-auto  p-4 sm:p-8  min-h-full h-full">
        <div className="flex flex-col md:flex-row md:items-start md:space-x-8 lg:space-x-12 md:space-y-0 min-h-full items-center space-y-6 h-full">
          <div className="w-full max-w-full md:max-w-full min-h-full bg-white border rounded-xl p-4 sm:p-6 grid lg:grid-cols-2  gap-4">
            <div className="flex flex-col gap-4 lg:gap-6 w-full">
              <div className="flex flex-col lg:flex-row items-center gap-4 md:sticky md:top-8">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-black">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Agent"
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>

                <div className="text-start space-y-1 sm:space-y-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
                    {user?.fullName}
                  </h2>
                  {/* <p className="text-gray-600 text-base sm:text-lg">
                    Registration Agent
                  </p> */}
                  <p className="text-gray-500 text-sm sm:text-base">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-gray-700 font-medium">
                  Share Registration Link
                </h3>
                <p className="text-sm text-gray-500">
                  Share this link with clients to start their registration
                  process
                </p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="registration-link"
                  className="block text-sm font-medium text-gray-700"
                >
                  Registration URL
                </label>
                <div className="flex items-center gap-2 ">
                  <Link
                    id="registration-link"
                    href={agentLink}
                    className="flex-1 py-3 px-3 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors text-sm break-all "
                    title="Click to open registration link"
                  >
                    {agentLink}
                  </Link>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-2 h-full w-full b flex flex-col lg:border-l  min-h-full lg:px-4">
              <p className="text-sm font-medium text-gray-700">QR Code</p>
              <p className="text-sm text-gray-500">
                Scan with a mobile device to access the registration form
              </p>
              <div className="h-full items-center justify-center w-full ">
                {" "}
                <div className="flex-1 justify-center items-center flex-col lg:pt-10 pt-6">
                  <div className="p-2 bg-white rounded-xl border border-black  w-full max-w-[280px] sm:max-w-[380px] aspect-square mx-auto">
                    <QRCodeCanvas
                      value={agentLink}
                      size={qrSize}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
