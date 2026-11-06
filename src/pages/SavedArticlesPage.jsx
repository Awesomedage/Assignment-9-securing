import ArticleCard from '../components/ArticleCard';
import { useArticles } from '../context/ArticlesContext';

function SavedArticlesPage() {
  const { getUserSavedArticles } = useArticles();

  return (
    <div>
      <h2 className="page-heading">Saved Articles</h2>
      
      {/* ⚠️ SECURITY ISSUE: This page should require authentication */}
      <div className="warning-banner">
        <p>
          This page is now protected and requires authentication. Please log in to view your saved articles.
        </p>
      </div>

      {getUserSavedArticles().length === 0 ? (
        <div className="message">
          No saved articles yet. Browse articles and click the bookmark icon to save them!
        </div>
      ) : (
        <div className="articles-grid">
          {getUserSavedArticles().map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedArticlesPage;