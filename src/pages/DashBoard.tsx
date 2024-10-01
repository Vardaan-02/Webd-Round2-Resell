import Navbar from "@/components/Nav-Bar";

export default function DashBoard() {
  return (
    <>
      <div className="w-screen h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-full">
          <div className="flex h-full bg-background text-foreground overflow-hidden w-full">
            Hello
          </div>
        </div>
      </div>
    </>
  );
}
