import { ExternalLink } from "lucide-react";

export default function Sticky() {
  return (
    <a href="/docs" className="">
      <div className="z-[100] w-[130px] h-[35px] bg-black rounded-[10px] text-white fixed bottom-[10px] right-[10px] flex items-center justify-center  ">
        View Docs <ExternalLink className="h-4 w-4 ml-2" />
      </div>
    </a>
  );
}
