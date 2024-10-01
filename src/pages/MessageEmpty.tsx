import Navbar from "@/components/Nav-Bar";
import DisplayContact from "./contactPage/DisplayContact";

export default function MessageEmpty() {
  return (
    <>
      <div className="w-screen h-screen overflow-hidden">
        <Navbar />
        <div className="flex h-full">
          <DisplayContact />
          <div className="flex h-full bg-background text-foreground overflow-hidden w-full">
            <div
              className="flex flex-col w-full h-full pt-24 justify-center items-center"
              style={{ marginLeft: "240px" }}
            >
              <p>
                Hello
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
