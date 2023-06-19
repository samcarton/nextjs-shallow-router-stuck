import { ProblemPage } from "../components/ProblemPage";
import Link from "next/link";

export default function Home() {
  return (
    <ProblemPage
      nextRoute={() => `/`}
      link={<Link href="/xxx">To dynamic route</Link>}
    />
  );
}