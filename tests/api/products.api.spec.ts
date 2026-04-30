import{test, expect} from '@playwright/test'

test('API_004 Pobieranie listy produktów', async({request})=>{
const response = await request.get("/api/productsList");
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.responseCode).toBe(200);
  expect(body.products.length).toBeGreaterThan(0);
})

test('API_005 Produkt ma wszystkie wymagane pola', async({request})=>{
const response = await request.get("/api/productsList")
const body = await response.json();
const firstProduct= await body.products[0]

  expect(response.status()).toBe(200)
  expect(firstProduct).toHaveProperty("id");
  expect(firstProduct).toHaveProperty("name");
  expect(firstProduct).toHaveProperty("price");
  expect(firstProduct).toHaveProperty("brand");
  expect(firstProduct).toHaveProperty("category");
})

test("API_006 Pobranie listy marek", async ({ request }) => {
  const response = await request.get("/api/brandsList");
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.responseCode).toBe(200);
  expect(body.brands.length).toBeGreaterThan(0);
});

test("API_007 Wyszukiwanie produktu po nazwie", async ({ request }) => {
  const response = await request.post("/api/searchProduct", {
    form: {
      search_product: "top",
    },
  });
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.responseCode).toBe(200);
  expect(body.products.length).toBeGreaterThan(0);
});

test("API_008 Wyszukiwanie produktu bez parametru", async ({ request }) => {
  const response = await request.post("/api/searchProduct");
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.responseCode).toBe(400);
  expect(body.message).toBe("Bad request, search_product parameter is missing in POST request.");
});