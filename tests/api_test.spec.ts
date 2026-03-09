import { test, expect } from "@playwright/test";

test("API GET Request", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users/2", {
    headers: {
      "x-api-key": process.env.API_KEY ?? "",
    },
  });
  expect(response.status()).toBe(200);
  const text = await response.text();
  expect(text).toContain("Janet");
});

test("API POST Request", async ({ request }) => {
  const response = await request.post("https://reqres.in/api/users", {
    headers: {
      "x-api-key": process.env.API_KEY ?? "",
    },
    data: {
      name: "John Doe",
      job: "Software Engineer",
    },
  });
  expect(response.status()).toBe(201);
  const text = await response.text();
  expect(text).toContain("John Doe");
});

test("API PUT Request", async ({ request }) => {
  const response = await request.put("https://reqres.in/api/users/2", {
    headers: { "x-api-key": process.env.API_KEY ?? "" },
      data: { name: "Susan", job: "Product Manager" },
  });
    expect(response.status()).toBe(200);
    const text = await response.text();
    expect(text).toContain("Susan");
});

test("API DELETE Request", async ({ request }) => {
  const response = await request.delete("https://reqres.in/api/users/2", {
    headers: { "x-api-key": process.env.API_KEY ?? "" },
  });
  expect(response.status()).toBe(204);
});

test("API PATCH Request", async ({ request }) => {
  const response = await request.patch("https://reqres.in/api/users/2", {
    headers: { "x-api-key": process.env.API_KEY ?? "" },
    data: { job: "QA Engineer" },
  });
  expect(response.status()).toBe(200);
  const text = await response.text();
  expect(text).toContain("QA Engineer");
});
