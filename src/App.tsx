import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { StudentPortalPage } from './pages/StudentPortalPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Layout: React.FC<{ children: React.ReactNode; simplified?: boolean }> = ({
  children,
  simplified = false,
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar simplified={simplified} />
      {children}
      <Footer simplified={simplified} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/index.html"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />

        {/* About Us */}
        <Route
          path="/about"
          element={
            <Layout>
              <AboutPage />
            </Layout>
          }
        />
        <Route
          path="/about.html"
          element={
            <Layout>
              <AboutPage />
            </Layout>
          }
        />

        {/* Student Portal (CRUD & Public API via Axios) */}
        <Route
          path="/student-portal"
          element={
            <Layout>
              <StudentPortalPage />
            </Layout>
          }
        />
        <Route
          path="/student-portal.html"
          element={
            <Layout>
              <StudentPortalPage />
            </Layout>
          }
        />

        {/* Contact */}
        <Route
          path="/contact"
          element={
            <Layout>
              <ContactPage />
            </Layout>
          }
        />
        <Route
          path="/contact.html"
          element={
            <Layout>
              <ContactPage />
            </Layout>
          }
        />

        {/* Sign In */}
        <Route
          path="/signin"
          element={
            <Layout simplified>
              <SignInPage />
            </Layout>
          }
        />
        <Route
          path="/signin.html"
          element={
            <Layout simplified>
              <SignInPage />
            </Layout>
          }
        />

        {/* Sign Up */}
        <Route
          path="/signup"
          element={
            <Layout simplified>
              <SignUpPage />
            </Layout>
          }
        />
        <Route
          path="/signup.html"
          element={
            <Layout simplified>
              <SignUpPage />
            </Layout>
          }
        />

        {/* Fallback */}
        <Route
          path="*"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
