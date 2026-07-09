import { Route, Routes } from "react-router-dom";
import { SiteLayout } from "./components/SiteLayout";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { DonatePage } from "./pages/DonatePage";
import { EventsPage } from "./pages/EventsPage";
import { GetInvolvedPage } from "./pages/GetInvolvedPage";
import { GovernancePage } from "./pages/GovernancePage";
import { HomePage } from "./pages/HomePage";
import { InternshipPage } from "./pages/InternshipPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PlatformsPage } from "./pages/PlatformsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="platforms" element={<PlatformsPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="get-involved" element={<GetInvolvedPage />} />
        <Route path="internship" element={<InternshipPage />} />
        <Route path="governance" element={<GovernancePage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="donate" element={<DonatePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
