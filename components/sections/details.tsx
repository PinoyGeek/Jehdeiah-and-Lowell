"use client"

import { Section } from "@/components/section"
import { useState, useEffect } from "react"
import Image from "next/image"
import { QRCodeSVG } from "qrcode.react"
import { siteConfig } from "@/content/site"
import { Cinzel, Cormorant_Garamond } from "next/font/google"
import {
  Shirt,
  Clock,
  Utensils,
  Copy,
  Check,
  Navigation,
  Heart,
  Camera,
  X,
  MapPin,
  ZoomIn,
  ZoomOut,
} from "lucide-react"


const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
})  

// Colors sourced from globals.css @theme inline — edit there to update everywhere

export function Details() {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())
  const [currentReceptionImageIndex, setCurrentReceptionImageIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState<string | null>(null)
  const [guestAttireLightboxOpen, setGuestAttireLightboxOpen] = useState(false)
  const [guestAttireZoom, setGuestAttireZoom] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [rotationOffset, setRotationOffset] = useState(0)
  
  const coupleImages = [
    "/mobile-background/couple (1).jpg",
    "/mobile-background/couple (2).jpg",
    "/mobile-background/couple (3).jpg",
    "/mobile-background/couple (4).jpg",

  ]

  const receptionImages = [
    "/Details/recepcion.png",
    "/Details/reception2.png"
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReceptionImageIndex((prev) => (prev + 1) % receptionImages.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  // Gentle reminders couple photos — subtle carousel + wobble animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % coupleImages.length)
      setRotationOffset((prev) => (prev + 10) % 360)
    }, 2600)

    return () => clearInterval(interval)
  }, [coupleImages.length])

  useEffect(() => {
    if (!guestAttireLightboxOpen) {
      setGuestAttireZoom(1)
      return
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setGuestAttireLightboxOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener("keydown", onKey)
    }
  }, [guestAttireLightboxOpen])

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems(prev => new Set(prev).add(itemId))
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev)
          newSet.delete(itemId)
          return newSet
        })
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  // Venue information from site config
  const ceremonyVenueName = siteConfig.ceremony.location
  const ceremonyVenueDetail = ""
  const ceremonyAddress = siteConfig.ceremony.venue
  const ceremonyVenue = `${ceremonyVenueName}, ${ceremonyAddress}`
  const ceremonyMapsLink = `https://maps.google.com/?q=${encodeURIComponent(ceremonyVenue)}`

  const receptionVenueName = siteConfig.reception.location
  const receptionVenueDetail = ""
  const receptionAddress = siteConfig.reception.venue
  const receptionVenue = `${receptionVenueName}, ${receptionAddress}`
  const receptionMapsLink = `https://maps.google.com/?q=${encodeURIComponent(receptionVenue)}`

  // Aliases used in the image modal
  const ceremonyLocationFormatted = ceremonyVenueName
  const receptionLocationFormatted = receptionVenueName
  const ceremonyLocation = ceremonyVenue
  const receptionLocation = receptionVenue
  const formattedCeremonyDate = siteConfig.ceremony.date
  const formattedReceptionDate = siteConfig.ceremony.date // reception follows ceremony on same day

  const openInMaps = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }


  return (
    <Section
      id="details"
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden bg-motif-cream"
    >
      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            background: 'linear-gradient(165deg, var(--color-motif-cream) 0%, color-mix(in srgb, var(--color-motif-silver) 14%, transparent) 35%, color-mix(in srgb, var(--color-motif-medium) 6%, transparent) 70%, color-mix(in srgb, var(--color-motif-deep) 3%, transparent) 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 15%, var(--color-motif-silver) 0%, transparent 55%)' }}
        />
      </div>

      {/* Flower decoration - top left corner */}
      <div className="absolute left-0 top-0 z-0 pointer-events-none">
        <img
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Flower decoration"
          width={300}
          height={300}
          className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-65 scale-y-[-1]"
        />
      </div>

      {/* Flower decoration - top right corner */}
      <div className="absolute right-0 top-0 z-0 pointer-events-none">
        <img
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Flower decoration"
          width={300}
          height={300}
          className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-65 scale-x-[-1] scale-y-[-1]"
        />
      </div>

      {/* Flower decoration - left bottom corner */}
      <div className="absolute left-0 bottom-0 z-0 pointer-events-none">
        <img
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Flower decoration"
          width={300}
          height={300}
          className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-65"
        />
      </div>

      {/* Flower decoration - right bottom corner */}
      <div className="absolute right-0 bottom-0 z-0 pointer-events-none">
        <img
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Flower decoration"
          width={300}
          height={300}
          className="w-auto h-auto max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px] opacity-65 scale-x-[-1]"
        />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6">
        <div className="flex items-center justify-center gap-2 mb-4 sm:mb-5">
          <div className="h-px w-16 sm:w-24 bg-motif-silver/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-motif-silver shadow-[0_0_18px_color-mix(in_srgb,var(--color-motif-silver)_80%,transparent)]" />
          <div className="h-px w-16 sm:w-24 bg-motif-silver/60" />
        </div>
        <h2
          className={`${cinzel.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-motif-deep mb-3 sm:mb-4 uppercase`}
          style={{
            letterSpacing: "0.16em",
            textShadow: "0 2px 10px rgba(91,102,85,0.25)",
            fontWeight: 600,
          }}
        >
          Event Details
        </h2>
        <p
          className={`${cinzel.className} text-sm sm:text-base md:text-lg text-motif-medium font-normal max-w-xl mx-auto leading-relaxed tracking-[0.14em] px-4`}
        >
          Everything you need to know about our special day.
        </p>
      </div>

      {/* Venue and Event Information */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12 md:mb-16 space-y-6 sm:space-y-10 md:space-y-14">
        
        {/* Ceremony Card */}
        <div className="relative group">
          {/* Subtle champagne glow on hover */}
          <div className="absolute -inset-1 bg-gradient-to-br from-motif-silver/22 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
          
          {/* Main card */}
          <div className="relative bg-motif-cream rounded-xl sm:rounded-2xl overflow-hidden border border-motif-deep/20  shadow-[0_16px_40px_rgba(0,0,0,0.18)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.24)] hover:border-motif-deep/80 transition-all duration-300">
            {/* Venue Image */}
            <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[30rem] overflow-hidden">
              <Image
                src="/Details/ceremony.png"
                alt={siteConfig.ceremony.location}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Venue name overlay with warm gold accent */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 right-3 sm:right-4 md:right-6">
                {/* <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-ephesis)] text-[#FFF7F6] mb-1 sm:mb-2 drop-shadow-lg">
                  Ceremony
                </p> */}
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-crimson)] font-normal text-white mb-0.5 sm:mb-1 drop-shadow-lg uppercase tracking-[0.1em] leading-tight">
                  {siteConfig.ceremony.location}
                </h3>
                <p className={`${cinzel.className} text-xs sm:text-sm md:text-base text-white/95 drop-shadow-md tracking-wide`}>
                  {siteConfig.ceremony.venue}
                </p>
              </div>
            </div>

            {/* Event Details Content */}
            <div className="p-3 sm:p-5 md:p-7 lg:p-9">
              {/* Date Section */}
              <div className="text-center mb-5 sm:mb-8 md:mb-10">
                {/* Day name */}
                <p className={`${cinzel.className} text-[10px] sm:text-xs md:text-sm font-semibold text-motif-medium uppercase tracking-[0.2em] mb-2 sm:mb-3`}>
                  {siteConfig.ceremony.day}
                </p>
                
                {/* Month - Script style with warm gold */}
                <div className="mb-2 sm:mb-4">
                  <p className={`${cinzel.className} text-xl sm:text-2xl md:text-3xl lg:text-4xl text-motif-medium leading-none`}>
                    {new Date(siteConfig.ceremony.date).toLocaleString('default', { month: 'long' })}
                  </p>
                </div>
                
                {/* Day and Year */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-7">
                  <p className={`${cinzel.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-motif-deep leading-none`}>
                    {new Date(siteConfig.ceremony.date).getDate()}
                  </p>
                  <div className="h-10 sm:h-12 md:h-16 lg:h-20 w-[2px] bg-gradient-to-b from-motif-medium via-motif-deep to-motif-medium" />
                  <p className={`${cinzel.className} text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-motif-deep leading-none`}>
                    {new Date(siteConfig.ceremony.date).getFullYear()}
                  </p>
                </div>

                {/* Decorative line */}
                {/* <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="h-[1px] w-8 sm:w-10 md:w-14 bg-gradient-to-r from-transparent via-motif-medium to-motif-medium" />
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-motif-medium rounded-full" />
                  <div className="h-[1px] w-8 sm:w-10 md:w-14 bg-gradient-to-l from-transparent via-motif-medium to-motif-medium" />
                </div> */}

                {/* Time */}
                <p className={`${cinzel.className} text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-motif-deep tracking-wide`}>
                  {siteConfig.ceremony.time}
                </p>
              </div>

              {/* Location Details */}
              <div className="bg-gradient-to-br from-motif-cream/40 to-motif-cream rounded-xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 border border-motif-deep/15">
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-motif-deep mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] font-semibold text-motif-deep mb-1.5 sm:mb-2 uppercase tracking-wide">
                      Location
                    </p>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-crimson)] text-motif-deep leading-relaxed">
                      {ceremonyVenueName}
                    </p>
                    {ceremonyVenueDetail && (
                      <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] text-motif-medium/70 leading-relaxed mt-1">
                        {ceremonyVenueDetail}
                      </p>
                    )}
                    <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] text-motif-deep/70 leading-relaxed">
                      {ceremonyAddress}
                    </p>
                  </div>
                  {/* QR Code for Ceremony - Right side */}
                  <div className="flex flex-col items-center gap-1.5 sm:gap-2 flex-shrink-0">
                    <div className="bg-motif-cream p-1.5 sm:p-2 md:p-2.5 rounded-lg border border-motif-deep/20 shadow-sm">
                      <QRCodeSVG
                        value={ceremonyMapsLink}
                        size={80}
                        level="M"
                        includeMargin={false}
                        fgColor="#051C46"
                        bgColor="#ECE5DB"
                      />
                    </div>
                    <p className="text-[9px] sm:text-[10px] md:text-xs font-[family-name:var(--font-crimson)] text-motif-deep/60 italic text-center max-w-[80px]">
                      Scan for directions
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                <button
                  onClick={() => openInMaps(ceremonyMapsLink)}
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 bg-motif-deep hover:bg-motif-accent text-motif-cream rounded-lg font-[family-name:var(--font-crimson)] font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] premium-shadow"
                  aria-label="Get directions to ceremony venue"
                >
                  <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span>Get Directions</span>
                </button>
                <button
                  onClick={() => copyToClipboard(ceremonyVenue, 'ceremony')}
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 bg-motif-soft border-2 border-motif-soft/30 hover:border-motif-soft/50 hover:bg-motif-silver/20 text-motif-cream rounded-lg font-[family-name:var(--font-crimson)] font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  aria-label="Copy ceremony venue address"
                >
                  {copiedItems.has('ceremony') ? (
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0 text-motif-cream" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  )}
                  <span>{copiedItems.has('ceremony') ? 'Copied!' : 'Copy Address'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reception Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-br from-motif-silver/22 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

          <div className="relative elegant-card bg-motif-cream rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.18)] border border-motif-deep/25 premium-shadow hover:border-motif-deep/45 transition-all duration-300">
       
            <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[30rem] overflow-hidden">
              {receptionImages.map((src, index) => (
                <div
                  key={src}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentReceptionImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={src}
                    alt={siteConfig.reception.venue}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
                    priority={index === 0}
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
              
          
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 right-3 sm:right-4 md:right-6 z-20">
                <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-ephesis)] text-[#FFF7F6] mb-1 sm:mb-2 drop-shadow-lg">
                  Reception
                </p>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-crimson)] font-normal text-white mb-0.5 sm:mb-1 drop-shadow-lg uppercase tracking-[0.1em] leading-tight">
                  {siteConfig.reception.location}
                </h3>
                <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] text-white/95 drop-shadow-md tracking-wide">
                  {siteConfig.reception.venue}
                </p>
              </div>
            </div>

            <div className="p-3 sm:p-5 md:p-7 lg:p-9">
         
              <div className="text-center mb-5 sm:mb-8">
                {siteConfig.reception.time === "To follow after the ceremony" ? (
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-crimson)]  font-semibold text-motif-deep tracking-wide">
                    To follow after the ceremony
                  </p>
                ) : (
                  <>
                    <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] font-semibold text-motif-medium uppercase tracking-[0.2em] mb-2 sm:mb-3">
                      {siteConfig.reception.time === "After ceremony" ? "Starts" : "Starts at"}
                    </p>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-crimson)] font-semibold text-motif-deep tracking-wide">
                      {siteConfig.reception.time}
                    </p>
                  </>
                )}
              </div>

        
              <div className="bg-gradient-to-br from-motif-cream/40 to-motif-cream rounded-xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 border border-motif-deep/15">
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-motif-deep mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] font-semibold text-motif-deep mb-1.5 sm:mb-2 uppercase tracking-wide">
                      Location
                    </p>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-crimson)] text-motif-deep leading-relaxed">
                      {receptionVenueName}
                    </p>
                    {receptionVenueDetail && (
                    <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] text-motif-deep/70 leading-relaxed mt-1">
                        {receptionVenueDetail}
                      </p>
                    )}
                    <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] text-motif-deep/70 leading-relaxed">
                      {receptionAddress}
                    </p>
                  </div>
              
                  <div className="flex flex-col items-center gap-1.5 sm:gap-2 flex-shrink-0">
                  <div className="bg-motif-cream p-1.5 sm:p-2 md:p-2.5 rounded-lg border border-motif-deep/20 shadow-sm">
                      <QRCodeSVG
                        value={receptionMapsLink}
                        size={80}
                        level="M"
                        includeMargin={false}
                        fgColor="#051C46"
                        bgColor="#ECE5DB"
                      />
                    </div>
                    <p className="text-[9px] sm:text-[10px] md:text-xs font-[family-name:var(--font-crimson)] text-motif-deep/60 italic text-center max-w-[80px]">
                      Scan for directions
                    </p>
                  </div>
                </div>
              </div>

     
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                <button
                  onClick={() => openInMaps(receptionMapsLink)}
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 bg-motif-deep hover:bg-motif-accent text-motif-cream rounded-lg font-[family-name:var(--font-crimson)] font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] premium-shadow"
                  aria-label="Get directions to reception venue"
                >
                  <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span>Get Directions</span>
                </button>
                <button
                  onClick={() => copyToClipboard(receptionVenue, 'reception')}
                  className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 bg-motif-soft border-2 border-motif-soft/30 hover:border-motif-soft/50 hover:bg-motif-silver/20 text-motif-cream rounded-lg font-[family-name:var(--font-crimson)] font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  aria-label="Copy reception venue address"
                >
                  {copiedItems.has('reception') ? (
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0 text-motif-cream" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  )}
                  <span>{copiedItems.has('reception') ? 'Copied!' : 'Copy Address'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guest attire — visual + copy */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
            <div className="h-px w-10 sm:w-14 md:w-20 bg-motif-silver/60" />
            <Shirt className="w-5 h-5 sm:w-6 sm:h-6 text-motif-silver" />
            <div className="h-px w-10 sm:w-14 md:w-20 bg-motif-silver/60" />
          </div>
          <h3
            className={`${cinzel.className} text-xl sm:text-2xl md:text-3xl font-semibold text-motif-deep mb-3 sm:mb-4 uppercase`}
            style={{ letterSpacing: "0.16em", textShadow: "0 2px 10px rgba(91,102,85,0.25)" }}
          >
            Guest Attire
          </h3>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-br from-motif-cream to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
          <div className="relative bg-motif-cream backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border border-motif-cream/15 shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
            {/* Full width of the card; intrinsic height (no crop) */}
            <button
              type="button"
              onClick={() => setGuestAttireLightboxOpen(true)}
              className="relative block w-full cursor-zoom-in border-0 bg-motif-cream p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-motif-deep focus-visible:ring-offset-2 focus-visible:ring-offset-motif-cream"
              aria-label="Open guest attire image to zoom"
            >
              <Image
                src="/Details/newGuestAttire.png"
                alt="Guest attire palette and inspiration for the wedding motif"
                width={1148}
                height={648}
                className="block h-auto w-full max-w-full"
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) min(100vw, 1024px), 1280px"
              />
              <span className="pointer-events-none absolute bottom-2 right-2 rounded-md bg-motif-deep/80 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-motif-cream sm:text-xs">
                Tap to zoom
              </span>
            </button>

            <div
              className={`${cormorant.className} space-y-4 sm:space-y-5 px-4 py-5 text-motif-deep/90 text-sm sm:px-6 sm:py-6 sm:text-base md:px-8 md:py-8 md:text-lg leading-relaxed max-w-3xl mx-auto text-center`}
            >
              <p>
                We invite you to join us in elegant attire that will complement our wedding motif. To help create a harmonious celebration, we encourage you to draw inspiration from our palette of Pastel Pinks, Pastel Blues, Lilacs and Pastel Florals for ladies, and mix and match from the shades of Pebble Gray, Navy Blue, and Cream for the gentlemen.
              </p>
              <p>
                While these looks are for inspiration, we want you to showcase your own personal style. We kindly ask that you favor these tones over bright neons and please reserve plain white, ivory and cream for the bride.
              </p>
            </div>
          </div>
        </div>

        </div>

     {/* Gentle Reminders Container */}
     <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-5 mt-8 sm:mt-12 md:mt-16">
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-motif-cream/40 bg-motif-cream backdrop-blur-lg shadow-[0_18px_40px_color-mix(in_srgb,var(--color-motif-cream)_15%,transparent)]">
          {/* Content */}
          <div className="relative z-10 px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
            {/* Animated couple photos carousel */}
            <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
              {coupleImages.map((image, index) => {
                const isActive = index === currentImageIndex
                // Alternate rotation: -5deg, 5deg, -3deg, 3deg for variety
                const baseRotation = index === 0 ? -5 : index === 1 ? 5 : index === 2 ? -3 : 3
                // Add gentle rotation animation for active image
                const currentRotation = isActive 
                  ? baseRotation + Math.sin(rotationOffset * Math.PI / 180) * 2 
                  : baseRotation
                
                return (
                  <div
                    key={index}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 border-motif-deep/30 shadow-lg transition-all duration-700 ease-in-out ${
                      isActive ? 'scale-110 z-10' : 'scale-100 opacity-70'
                    }`}
                    style={{
                      transform: `rotate(${currentRotation}deg) ${isActive ? 'scale(1.1)' : 'scale(1)'}`,
                    }}
                  >
                    <Image
                      src={image}
                      alt={`Wedding couple ${index + 1}`}
                      fill
                      className={`object-cover transition-opacity duration-500 ${
                        isActive ? 'opacity-100' : 'opacity-70'
                      }`}
                      sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                    />
                  </div>
                )
              })}
            </div>

            {/* Title */}
            <h3 className={`${cinzel.className} text-2xl sm:text-3xl md:text-4xl text-center text-motif-deep mb-6 sm:mb-8 font-normal tracking-wide`}>
              GENTLE REMINDERS
            </h3>

            {/* Reminders List */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6 max-w-2xl mx-auto">
              {/* Children Reminder */}
              <div className="bg-motif-cream/60 rounded-lg p-4 sm:p-5 md:p-6 border border-motif-deep/10 shadow-sm">
                <h4 className={`${cinzel.className} text-base sm:text-lg md:text-xl font-semibold text-motif-deep mb-2 sm:mb-3`}>
                  CHILDREN
                </h4>
                <p className={`${cormorant.className} text-sm sm:text-base md:text-lg text-motif-deep/80 leading-relaxed`}>
                  While we love your little ones, we kindly request an adults-only celebration so everyone can relax and enjoy the evening.
                </p>
              </div>

              {/* Unplugged Ceremony Reminder */}
              <div className="bg-motif-cream/60 rounded-lg p-4 sm:p-5 md:p-6 border border-motif-deep/10 shadow-sm">
                <h4 className={`${cinzel.className} text-base sm:text-lg md:text-xl font-semibold text-motif-deep mb-2 sm:mb-3`}>
                  UNPLUGGED CEREMONY
                </h4>
                <p className={`${cormorant.className} text-sm sm:text-base md:text-lg text-motif-deep/80 leading-relaxed`}>
                  We are having an unplugged ceremony, meaning we kindly ask all guests to put away their phones and cameras. We want everyone to be fully in the moment with us. Don't worry—our professional photographer will capture all the special moments, and we'll be happy to share them with you later!
                </p>
              </div>

              {/* Arrival Reminder */}
              <div className="bg-motif-cream/60 rounded-lg p-4 sm:p-5 md:p-6 border border-motif-deep/10 shadow-sm">
                <h4 className={`${cinzel.className} text-base sm:text-lg md:text-xl font-semibold text-motif-deep mb-2 sm:mb-3`}>
                  ARRIVAL
                </h4>
                <p className={`${cormorant.className} text-sm sm:text-base md:text-lg text-motif-deep/80 leading-relaxed`}>
                  To ensure everything runs smoothly, please arrive at least 30 minutes before the ceremony starts. This will give you time to find your seat, take in the beautiful setup, and be fully present for our special moment.
                </p>
              </div>

              {/* Gifts Reminder */}
              <div className="bg-motif-cream/60 rounded-lg p-4 sm:p-5 md:p-6 border border-motif-deep/10 shadow-sm">
                <h4 className={`${cinzel.className} text-base sm:text-lg md:text-xl font-semibold text-motif-deep mb-2 sm:mb-3`}>
                  GIFTS
                </h4>
                <p className={`${cormorant.className} text-sm sm:text-base md:text-lg text-motif-deep/80 leading-relaxed`}>
                We are grateful to God for your love and prayers on our special day.
                For those who wish to give a gift, a monetary gift to help us begin our life together would be deeply appreciated.                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Image Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 backdrop-blur-xl z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-500"
          onClick={() => setShowImageModal(null)}
          style={{ backgroundColor: "rgba(91,102,85,0.96)" }}
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
              style={{ backgroundColor: "var(--color-motif-cream)", opacity: 0.12 }}
            />
            <div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
              style={{ backgroundColor: "var(--color-motif-cream)", opacity: 0.14, animationDelay: "1s" }}
            />
          </div>

          <div
            className="relative max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] bg-motif-deep rounded-3xl overflow-hidden shadow-2xl border-2 animate-in zoom-in-95 duration-500 group"
            onClick={(e) => e.stopPropagation()}
            style={{ borderColor: "var(--color-motif-cream)" }}
          >
            {/* Decorative top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
              style={{ background: "linear-gradient(to right, var(--color-motif-cream), var(--color-motif-cream), var(--color-motif-deep))" }}
            />

            {/* Enhanced close button */}
            <button
              onClick={() => setShowImageModal(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 z-20 hover:bg-motif-accent backdrop-blur-sm p-2.5 sm:p-3 rounded-xl shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 border-2 group/close"
              title="Close (ESC)"
              style={{ backgroundColor: "var(--color-motif-deep)", borderColor: "var(--color-motif-cream)", color: "var(--color-motif-cream)" }}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover/close:text-[#E1D5C7] transition-colors" />
            </button>

            {/* Venue badge */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 md:top-6 md:left-6 z-20">
              <div
                className="flex items-center gap-2 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border-2"
                style={{ backgroundColor: "var(--color-motif-deep)", borderColor: "var(--color-motif-cream)" }}
              >
                {showImageModal === "ceremony" ? (
                  <>
                    <Heart className="w-4 h-4" fill="var(--color-motif-cream)" style={{ color: "var(--color-motif-cream)" }} />
                    <span className="text-xs sm:text-sm font-bold text-motif-cream">
                      Ceremony Venue
                    </span>
                  </>
                ) : (
                  <>
                    <Utensils className="w-4 h-4 text-motif-cream" />
                    <span className="text-xs sm:text-sm font-bold text-motif-cream">
                      Reception Venue
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Image section with enhanced effects */}
            <div
              className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden"
              style={{ backgroundColor: "var(--color-motif-deep)" }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0" />

              <Image
                src={showImageModal === "ceremony" ? "/Details/ceremony&location.jpg" : "/Details/Kayama Mountain Resort And Events Place, Sitio Kaytuyang, Brgy. Aga Nasugbu, Batangas.png"}
                alt={showImageModal === "ceremony" ? ceremonyLocationFormatted : receptionLocationFormatted}
                fill
                className="object-contain p-6 sm:p-8 md:p-10 transition-transform duration-700 group-hover:scale-105 z-10"
                sizes="95vw"
                priority
              />
            </div>

            {/* Enhanced content section */}
            <div
              className={`${cormorant.className} p-5 sm:p-6 md:p-8 bg-motif-deep backdrop-blur-sm border-t-2 relative`}
              style={{ borderColor: "var(--color-motif-cream)" }}
            >
              {/* Decorative line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-motif-cream/30 to-transparent" />

              <div className="space-y-5">
                {/* Header with venue info */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-2">
                    <h3
                      className={`${cinzel.className} text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-3`}
                      style={{ color: "var(--color-motif-cream)" }}
                    >
                      {showImageModal === "ceremony" ? (
                        <Heart className="w-6 h-6 text-motif-cream" fill="var(--color-motif-cream)" />
                      ) : (
                        <Utensils className="w-6 h-6 text-motif-cream" />
                      )}
                      {showImageModal === "ceremony" ? siteConfig.ceremony.venue : siteConfig.reception.venue}
                    </h3>
                    <div className="flex items-center gap-2 text-sm opacity-70 text-motif-cream">
                      <MapPin className="w-4 h-4 text-motif-cream" />
                      <span>
                        {showImageModal === "ceremony"
                          ? ceremonyLocationFormatted
                          : receptionLocationFormatted}
                      </span>
                    </div>

                    {/* Date & Time info */}
                    {showImageModal === "ceremony" && (
                      <div
                        className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border"
                        style={{
                          color: "var(--color-motif-cream)",
                          backgroundColor: "var(--color-motif-deep)",
                          opacity: 0.9,
                          borderColor: "var(--color-motif-cream)",
                        }}
                      >
                        <Clock className="w-4 h-4 text-motif-cream" />
                        <span>
                          {formattedCeremonyDate} at {siteConfig.ceremony.time}
                        </span>
                      </div>
                    )}
                    {showImageModal === "reception" && (
                      <div
                        className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border"
                        style={{
                          color: "var(--color-motif-cream)",
                          backgroundColor: "var(--color-motif-deep)",
                          opacity: 0.9,
                          borderColor: "var(--color-motif-cream)",
                        }}
                      >
                        <Clock className="w-4 h-4 text-motif-cream" />
                        <span>
                          {formattedReceptionDate} - {siteConfig.reception.time}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    <button
                      onClick={() =>
                        copyToClipboard(
                          showImageModal === "ceremony"
                            ? ceremonyLocation
                            : receptionLocation,
                          `modal-${showImageModal}`,
                        )
                      }
                      className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-motif-deep border-2 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md hover:bg-motif-accent whitespace-nowrap text-motif-cream"
                      title="Copy address"
                      style={{ borderColor: "var(--color-motif-cream)" }}
                    >
                      {copiedItems.has(`modal-${showImageModal}`) ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() =>
                        openInMaps(showImageModal === "ceremony" ? ceremonyMapsLink : receptionMapsLink)
                      }
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg whitespace-nowrap bg-motif-cream text-motif-deep"
                    >
                      <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Get Directions</span>
                    </button>
                  </div>
                </div>

                {/* Additional info */}
                  <div className="flex items-center gap-2 text-xs opacity-65 text-motif-cream">
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-3 h-3" />
                    Click outside to close
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline-flex items-center gap-1.5">Press ESC to close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Guest attire — full-screen zoom */}
      {guestAttireLightboxOpen && (
        <div
          className="fixed inset-0 z-[60] flex flex-col bg-motif-deep/95 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Guest attire zoom view"
          onClick={() => setGuestAttireLightboxOpen(false)}
        >
          <div
            className="flex shrink-0 items-center justify-between gap-2 border-b px-3 py-2 sm:px-4"
            style={{ borderColor: "var(--color-motif-cream)", backgroundColor: "rgba(12, 30, 20, 0.92)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={`${cinzel.className} text-sm uppercase tracking-[0.12em] text-motif-cream`}>
              Guest attire
            </span>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                aria-label="Zoom out"
                className="rounded-lg p-2 text-motif-cream transition-colors hover:bg-white/10 disabled:opacity-40"
                disabled={guestAttireZoom <= 1}
                onClick={() => setGuestAttireZoom((z) => Math.max(1, z - 0.25))}
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <span className="min-w-[3.5ch] text-center text-xs tabular-nums text-motif-cream/80">
                {Math.round(guestAttireZoom * 100)}%
              </span>
              <button
                type="button"
                aria-label="Zoom in"
                className="rounded-lg p-2 text-motif-cream transition-colors hover:bg-white/10 disabled:opacity-40"
                disabled={guestAttireZoom >= 3}
                onClick={() => setGuestAttireZoom((z) => Math.min(3, z + 0.25))}
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Close"
                className="ml-1 rounded-lg p-2 text-motif-cream transition-colors hover:bg-white/10"
                onClick={() => setGuestAttireLightboxOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div
            className="min-h-0 flex-1 overflow-auto overscroll-contain touch-pan-x touch-pan-y"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex min-h-full w-full items-start justify-center p-2 sm:p-4">
              <div
                className="transition-transform duration-200 ease-out will-change-transform"
                style={{
                  transform: `scale(${guestAttireZoom})`,
                  transformOrigin: "center top",
                }}
              >
                <Image
                  src="/Details/newGuestAttire.png"
                  alt="Guest attire palette and inspiration for the wedding motif"
                  width={1148}
                  height={648}
                  className="h-auto w-full max-w-[min(100vw-2rem,1148px)] select-none"
                  sizes="100vw"
                  priority
                  onDoubleClick={() =>
                    setGuestAttireZoom((z) => (z > 1 ? 1 : 2))
                  }
                />
              </div>
            </div>
          </div>
          <p className="shrink-0 bg-black/30 px-3 py-2 text-center text-[11px] text-motif-cream/70 sm:text-xs">
            Scroll to pan when zoomed · double-tap image to reset or zoom · tap outside to close
          </p>
        </div>
      )}
     
    </Section>
  );
}