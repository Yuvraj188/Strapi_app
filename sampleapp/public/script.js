document.addEventListener("DOMContentLoaded", () => {
  const categoryDiv = document.getElementById("category");

  // Function to fetch a single category from Strapi
  const fetchCategory = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/categories"); // Replace 1 with the actual category ID
      const data = await response.json();
      // Display category name
      categoryDiv.textContent = data.attributes.Name;
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  // Fetch and display the category when the page loads
  fetchCategory();
});
