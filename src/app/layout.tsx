import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VivaFoot | Master your core through your sole",
  description: "Dual-direction thermal control, engineered into a wearable platform.",
  icons: { icon: "/vivafoot-logo.png.jpg" },
  openGraph: { title: "VivaFoot | Master your core through your sole", description: "Dual-direction thermal control, engineered into a wearable platform.", type: "website" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
