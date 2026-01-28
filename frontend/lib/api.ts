import { Product, Sale, SalesResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) {
    console.error("Fetch error:", await res.text());
    throw new Error("Failed to fetch products");
  }
  return res.json();
}

export async function createProduct(
  data: Omit<Product, "id" | "status" | "updatedAt">,
): Promise<Product> {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    console.error("Create product error:", await res.text());
    throw new Error("Failed to create product");
  }
  return res.json();
}

export async function updateProduct(
  id: number,
  data: Partial<Product>,
): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    console.error("Update product error:", await res.text());
    throw new Error("Failed to update product");
  }
  return res.json();
}

export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    console.error("Delete product error:", await res.text());
    throw new Error("Failed to delete product");
  }
}

export async function fetchProductByCode(
  code: string,
): Promise<Product | null> {
  const res = await fetch(`${API_URL}/products/${code}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function recordSale(
  productId: number,
  quantity: number,
): Promise<SalesResponse> {
  const res = await fetch(`${API_URL}/sales`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product_id: productId, quantity }),
  });
  if (!res.ok) throw new Error("Failed to record sale");
  return res.json();
}

export async function fetchSales(): Promise<Sale[]> {
  const res = await fetch(`${API_URL}/sales`);
  if (!res.ok) throw new Error("Failed to fetch sales");
  return res.json();
}
