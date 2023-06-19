import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useState } from "react";

type ProblemPageProps = {
  link: ReactNode;
  nextRoute: (counter: number) => string;
};

export const ProblemPage: FC<ProblemPageProps> = ({ link, nextRoute }) => {
  const [routeChanges, setRouteChanges] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handler = () => {
      console.log("routeChangeComplete");
      setRouteChanges((prev) => prev + 1);
    };
    router.events.on("routeChangeComplete", handler);

    return () => router.events.off("routeChangeComplete", handler);
  }, [router.events]);

  return (
    <div
      style={{
        display: "flex",
        rowGap: "12px",
        flexDirection: "column",
        margin: "12px",
      }}
    >
      <div>Counter: {routeChanges}</div>
      <h4>Single shallow changes: these will work initially</h4>
      <div style={{ display: "flex", gap: "12px" }}>
        <button
          type="button"
          onClick={() => {
            router.push(nextRoute(routeChanges), undefined, { shallow: true });
          }}
        >
          Single Shallow Push
        </button>
        <button
          type="button"
          onClick={() => {
            router.replace(nextRoute(routeChanges), undefined, {
              shallow: true,
            });
          }}
        >
          Single Shallow Replace
        </button>
      </div>
      
      <div>
      <h4>Double shallow changes: clicking on these will break any shallow routing</h4>
      <p>"double shallow" simulates the case where a route operation starts before the previous route has finished. After you push a double shallow route button, even the single shallow route changes are broken.</p>
      </div>
      <div style={{ display: "flex", gap: "12px" }}>
        <button
          type="button"
          onClick={() => {
            router.push(nextRoute(routeChanges), undefined, { shallow: true });
            router.push(nextRoute(routeChanges), undefined, { shallow: true });
          }}
        >
          Double Shallow Push
        </button>
        <button
          type="button"
          onClick={() => {
            router.replace(nextRoute(routeChanges), undefined, {
              shallow: true,
            });
            router.replace(nextRoute(routeChanges), undefined, {
              shallow: true,
            });
          }}
        >
          Double Shallow Replace
        </button>
      </div>
      <h4>Non-shallow changes: clicking on these will fix the single-shallow routing (at least on the non-dynamic route)</h4>
      <div style={{ display: "flex", gap: "12px" }}>
        <button
          type="button"
          onClick={() => router.push(nextRoute(routeChanges))}
        >
          Push
        </button>
        <button
          type="button"
          onClick={() => router.replace(nextRoute(routeChanges))}
        >
          Replace
        </button>
      </div>
      <div>
      <h4>The same problem exists in both dynamic and non-dynamic page routes</h4>
      <p>There is one difference: On dynamic page routes, in production, the non-shallow route doesn't seem to fix the shallow routing. But on local dev it does.</p>
      <div>{link}</div>
      </div>
    </div>
  );
};
