document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const categoryList = document.getElementById("categoryList");
  const productList = document.getElementById("productList");

  let authToken = null;

  // Function to fetch categories from Strapi
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:1337/categories", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.json();
      // Update categoryList
      categoryList.innerHTML = "";
      data.forEach((category) => {
        categoryList.innerHTML += `<div>${category.name}</div>`;
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Function to fetch products from Strapi
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:1337/products", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.json();
      // Update productList
      productList.innerHTML = "";
      data.forEach((product) => {
        productList.innerHTML += `<div>${product.name}</div>`;
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Event listener for login button
  loginBtn.addEventListener("click", async () => {
    try {
      // Perform login request
      const response = await fetch("http://localhost:1337/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: "your-username",
          password: "your-password",
        }),
      });
      const data = await response.json();
      authToken = data.jwt; // Store the JWT token
      // Once logged in, fetch categories and products
      fetchCategories();
      fetchProducts();
    } catch (error) {
      console.error("Error logging in:", error);
    }
  });
});
