import Navbar from "@/components/Nav-Bar";
import MessageArea from "./contactPage/SingleMessage";

export default function Message() {
  return (
    <>
      <div className="w-screen h-screen overflow-hidden">
        <Navbar />
        <MessageArea/>
      </div>
    </>
  );
}
