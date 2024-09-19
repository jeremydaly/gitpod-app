import { Hono } from "hono";
import { data } from '@ampt/data'
import { ulid } from "ulid";

const app = new Hono();

app.get("/users", async (c) => {
  const users = await data.get('user:*')
  return c.json(users.items.map(x => x.value));
});

app.post("/submit", async (c) => {
  const formData = await c.req.parseBody();
  const newUser = await data.set(`user:${ulid()}`, formData)

  return c.json({
    newUser,
    message: "You just add a user",
  });
});



app.fire();
