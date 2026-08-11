import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FerrumEngine Cloud — Team Workspace",
  description: "Collaborate with your team on FerrumEngine projects. Manage design tokens, share component libraries, and coordinate your UI platform workspace in the cloud.",
  openGraph: {
    title: "FerrumEngine Cloud — Team Workspace",
    description: "Collaborate with your team on FerrumEngine projects. Manage design tokens, share component libraries, and coordinate your UI platform workspace in the cloud.",
  },
};

export default function CloudLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
