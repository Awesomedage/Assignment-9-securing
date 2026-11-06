import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ArticlesContext = createContext();

export function ArticlesProvider({ children }) {
  const [savedArticles, setSavedArticles] = useState([]);
  const { user } = useAuth();

  // Load only the current user's saved articles
  useEffect(() => {
    if (!user) {
      setSavedArticles([]);
      return;
    }

    const allSavedArticles =
      JSON.parse(localStorage.getItem('savedArticlesByUser')) || {};

    const userArticles = allSavedArticles[user.username] || [];
    setSavedArticles(userArticles);
  }, [user]);

  const saveArticle = (article) => {
    if (!user) return;

    const allSavedArticles =
      JSON.parse(localStorage.getItem('savedArticlesByUser')) || {};

    const userArticles = allSavedArticles[user.username] || [];

    if (userArticles.find(a => a.url === article.url)) {
      return;
    }

    const updatedArticles = [...userArticles, article];

    allSavedArticles[user.username] = updatedArticles;

    localStorage.setItem(
      'savedArticlesByUser',
      JSON.stringify(allSavedArticles)
    );

    setSavedArticles(updatedArticles);
  };

  const removeArticle = (url) => {
    if (!user) return;

    const allSavedArticles =
      JSON.parse(localStorage.getItem('savedArticlesByUser')) || {};

    const userArticles = allSavedArticles[user.username] || [];

    const updatedArticles = userArticles.filter(
      article => article.url !== url
    );

    allSavedArticles[user.username] = updatedArticles;

    localStorage.setItem(
      'savedArticlesByUser',
      JSON.stringify(allSavedArticles)
    );

    setSavedArticles(updatedArticles);
  };

  const isArticleSaved = (url) => {
    return savedArticles.some(article => article.url === url);
  };

  const getUserSavedArticles = () => {
    return savedArticles;
  };

  const getAllUserSavedArticles = () => {
    return JSON.parse(localStorage.getItem('savedArticlesByUser')) || {};
  }

  return (
    <ArticlesContext.Provider
      value={{
        savedArticles,
        saveArticle,
        removeArticle,
        isArticleSaved,
        getUserSavedArticles,
        getAllUserSavedArticles
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
}

export const useArticles = () => {
  const context = useContext(ArticlesContext);

  if (!context) {
    throw new Error('useArticles must be used within ArticlesProvider');
  }

  return context;
};