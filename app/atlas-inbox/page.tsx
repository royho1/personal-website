import type { Metadata } from "next";
import AtlasInboxClient from "./AtlasInboxClient";

export const metadata: Metadata = {
  title: "Atlas inbox",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AtlasInboxPage() {
  return <AtlasInboxClient />;
}
