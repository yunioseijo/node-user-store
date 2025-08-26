const categories = [
  "T-shirt",
  "Jeans",
  "Shoes",
  "Hats",
  "Jackets",
  "Socks",
  "Shorts",
  "Sweaters",
  "Dresses",
  "Skirts",
  "Bags",
  "Belts",
  "Sunglasses",
  "Watches",
  "Gloves",
  "Scarves",
  "Coats",
  "Boots",
  "Sandals",
  "Pants",
];

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YWI2N2VlMGRkNjU2NjRiYTU5YTIxOSIsImlhdCI6MTc1NjE5NDUyMiwiZXhwIjoxNzU2MjAxNzIyfQ.pBoWzuTxLYv6H94XTbB2mZw-O6O5FEkoy00wFHOf71k"; // Reemplaza esto con tu token JWT válido

async function createCategory(name) {
  try {
    const res = await fetch("http://localhost:3000/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      body: new URLSearchParams({ name, available: "true" }),
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }
    const data = await res.json();
    console.log(`Creada: ${name}`, data);
  } catch (err) {
    console.error(`Error creando ${name}:`, err.message);
  }
}

async function main() {
  for (const name of categories) {
    await createCategory(name);
  }
}

main();
