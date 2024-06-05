import type { ActionFunction, MetaFunction } from "@remix-run/node";
import styles from "./route.module.css";
import { Form, redirect } from "@remix-run/react";
import { parseUsername } from "./parseUsername";

export const meta: MetaFunction = ({ params }) => {
  return [
    { title: "Jester" },
    {
      name: "description",
      content: `Top starred gists for ${params.username}!`,
    },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const { username } = await parseUsername(await request.formData());
  return redirect(`/${username}`);
};

export default function Index() {
  return (
    <Form method="POST" target=".">
      <label htmlFor="username">Username</label>
      <input id="username" name="username" type="search" />
    </Form>
  );
}
