import { ProblemPage } from "../components/ProblemPage";
import Link from "next/link";

export default function Home() {
  return (
    <ProblemPage
      nextRoute={() => `/xxx`}
      link={<Link href="/">To non-dynamic route</Link>}
    />
  );
}