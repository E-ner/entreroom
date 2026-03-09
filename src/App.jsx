import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    document.title = "Hellow";
  });
  return <>Hello world</>;
}
