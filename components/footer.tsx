import { siteConfig } from "@/content/site"

// Champagne Gold + Beige + Soft Brown
// creates a luxury, elegant, and warm aesthetic
const palette = {
  deep: "#746D5B",            // deep brown
  softBrown: "#8B6F5A",       // soft brown
  background: "#E8DCCB",      // beige background
  champagneGold: "#D6BFA3",   // champagne
  champagneLight: "#F2E4D3",  // light champagne / paper
} as const

export function Footer() {
  return (
    <footer
      className="mt-20 border-t relative overflow-hidden"
      style={{
        backgroundColor: palette.background,
        borderColor: `${palette.champagneGold}60`,
      }}
    >
      {/* Subtle champagne gradient + glow, echoing details/gallery */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            background: `linear-gradient(165deg, ${palette.champagneLight} 0%, ${palette.champagneGold}24 35%, ${palette.softBrown}10 70%, ${palette.deep}08 100%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${palette.champagneGold} 0%, transparent 55%)`,
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3
              className="font-serif font-bold text-lg mb-2 tracking-[0.12em] uppercase"
              style={{ color: palette.deep }}
            >
              {siteConfig.couple.bride} & {siteConfig.couple.groom}
            </h3>
            <p className="text-sm" style={{ color: palette.softBrown }}>
              {siteConfig.wedding.date}
            </p>
          </div>
          <div>
            <h4
              className="font-semibold mb-2 tracking-[0.16em] uppercase text-xs"
              style={{ color: palette.deep }}
            >
              Ceremony
            </h4>
            <p className="text-sm" style={{ color: palette.softBrown }}>
              {siteConfig.ceremony.location}
            </p>
          </div>
          <div>
            <h4
              className="font-semibold mb-2 tracking-[0.16em] uppercase text-xs"
              style={{ color: palette.deep }}
            >
              Reception
            </h4>
            <p className="text-sm" style={{ color: palette.softBrown }}>
              {siteConfig.reception.location}
            </p>
          </div>
        </div>
        <div
          className="mt-8 pt-8 text-center text-sm border-t"
          style={{
            borderColor: `${palette.champagneGold}60`,
            color: palette.softBrown,
          }}
        >
          <p>With love and gratitude • {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}
