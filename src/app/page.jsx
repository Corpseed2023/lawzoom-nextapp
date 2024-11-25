"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "antd";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-full flex justify-between mt-10 pl-4 pr-4">
      <div>Lawzoom app</div>
      <Button shape="round" onClick={() => router.push("/login")}>
        Login
      </Button>
    </div>
  );
}
