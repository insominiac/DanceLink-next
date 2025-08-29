import Layout from './components/Layout';
import Hero from './components/Hero';
import DanceStyles from './components/DanceStyles';
import PartnerSearch from './components/PartnerSearch';
import Events from './components/Events';
import Instructors from './components/Instructors';
import Register from './components/Register';
import About from './components/About';
import Classes from './components/Classes';
import Contact from './components/Contact';

export default function Home() {
  return (
    <Layout>
      <Hero />
      
      {/* Dance Styles Section */}
      <DanceStyles />
      
      {/* Partner Search Section */}
      <PartnerSearch />
      
      {/* Events Section */}
      <Events />
      
      {/* Instructors Section */}
      <Instructors />
      
      {/* Register Section */}
      <Register />
      
      {/* About Section */}
      <About />
      
      {/* Classes Section */}
      <Classes />
      
      {/* Contact Section */}
      <Contact />
    </Layout>
  );
}
