import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "../pages/LoginPage";
import { z } from "zod";

const loginSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/login")({
  validateSearch: (search) => loginSearchSchema.parse(search),
  component: LoginComponent,
});

function LoginComponent() {
  return <LoginPage />;
}
