import {
  ArrowLeft,
  Check,
  Clock,
  FileText,
  Mail,
  MessageSquare,
  Plus,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const hostUrl = process.env.NEXT_PUBLIC_HOST_URL;

function InterviewLink({ interviewIdToLink, formData }) {
  const [link, setLink] = useState("");
  const router = useRouter();

  useEffect(() => {
    generateLink();
  }, []);
  const generateLink = () => {
    const link = hostUrl + "/interview/" + interviewIdToLink;
    setLink(link);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(link);
    toast("Link copied to clipboard");
  };

  return (
    <div className="mx-auto bg-white rounded-xl shadow-sm p-6 space-y-8">
      <div className="flex justify-center">
        <div className="bg-green-100 p-3 rounded-full">
          <Check className="h-6 w-6 text-green-500" />
        </div>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-xl font-semibold">Your AI Interview is Ready!</h1>
        <p className="text-gray-500 text-sm">
          Share this link with your candidates to start the interview process
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="font-medium text-sm">Interview Link</p>
          <span className="text-xs bg-amber-50 text-primary px-2 py-1 rounded-full">
            Valid for 30 days
          </span>
        </div>

        <div className="flex items-center justify-between border rounded-lg overflow-hidden">
          <div className="px-3 py-2 truncate text-gray-600 text-sm">{link}</div>
          <Button
            onClick={copyLink}
            className="rounded-l-none h-full bg-primary"
          >
            <span className="mr-2">Copy Link</span>
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          <span>{formData.interviewDuration} Minutes</span>
        </div>
        <div className="flex items-center">
          <FileText className="h-4 w-4 mr-1" />
          <span>10 Questions</span>
        </div>
      </div>

      <div className="space-y-3">
        <p className="font-medium text-sm">Share via</p>
        <div className="grid grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="flex items-center justify-center space-x-2"
          >
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center space-x-2"
          >
            <div className="h-4 w-4 flex items-center justify-center">
              <span className="text-lg">#</span>
            </div>
            <span>Slack</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center space-x-2"
          >
            <MessageSquare className="h-4 w-4" />
            <span>WhatsApp</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4">
        <Button
          onClick={() => router.push("/dashboard")}
          variant="outline"
          className="flex items-center justify-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <Button
          onClick={() => router.push("/dashboard/create-interview")}
          className="bg-primary flex items-center justify-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Interview
        </Button>
      </div>
    </div>
  );
}

export default InterviewLink;
