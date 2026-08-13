"use client";

import { useParams } from "next/navigation";
import Chapter21Page from "../../../../translations/chapter21";

export default function Page() {
  const params = useParams<{ lang: string }>();

  return <Chapter21Page />;
}