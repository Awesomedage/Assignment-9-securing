export function getAllUserArticles() {
  return JSON.parse(
    localStorage.getItem("savedArticlesByUser") || "{}"
  );
}

// Get articles for a specific user
export function getUserArticles(username) {
  const allArticles = getAllUserArticles();
  return allArticles[username] || [];
}

// Check if current user is admin
export function getArticlesForUser(currentUser) {
  const allArticles = getAllUserArticles();

  if (currentUser?.role === "admin") {
    return allArticles; // Admin sees everything
  }

  return allArticles[currentUser?.username] || [];
}

// Admin stats page
export function getUserArticleStats() {
  const allArticles = getAllUserArticles();

  return Object.entries(allArticles).map(([username, articles]) => ({
    username,
    articleCount: articles.length,
    articles,
  }));
}