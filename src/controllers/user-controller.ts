import { Hono } from "hono";
import { CreateRequest } from "../models/user-model.js";
import { UserService } from "../services/user-service.js";

export const router = new Hono();

router.post("/", async (c) => {
    const request: CreateRequest = await c.req.json();
    const response = await UserService.register(request);
    return c.json(response);
});

router.get("/", async (c) => {
    const response = await UserService.getAll();
    return c.json(response);
});

router.get("/:id", async (c) => {
    const id = parseInt(c.req.param("id"));
    const response = await UserService.get(id);
    return c.json(response);
});

router.patch("/:id", async (c) => {
    const id = parseInt(c.req.param("id"));
    const request: CreateRequest = await c.req.json();
    const response = await UserService.update(id, request);
    return c.json(response);
});

router.delete("/:id", async (c) => {
    const id = parseInt(c.req.param("id"));
    await UserService.delete(id);
    return c.status(204);
});

export { router as userRouter };
