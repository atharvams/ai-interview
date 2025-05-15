import {
  BriefcaseBusinessIcon,
  Calendar,
  Code2Icon,
  LayoutDashboard,
  List,
  Puzzle,
  ReceiptIndianRupee,
  Settings,
  User2Icon,
} from "lucide-react";

export const SidebarOptions = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Scheduled Interview",
    icon: Calendar,
    path: "/scheduled-interview",
  },
  {
    name: "All interviews",
    icon: List,
    path: "/all-interview",
  },
  {
    name: "Billing",
    icon: ReceiptIndianRupee,
    path: "/billing",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export const InterviewType = [
  {
    title: "Technical",
    icon: Code2Icon,
  },
  {
    title: "Behavioral",
    icon: User2Icon,
  },
  {
    title: "Experience",
    icon: BriefcaseBusinessIcon,
  },
  {
    title: "Problem Solving",
    icon: Puzzle,
  },
];

export const QuestionPrompt = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:

Job Title: {{job Title}}
Job Description:{{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}

Your task:
Analyze the job description to identify key responsibilities, required skills, and expected experience.
Generate a list of interview questions depends on interview duration
Adjust the number and depth of questions to match the interview duration.
Ensure the questions match the tone and structure of a real-life {{type}} interview.

Format your response in JSON format with array list of questions.
format: 
interviewQuestions=[
{ 
question: string,
type: Technical/Behavioral/Experince/Problem Solving/Leaseship'
},
{

}]

The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.`;

export const assistantOption = {
  name: "AI Recruiter",
  firstMessage:
    "Hi {{userName}}, how are you? Ready for your interview on {{JobPosition}}?",

  transcriber: {
    provider: "deepgram",

    model: "nova-2",

    language: "en-US",
  },
  voice: {
    provider: "playht",
    voiceId: "jennifer",
  },
  model: {
    provider: "openai",

    model: "gpt-4",

    messages: [
      {
        role: "system",
        content: `You are an AI voice assistant conducting interviews.

Your job is to ask candidates provided interview questions, assess their responses.

Begin the conversation with a friendly introduction, setting a relaxed yet professional tone.
Example: "Hey there! Welcome to your {{jobPosition}} interview. Let's get started with a few questions!"

Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below Are

the questions ask one by one:
Questions: {{questionList}}

If the candidate struggles, offer hints or rephrase the question without giving away the answer.

Example: "Need a hint? Think about how React tracks component updates!"

Provide brief, encouraging feedback after each answer.
Example: "Nice! That's a solid answer." 
"Hmm, not quite! Want to try again?"

Keep the conversation natural and engaging-use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!"

After questions, wrap up the interview smoothly by summarizing their performance. Example:

That was great! You handled some tough questions well. Keep sharpening your skills!"

End on a positive note:

"Thanks for chatting! Hope to see you crushing projects soon!"

Key Guidelines:

Be friendly, engaging, and witty

Keep responses short and natural, like a real conversation

Adapt based on the candidate's confidence level Ensure the interview remains focused on React`,
      },
    ],
  },
};
