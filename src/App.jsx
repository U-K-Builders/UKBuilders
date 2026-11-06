import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import usePageMeta from './hooks/usePageMeta';
import { PAGE_META, NOT_FOUND_META } from './data/pageMeta';
import ScrollToTopButton from './components/ScrollToTopButton';
import MobileActionBar from './components/MobileActionBar';
import HomePage from './pages/HomePage';
import OngoingProjectsPage from './pages/OngoingProjectsPage';
import CompletedProjectsPage from './pages/CompletedProjectsPage';
import HistoryPage from './pages/HistoryPage';
import ContactPage from './pages/ContactPage';
import TimelinePage from './pages/TimelinePage';
import NotFoundPage from './pages/NotFoundPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import UpcomingProjectsPage from './pages/UpcomingProjectsPage';
import OurStoryPage from './pages/OurStoryPage';
import VirtualCallPage from './pages/VirtualCallPage';
import GalleryPage from './pages/GalleryPage';
import ResourcesPage from './pages/ResourcesPage';
import InvestorsPage from './pages/InvestorsPage';
import RedevelopmentPage from './pages/RedevelopmentPage';
import ContractorsPage from './pages/ContractorsPage';
import CareersPage from './pages/CareersPage';
import PageTransition from './components/PageTransition';

function RouteMeta() {
  const { pathname } = useLocation();
  const path = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
  // Project detail pages set their own title.
  const ownsMeta = path.startsWith('/projects/') && !PAGE_META[path];
  usePageMeta(ownsMeta ? null : PAGE_META[path] || NOT_FOUND_META, ownsMeta);
  return null;
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Wait a frame so the target section has rendered, then jump to it
      const id = decodeURIComponent(hash.slice(1));
      const t = setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }), 60);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-gold focus:text-navy focus:px-4 focus:py-3 focus:font-semibold">
        Skip to content
      </a>
      <ScrollToTop />
      <RouteMeta />
      <PageTransition />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/ongoing" element={<OngoingProjectsPage />} />
        <Route path="/projects/upcoming" element={<UpcomingProjectsPage />} />
        <Route path="/projects/completed" element={<CompletedProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/our-story" element={<OurStoryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/book-a-call" element={<VirtualCallPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/investors" element={<InvestorsPage />} />
        <Route path="/redevelopment" element={<RedevelopmentPage />} />
        <Route path="/contractors" element={<ContractorsPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </main>
      <Footer />
      <ScrollToTopButton />
      <MobileActionBar />
    </>
  );
}
