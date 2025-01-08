import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";
import { userRouter } from "./controllers/user-controller";
import { authRouter } from "./controllers/auth-controller";

const app = new Hono();
const homepath =
    process.env.HOME ?? process.env.HOMEPATH ?? process.env.USERPROFILE ?? "";
app.use(serveStatic({ root: `${homepath}/hono-licious`, path: "/public" }));
app.use(logger());
app.get("/", (c) => {
    return c.text("Hello Hono!");
});
app.route("/api/users/", userRouter);
app.route("/auth/", authRouter);
app.onError(async (err, c) => {
    if (err instanceof HTTPException) {
        c.status(err.status);
        return c.json({
            errors: err.message,
        });
    } else if (err instanceof ZodError) {
        c.status(400);
        return c.json({
            errors: err.message,
        });
    } else {
        c.status(500);
        return c.json({
            errors: err.message,
        });
    }
});
export default app;
