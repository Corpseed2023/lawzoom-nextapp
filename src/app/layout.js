import localFont from "next/font/local";
import "./globals.css";
import { ConfigProvider } from "antd";
import Providers from "./Providers";



export const metadata = {
  title: "Law zoom",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <ConfigProvider
          theme={{
            token:{
              borderRadius:6,
              fontSize:13
            },
            components: {
              Input: {
                borderRadius: 5,
                borderRadiusLG: 5,
              },
              Button: {
                borderRadius: 4,
                borderRadiusLG: 4,
                borderRadiusSM:4
              },
              Menu: {
                itemHeight: 32,
              },
              Table:{
                cellPaddingBlock:12,
                selectionColumnWidth:24,
                cellPaddingInline:12,
                padding:12
              }
            },
          }}
        >
          <Providers>{children}</Providers>
        </ConfigProvider>
      </body>
    </html>
  );
}
