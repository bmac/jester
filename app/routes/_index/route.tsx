import type { ActionFunction, MetaFunction } from "@remix-run/node";
// import styles from "./route.module.css";
import { Form, json, redirect, useActionData } from "@remix-run/react";
import { parseUsername } from "./parseUsername";

export const meta: MetaFunction = () => {
  return [
    { title: "Jester" },
    {
      name: "description",
      content: `Top starred gists from github.`,
    },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const result = await parseUsername(await request.formData());
  if (result.success) {
    return redirect(`/${result.data.username}`);
  }
  return json(result.error.flatten().fieldErrors, 400);
};

export default function Index() {
  const errors = useActionData<typeof action>();
  return (
    <>
      <p>{errors?.username[0]}</p>
      <Form method="POST" target=".">
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="search" />
      </Form>
    </>
  );
}
