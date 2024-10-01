import Navbar from "@/components/Nav-Bar";
import { useEffect } from "react";

export default function HomePage() {

  useEffect(()=>{
  //   localStorage.clear();  
  })

  return (
    <>
      <Navbar />
      <h1>Home Page</h1>
    </>
  );
}
