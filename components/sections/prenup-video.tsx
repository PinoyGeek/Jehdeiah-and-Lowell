"use client"

import { useState, useEffect, useRef } from "react"
import { Section } from "@/components/section"
import Image from "next/image"
import { motion } from "motion/react"
import { Play } from "lucide-react"
import { useAudio } from "@/contexts/audio-context"
import { Cinzel, Cormorant_Garamond } from "next/font/google"
import { siteConfig } from "@/content/site"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "400",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
})

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export function PrenupVideo() {
  const [hasClicked, setHasClicked] = useState(false)
  const playerRef = useRef<any>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const { registerVideoPlayer, unregisterVideoPlayer, onVideoPlay, onVideoPauseOrEnd, isVideoActive } = useAudio()
  const playerId = "prenup-video"
  // https://youtu.be/AQMHC4MicRQ
  const videoId = "AQMHC4MicRQ"
  const brideName = siteConfig.couple.brideNickname || siteConfig.couple.bride
  const groomName = siteConfig.couple.groomNickname || siteConfig.couple.groom

  useEffect(() => {
    if (window.YT) return
    if (document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) return

    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    const firstScriptTag = document.getElementsByTagName("script")[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
  }, [])

  useEffect(() => {
    if (!hasClicked || !iframeRef.current) return

    const initPlayer = () => {
      if (window.YT && window.YT.Player && iframeRef.current) {
        playerRef.current = new window.YT.Player(iframeRef.current, {
          events: {
            onReady: (event: any) => {
              registerVideoPlayer(playerId, event.target)
              if (isVideoActive(playerId)) {
                event.target.playVideo?.()
                onVideoPlay(playerId)
              } else {
                event.target.pauseVideo?.()
                onVideoPauseOrEnd(playerId)
              }
            },
            onStateChange: (event: any) => {
              if (event.data === 1 || event.data === 3) {
                onVideoPlay(playerId)
              } else if (event.data === 2 || event.data === 0 || event.data === 5) {
                onVideoPauseOrEnd(playerId)
              }
            },
          },
        })
      }
    }

    const timer = setTimeout(() => {
      if (window.YT && window.YT.Player) {
        initPlayer()
      } else {
        const previousReady = window.onYouTubeIframeAPIReady
        window.onYouTubeIframeAPIReady = () => {
          previousReady?.()
          initPlayer()
        }
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      unregisterVideoPlayer(playerId)
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy()
        } catch {
          // Ignore errors during cleanup
        }
      }
    }
  }, [hasClicked, registerVideoPlayer, unregisterVideoPlayer, onVideoPlay, onVideoPauseOrEnd, isVideoActive, videoId, playerId])

  const pauseThisPlayer = () => {
    try {
      playerRef.current?.mute?.()
      playerRef.current?.pauseVideo?.()
    } catch {
      // Player may not be ready yet
    }
    const iframe = iframeRef.current
    if (iframe?.contentWindow) {
      try {
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: "mute", args: [] }),
          "*"
        )
        iframe.contentWindow.postMessage(
          JSON.stringify({ event: "command", func: "pauseVideo", args: [] }),
          "*"
        )
      } catch {
        // Ignore cross-frame errors
      }
    }
  }

  const handleThumbnailClick = () => {
    setHasClicked(true)
    registerVideoPlayer(playerId, { pauseVideo: pauseThisPlayer, mute: pauseThisPlayer })
    onVideoPlay(playerId)
  }

  return (
    <>
      <style jsx global>{`
        .prenup-youtube-embed-wrapper iframe {
          pointer-events: auto;
        }

        .prenup-youtube-mask-container {
          position: relative;
        }
      `}</style>

      <Section
        id="prenup-video"
        className="relative bg-motif-cream py-10 sm:py-12 md:py-16 lg:py-20 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-motif-cream via-[#E3ECF7]/40 to-motif-cream" />
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-[36rem] h-[22rem] opacity-70"
            style={{
              background:
                "radial-gradient(ellipse at center, color-mix(in srgb, var(--color-motif-medium) 28%, transparent), transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-[-8rem] right-[-4rem] w-[28rem] h-[20rem] opacity-50"
            style={{
              background:
                "radial-gradient(ellipse at center, color-mix(in srgb, var(--color-motif-accent) 35%, transparent), transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 px-3 sm:px-4">
          <p
            className={`${cormorant.className} text-[0.65rem] sm:text-xs md:text-sm uppercase tracking-[0.32em] text-motif-deep/70 mb-3 sm:mb-4`}
          >
            The Prenup Film
          </p>

          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 md:mb-5">
            <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-motif-deep/25" />
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-motif-medium rounded-full" />
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-motif-deep/70 rounded-full" />
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-motif-medium rounded-full" />
            <div className="w-6 sm:w-8 md:w-12 lg:w-16 h-px bg-motif-deep/25" />
          </div>

          <h2
            className={`${cinzel.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-motif-deep mb-2 sm:mb-3 md:mb-4`}
          >
            Before We Say I Do
          </h2>

          <p
            className={`${cormorant.className} text-sm sm:text-base md:text-lg lg:text-xl text-motif-deep/80 font-normal italic max-w-2xl mx-auto px-2 leading-relaxed`}
          >
            Soft light, unhurried steps, and a love already sure of home.
            {` ${brideName} & ${groomName}`} — just as they are, before the vows.
          </p>
        </div>

        <div className="relative z-10 px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative group"
            >
              <div className="absolute -inset-3 bg-gradient-to-r from-motif-deep/20 via-motif-medium/30 to-motif-deep/20 blur-2xl opacity-60 group-hover:opacity-85 transition-all duration-500" />
              <div className="absolute -inset-5 bg-motif-deep/10 blur-3xl opacity-40 group-hover:opacity-60 transition-all duration-500" />

              <div className="relative bg-gradient-to-br from-motif-deep via-[#0a2a5e] to-motif-deep overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl shadow-[0_8px_32px_rgba(5,28,70,0.28),0_16px_64px_rgba(5,28,70,0.18),0_0_0_1px_rgba(155,188,232,0.35)] group-hover:shadow-[0_14px_52px_rgba(5,28,70,0.36),0_26px_100px_rgba(5,28,70,0.22),0_0_0_1px_rgba(155,188,232,0.5)] transition-all duration-500">
                <div className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl border border-motif-medium/35 group-hover:border-motif-medium/55 transition-colors duration-500 pointer-events-none z-20" />
                <div className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl shadow-[inset_0_0_40px_rgba(5,28,70,0.35)] pointer-events-none z-10" />

                <div className="absolute top-0 left-0 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 pointer-events-none z-20">
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-motif-medium/80 via-motif-cream/50 to-transparent" />
                  <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-motif-medium/80 via-motif-cream/50 to-transparent" />
                </div>
                <div className="absolute top-0 right-0 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 pointer-events-none z-20">
                  <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-motif-medium/80 via-motif-cream/50 to-transparent" />
                  <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-motif-medium/80 via-motif-cream/50 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 pointer-events-none z-20">
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-motif-medium/80 via-motif-cream/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-px h-full bg-gradient-to-t from-motif-medium/80 via-motif-cream/50 to-transparent" />
                </div>
                <div className="absolute bottom-0 right-0 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 pointer-events-none z-20">
                  <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-motif-medium/80 via-motif-cream/50 to-transparent" />
                  <div className="absolute bottom-0 right-0 w-px h-full bg-gradient-to-t from-motif-medium/80 via-motif-cream/50 to-transparent" />
                </div>

                <div className="relative" style={{ paddingBottom: "56.25%" }}>
                  {!hasClicked && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 cursor-pointer z-20 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden"
                      onClick={handleThumbnailClick}
                    >
                      <Image
                        src="/desktop-background/couple (2).jpg"
                        alt={`${brideName} and ${groomName} prenup film`}
                        fill
                        className="object-cover object-[center_72%] transform group-hover:scale-105 transition-transform duration-700"
                        priority
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-motif-deep/55 via-motif-deep/10 to-motif-deep/20" />

                      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between gap-3 pointer-events-none">
                        <p
                          className={`${cormorant.className} text-motif-cream/90 text-xs sm:text-sm md:text-base italic tracking-wide`}
                        >
                          Play the prenup
                        </p>
                        <span
                          className={`${cinzel.className} hidden sm:inline text-[0.6rem] md:text-xs tracking-[0.22em] uppercase text-motif-cream/70`}
                        >
                          Jehdeiah &amp; Lowell
                        </span>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative"
                        >
                          <div className="absolute inset-0 rounded-full bg-motif-medium/50 blur-2xl scale-150 group-hover:bg-motif-cream/50 group-hover:scale-[1.7] transition-all duration-300" />
                          <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-motif-cream/95 backdrop-blur-sm border border-motif-medium/40 shadow-[0_8px_32px_rgba(5,28,70,0.35),0_0_0_1px_rgba(155,188,232,0.35)] group-hover:bg-white group-hover:shadow-[0_12px_52px_rgba(5,28,70,0.45),0_0_0_1px_rgba(155,188,232,0.5)] transition-all duration-300">
                            <Play className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-motif-deep fill-motif-deep ml-1 drop-shadow-md" />
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {hasClicked && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 prenup-youtube-embed-wrapper"
                    >
                      <div className="relative w-full h-full overflow-hidden prenup-youtube-mask-container">
                        <iframe
                          ref={iframeRef}
                          id="prenup-youtube-player"
                          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&cc_load_policy=0&fs=1&playsinline=1&enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`}
                          className="absolute inset-0 w-full h-full"
                          style={{ border: 0 }}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          title={`${brideName} and ${groomName} Prenup Film`}
                        />

                        <div
                          className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-10"
                          style={{
                            background:
                              "linear-gradient(to bottom, rgba(5,28,70,0.35) 0%, transparent 100%)",
                          }}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center mt-7 sm:mt-9 md:mt-11"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="h-px w-8 sm:w-12 bg-motif-deep/20" />
                <span className="w-1 h-1 rounded-full bg-motif-medium" />
                <span className="h-px w-8 sm:w-12 bg-motif-deep/20" />
              </div>
              <p
                className={`${cormorant.className} text-sm sm:text-base md:text-lg text-motif-deep/75 font-normal italic max-w-xl mx-auto px-4 leading-relaxed`}
              >
                Not a rehearsal for the day — a keepsake of the season that led them here.
              </p>
            </motion.div>
          </div>
        </div>
      </Section>
    </>
  )
}
