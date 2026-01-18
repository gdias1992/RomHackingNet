import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  DashboardPage,
  GamesPage,
  GameDetailPage,
  HacksPage,
  HackDetailPage,
  TranslationsPage,
  TranslationDetailPage,
  UtilitiesPage,
  UtilityDetailPage,
  DocumentsPage,
  DocumentDetailPage,
  HomebrewPage,
  HomebrewDetailPage,
} from "@/pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/:id" element={<GameDetailPage />} />
          <Route path="/hacks" element={<HacksPage />} />
          <Route path="/hacks/:id" element={<HackDetailPage />} />
          <Route path="/translations" element={<TranslationsPage />} />
          <Route path="/translations/:id" element={<TranslationDetailPage />} />
          <Route path="/utilities" element={<UtilitiesPage />} />
          <Route path="/utilities/:id" element={<UtilityDetailPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/documents/:id" element={<DocumentDetailPage />} />
          <Route path="/homebrew" element={<HomebrewPage />} />
          <Route path="/homebrew/:id" element={<HomebrewDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
