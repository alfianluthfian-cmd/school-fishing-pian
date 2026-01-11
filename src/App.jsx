import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

// Wave Background Component
const WaveBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1e5f8e" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,400 Q300,350 600,380 T1200,400 L1200,800 L0,800 Z"
          fill="url(#waveGradient)"
          initial={{ d: "M0,400 Q300,350 600,380 T1200,400 L1200,800 L0,800 Z" }}
          animate={{
            d: [
              "M0,400 Q300,350 600,380 T1200,400 L1200,800 L0,800 Z",
              "M0,420 Q300,370 600,400 T1200,420 L1200,800 L0,800 Z",
              "M0,380 Q300,330 600,360 T1200,380 L1200,800 L0,800 Z",
              "M0,400 Q300,350 600,380 T1200,400 L1200,800 L0,800 Z",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M0,450 Q400,400 800,430 T1200,450 L1200,800 L0,800 Z"
          fill="url(#waveGradient)"
          initial={{ d: "M0,450 Q400,400 800,430 T1200,450 L1200,800 L0,800 Z" }}
          animate={{
            d: [
              "M0,450 Q400,400 800,430 T1200,450 L1200,800 L0,800 Z",
              "M0,430 Q400,380 800,410 T1200,430 L1200,800 L0,800 Z",
              "M0,470 Q400,420 800,450 T1200,470 L1200,800 L0,800 Z",
              "M0,450 Q400,400 800,430 T1200,450 L1200,800 L0,800 Z",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          style={{ opacity: 0.6 }}
        />
      </svg>
    </div>
  )
}

// Magnetic Button Component
const MagneticButton = ({ children, className = '', onClick }) => {
  const buttonRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    setPosition({ x: x * 0.3, y: y * 0.3 })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.button
      ref={buttonRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}

// Course Card Component
const CourseCard = ({ title, description, icon, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="glass-card p-6 hover:bg-white/10 transition-all duration-300 group"
    >
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-teal-light">{title}</h3>
      <p className="text-white/80 leading-relaxed">{description}</p>
    </motion.div>
  )
}

function App() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleDaftarClick = () => {
    // In a real app, this would open a registration form or navigate to registration page
    alert('Terima kasih! Form pendaftaran akan segera dibuka.')
  }

  return (
    <div className="min-h-screen relative">
      <WaveBackground />
      
      {/* Navigation */}
      <nav className="relative z-10 glass-strong px-6 py-4 fixed w-full top-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-teal-light"
          >
            🎣 Sekolah Memancing Pian
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex gap-6"
          >
            <button onClick={() => scrollToSection('hero')} className="hover:text-teal-light transition-colors">
              Beranda
            </button>
            <button onClick={() => scrollToSection('about')} className="hover:text-teal-light transition-colors">
              Tentang
            </button>
            <button onClick={() => scrollToSection('courses')} className="hover:text-teal-light transition-colors">
              Paket Kursus
            </button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-teal-light transition-colors">
              Kontak
            </button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-strong p-8 md:p-12 rounded-3xl shadow-2xl max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-light via-teal to-water bg-clip-text text-transparent"
            >
              Sekolah Memancing Pian Bekasi
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
            >
              Pusat Pelatihan Memancing Terbaik di Bekasi
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-white/80 mb-10 max-w-2xl mx-auto"
            >
              Menggabungkan teknik tradisional dan modern untuk menciptakan pengalaman memancing yang tak terlupakan
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <MagneticButton
                onClick={handleDaftarClick}
                className="px-8 py-4 bg-gradient-to-r from-teal to-teal-light text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                🎣 Daftar Sekarang
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card p-8 md:p-12 rounded-3xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-teal-light">
              Tentang Sekolah Memancing Pian
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-white/90 leading-relaxed mb-4">
                  <span className="font-bold text-teal-light">Sekolah Memancing Pian</span> adalah pusat pelatihan memancing terdepan di Bekasi yang didedikasikan untuk menghadirkan pengalaman belajar memancing yang komprehensif dan menyenangkan.
                </p>
                <p className="text-lg text-white/90 leading-relaxed mb-4">
                  Kami menggabungkan <span className="font-semibold text-teal-light">teknik tradisional</span> yang telah teruji selama berabad-abad dengan <span className="font-semibold text-teal-light">inovasi modern</span> dalam dunia memancing. Dengan instruktur berpengalaman dan metode pembelajaran yang telah terbukti efektif, kami membantu setiap peserta menguasai seni memancing dengan baik.
                </p>
                <p className="text-lg text-white/90 leading-relaxed">
                  Tidak hanya mengajarkan teknik memancing, kami juga mengajarkan <span className="font-semibold text-teal-light">nilai-nilai konservasi</span> dan penghormatan terhadap alam, sehingga setiap pemancing dapat menikmati hobi mereka dengan bertanggung jawab.
                </p>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-2xl font-bold mb-4 text-teal-light">Keunggulan Kami</h3>
                <ul className="space-y-3">
                  {[
                    'Instruktur berpengalaman dan bersertifikat',
                    'Metode pembelajaran praktis dan terstruktur',
                    'Fasilitas modern dan peralatan lengkap',
                    'Spot memancing eksklusif di Bekasi',
                    'Kombinasi teknik tradisional dan modern',
                    'Komunitas pemancing yang aktif'
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-3 text-white/90"
                    >
                      <span className="text-teal-light text-xl">✓</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center text-teal-light"
          >
            Paket Kursus Kami
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CourseCard
              icon="🎯"
              title="Teknik Casting"
              description="Pelajari teknik casting yang tepat dan akurat. Dari basic hingga advanced casting techniques yang akan meningkatkan akurasi dan jarak lemparan Anda."
              delay={0.1}
            />
            <CourseCard
              icon="🌊"
              title="Memancing Air Tawar"
              description="Kuasai seni memancing di perairan tawar. Pelajari teknik jitu untuk berbagai jenis ikan air tawar dengan metode yang efektif dan ramah lingkungan."
              delay={0.2}
            />
            <CourseCard
              icon="🗺️"
              title="Spot Rahasia Bekasi"
              description="Akses eksklusif ke spot-spot memancing rahasia di Bekasi yang hanya diketahui oleh komunitas pemancing berpengalaman. Temukan lokasi terbaik untuk menangkap ikan besar."
              delay={0.3}
            />
            <CourseCard
              icon="🎣"
              title="Pemilihan Umpan"
              description="Pelajari seni memilih dan menyiapkan umpan yang tepat untuk berbagai jenis ikan. Teknik tradisional dan modern dalam membuat umpan yang menarik."
              delay={0.4}
            />
            <CourseCard
              icon="⚡"
              title="Teknik Strike & Fight"
              description="Kuasai teknik strike yang tepat saat ikan menggigit dan cara mengatur pertarungan (fight) untuk menangkap ikan besar dengan sukses."
              delay={0.5}
            />
            <CourseCard
              icon="🔧"
              title="Maintenance Peralatan"
              description="Pelajari cara merawat dan memelihara peralatan memancing Anda agar selalu dalam kondisi optimal dan tahan lama."
              delay={0.6}
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-12 text-center"
          >
            <MagneticButton
              onClick={handleDaftarClick}
              className="px-8 py-4 bg-gradient-to-r from-teal to-teal-light text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              🎣 Daftar Sekarang
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section id="contact" className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-strong p-10 md:p-16 rounded-3xl text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-teal-light">
              Siap Memulai Perjalanan Memancing Anda?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Bergabunglah dengan komunitas pemancing terbaik di Bekasi dan kembangkan keterampilan memancing Anda bersama para ahli.
            </p>
            <MagneticButton
              onClick={handleDaftarClick}
              className="px-10 py-5 bg-gradient-to-r from-teal to-teal-light text-white font-bold rounded-full text-xl shadow-lg hover:shadow-2xl transition-shadow"
            >
              🎣 Daftar Sekarang - Gratis Konsultasi!
            </MagneticButton>
            <p className="mt-6 text-white/70 text-sm">
              Hubungi kami untuk informasi lebih lanjut: <span className="text-teal-light font-semibold">info@sekolahmemancingpian.com</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-white/70">
          <p>© 2024 Sekolah Memancing Pian Bekasi. Semua hak dilindungi.</p>
          <p className="mt-2 text-sm">Menggabungkan Tradisi dan Inovasi dalam Dunia Memancing</p>
        </div>
      </footer>
    </div>
  )
}

export default App
