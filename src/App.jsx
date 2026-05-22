import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
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
import OwnerPortalPage from './pages/OwnerPortalPage';
import InvestorsPage from './pages/InvestorsPage';
import RedevelopmentPage from './pages/RedevelopmentPage';
import ContractorsPage from './pages/ContractorsPage';
import CareersPage from './pages/CareersPage';
import PageTransition from './components/PageTransition';


function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
<div className="noise-overlay" aria-hidden="true" />
      <ScrollToTop />
      <PageTransition />
      <Header />
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
        <Route path="/owner-portal" element={<OwnerPortalPage />} />
        <Route path="/investors" element={<InvestorsPage />} />
        <Route path="/redevelopment" element={<RedevelopmentPage />} />
        <Route path="/contractors" element={<ContractorsPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
