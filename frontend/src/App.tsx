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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
