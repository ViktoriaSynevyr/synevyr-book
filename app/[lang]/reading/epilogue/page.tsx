"use client";

import { useParams } from "next/navigation";
import EpiloguePage from "../../../translations/epilogue";

export default function Epilogue() {
  const params = useParams<{ lang: string }>();

  return <EpiloguePage />;
}